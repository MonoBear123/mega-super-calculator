const formReg = document.getElementById("registration-form");
formReg.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    const data = {
        email: email,
        password: password
    };

    fetch('http://localhost:8081/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
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
        console.log('Success:', data);
        alert('Успешная регистрация');
        window.location.href = "login.html";
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Произошла ошибка регистрации');
    });
});
