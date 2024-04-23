



function submitExpression() {
    const expressionInput = document.getElementById("expression");
    const expression = expressionInput.value;

    const data = {
        expression: expression,
    };

    fetch('http://localhost:8081/culc', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getTokenFromCookie()}`
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            

     
        expressionInput.value = "";
            throw new Error('Network response was not ok');
            
        }
        return response.json();
    })
    .then(data => {
        // После успешного выполнения запроса показываем результат на странице
        const resultElement = document.createElement("div");
        resultElement.textContent = `${expression} = ${data.result}`;

        const calcForm = document.getElementById("сalc-form");
        calcForm.appendChild(resultElement);

     
        expressionInput.value = "";

        
    
    })
    .catch(error => {
        console.error('Ошибка подсчета:', error);
        const resultElement = document.createElement("div");
        const calcForm = document.getElementById("сalc-form");
        resultElement.textContent = `${expression} = ${'ошибка в подсчетах'}`;
        calcForm.appendChild(resultElement);

     
        expressionInput.value = "";
    });
}

function getTokenFromCookie() {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'token') {
            return value;
        }
    }
    return null;
}
   


function GetStatus() {
    fetch('http://localhost:8081/allclient', {
        method: 'GET',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        displayClientStatus(data); // Отображаем информацию о клиентах
    })
    .catch(error => {
        console.error('Ошибка входа:', error);
        alert('Ошибка входа');
    });
}
function displayClientStatus(data) {
    // Очищаем контейнер перед обновлением
    const statusContainer = document.getElementById('status-container');
    statusContainer.innerHTML = '';

    // Проверяем наличие ключа "statuses" в объекте data
    if (data.hasOwnProperty('statuses')) {
        const statuses = data.statuses;

        // Перебираем массив statuses
        statuses.forEach(client => {
            const clientInfo = document.createElement('p');

            // Выводим информацию о статусе клиента
            clientInfo.textContent = `ID сервера: ${client.serverId}, Активных: ${client.active}, Всего: ${client.all}`;

            statusContainer.appendChild(clientInfo);
        });
    } else {
        // Если ключ "statuses" отсутствует, выводим соответствующее сообщение
        const clientInfo = document.createElement('p');
        clientInfo.textContent = `Нет данных о клиентах`;
        statusContainer.appendChild(clientInfo);
    }
}
function GetHistory(){
    fetch('http://localhost:8081/history', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${getTokenFromCookie()}`
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        displayExpressionHistory(data);
    })
    .catch(error => {
        console.error('Ошибка входа:', error);
        alert('Ошибка входа');
    });

}

function displayExpressionHistory(data) {
    // Очищаем контейнер перед обновлением
    const historyContainer = document.getElementById('history-container');
    historyContainer.innerHTML = '';

    // Проверяем наличие ключа "expressions" в объекте data
    if (data.hasOwnProperty('expressions')) {
        const expressions = data.expressions;

        // Перебираем массив expressions
        expressions.forEach(expressionObj => {
            const expressionInfo = document.createElement('p');

            // Выводим информацию о выражении
            expressionInfo.textContent = `ID: ${expressionObj.id}, Выражение: ${expressionObj.expres}`;

            // Добавляем информацию о выражении в контейнер
            historyContainer.appendChild(expressionInfo);

            // Добавляем разделитель
            const separator = document.createElement('hr');
            historyContainer.appendChild(separator);
        });
    } else {
        // Если ключ "expressions" отсутствует, выводим соответствующее сообщение
        const noHistoryMessage = document.createElement('p');
        noHistoryMessage.textContent = `Нет истории выражений`;
        historyContainer.appendChild(noHistoryMessage);
    }
}

function SetConfig(){
    const Sum = document.getElementById('sum').value;
    const div = document.getElementById('div').value;
    const Ex = document.getElementById('exp').value;
    const Min = document.getElementById('min').value;
    const Multp = document.getElementById('mult').value;
  
    const data = {
        
        Div: div,
        Exponent: Ex,
        Minus: Min,
        MultP: Multp,
        Plus: Sum
    };
   
    fetch('http://localhost:8081/config', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    Sum.value="";
    div.value="";
    Ex.value ="";
    Min.value="";
    Multp.value="";
        return response.json();
    })
    .then(data => {
        console.log('Успешный вход:', data);
        alert('Успешный вход');
    })
    .catch(error => {
        console.error('Ошибка входа:', error);
        alert('Ошибка входа');
    });
}

function openModal() {
    document.getElementById('modal').style.display = 'block';
    // Добавляем обработчик события клика на весь документ
  
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
   
}


function addClient() {
    const countworkerInput = document.getElementById('numberOfGoroutines').value;
   

    const data = {
        countworker: +countworkerInput
    };
    console.log(data)
    fetch('http://localhost:8081/newclient', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Успешное добавление клиента:', data);
        alert('Успешное добавление клиента');
       
    })
    .catch(error => {
        console.error('Ошибка добавления клиента:', error);
        alert('Ошибка добавления клиента');
    }
);

    // Очищаем значение поля ввода
   
}