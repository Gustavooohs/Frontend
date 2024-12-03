document.addEventListener('DOMContentLoaded', function () {

    // Função para enviar dados de registro
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            })
                .then(response => {
                    if (!response.ok) {
                        return response.json().then(err => { throw new Error(err.error || 'Erro desconhecido'); });
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    alert('Usuário registrado com sucesso!');
                    registerForm.reset();
                })
                .catch(error => {
                    console.error('Erro:', error);
                    alert('Erro ao registrar usuário: ' + error.message);
                });
        });
    }

    // Função para enviar dados de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
                .then(response => {
                    if (!response.ok) {
                        return response.json().then(err => { throw new Error(err.error || 'Erro desconhecido'); });
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    if (data.success) {
                        alert('Login bem-sucedido!');
                    } else {
                        alert('Credenciais inválidas.');
                    }
                    loginForm.reset();
                })
                .catch(error => {
                    console.error('Erro:', error);
                    alert('Erro ao fazer login: ' + error.message);
                });
        });
    }

    // Função para obter todos os usuários
    const getUsersButton = document.getElementById('getUsersButton');
    if (getUsersButton) {
        getUsersButton.addEventListener('click', function () {
            fetch('http://localhost:3000/users')
                .then(response => {
                    if (!response.ok) {
                        return response.json().then(err => { throw new Error(err.error || 'Erro desconhecido'); });
                    }
                    return response.json();
                })
                .then(data => {
                    const userList = document.getElementById('userList');
                    userList.innerHTML = '';
                    data.forEach(user => {
                        const li = document.createElement('li');
                        li.textContent = `Nome: ${user.name}, E-mail: ${user.email}`;
                        userList.appendChild(li);
                    });
                })
                .catch(error => {
                    console.error('Erro:', error);
                    alert('Erro ao obter usuários: ' + error.message);
                });
        });
    }
});
