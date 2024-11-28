document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que el formulario recargue la página

    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Realizamos la solicitud POST sin recargar la página
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstname, lastname, email, password })
    })
    .then(response => response.json())
    .then(data => {
        // Mostramos el mensaje según la respuesta
        const messageDiv = document.getElementById('message');
        if (data.success) {
            messageDiv.innerHTML = `<p style="color: green;">${data.message}</p>`;
        } else {
            messageDiv.innerHTML = `<p style="color: red;">${data.message}</p>`;
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
