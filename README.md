Полурабочий калькулятор v2
==============



***Содержание:***
- [Описание](#Introduction)
- [Работа сервиса](#Preparing)
- [Как собрать проект](#assembly)
- [Тесты](#Test)



# Описание <a name="Introduction"></a>
Этот проект представляет собой gRPC сервер, написанный на языке Go, который обрабатывает запросы на регистрацию пользователей и вычисление математических выражений. Пользователи могут зарегистрироваться в системе и получить JWT токен, который используется для отправки выражений на  сервер.

## Регистрация пользователей: 
Пользователи могут зарегистрироваться в системе, предоставив необходимые данные. После успешной регистрации им выдается JWT токен, который используется для аутентификации запросов. Все данные сохраняются в PostgreSQL
## Вычисление выражений:
После регистрации пользователи могут отправлять математические выражения на сервер для вычисления. Сервер распределяет эти запросы между воркерами для параллельного вычисления.Во время выполнения пользователь  может следить за статусом воркеров и сам задавать время выполнения оперий. Виды операций: +-/*^ 
# Работа сервиса<a name="Preparing"></a>
## Устройство : 
 
  

![struct](art/graph.jpg "Структура")





# Как собрать проект <a name="assembly"></a>

## Требования:
#### Windows
- Docker Desktop
#### Linux
- Docker Engine
- Доступ к sudo/пользователь в группе docker
## Запуск

```bash
docker compose up
```

# Заходим на  localhost:8082
  
 

# Тесты <a name="Test"></a> 
- тесты находятся в папке tests\postg\auth_test.go там есть тест как на регистацию,логин и подсчет выражения.
- !ВАЖНО для запуска тестов нужно установить тайм аут для выполнения горутин 600с.
 ![test](art/test.jpg "тест")
Телеграмм для связи MONOBEARW

