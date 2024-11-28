document.getElementById("registerForm").addEventListener("submit", (e) => {
    e.preventDefault();
  
    const inputs = document.querySelectorAll("#registerForm input");
    let valid = true;

    inputs.forEach((input) => {
        input.classList.remove("is-invalid"); 
    });
  
    inputs.forEach((input) => {
        if (!input.value.trim()) { 
            valid = false;
            input.classList.add("is-invalid"); 
        }
    });
  
    if (valid) {
        alert("Registro exitoso!");
        e.target.submit(); 
    }
});
