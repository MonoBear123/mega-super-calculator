package app

import (
	"context"
	gRPCServer "culc/iternal/app/grpc"
	"log"
	"net/http"

	"culc/iternal/postg"
	"culc/iternal/services/auth"
	"time"

	culcv1 "github.com/MonoBear123/protoculc/gen/go"
	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

type App struct {
	GRPCS *gRPCServer.App
}

func New(port string, user string, password string, host string, portdb string, dbname string, tokentl time.Duration, countWorker int) *App {
	storage := postg.ConnectDB(user, password, host, portdb, dbname)

	authServer := auth.New(storage, tokentl)

	grps := gRPCServer.NewApp(port, authServer, countWorker)

	return &App{
		GRPCS: grps,
	}
}

func StartHTTP(porthttp string, portgrpc string, ctx context.Context) error {
	mux := runtime.NewServeMux()
	opts := []grpc.DialOption{
		grpc.WithTransportCredentials(insecure.NewCredentials()),
	}

	err := culcv1.RegisterAuthHandlerFromEndpoint(ctx, mux, "localhost:"+portgrpc, opts)
	if err != nil {
		return err
	}

	http.Handle("/", http.FileServer(http.Dir(".")))

	go func() {
		server := &http.Server{
			Addr:    ":" + porthttp,
			Handler: mux,
		}

		if err := server.ListenAndServe(); err != nil {
			log.Fatalf("HTTP server error: %v", err)
		}
	}()

	return nil
}
