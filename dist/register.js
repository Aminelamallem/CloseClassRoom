
async function hashPassword(password) {
    const data = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

//Connexion

const loginForm = document.getElementById("formRegister");
loginForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const emailEl = document.getElementById("email");
    const passwordEl = document.getElementById("password");
    if (!emailEl || !passwordEl)
        return;
   
    const mdpSaisiHache = await hashPassword(passwordEl.value);
    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: emailEl.value.trim(),
                passwordHash: mdpSaisiHache
            })
        });
        if (response.ok) {
            const result = await response.json();
            alert(`Ravi de vous revoir, ${result.user.firstname} !`);
            
            sessionStorage.setItem("user_session", result.user.email);
            
            window.location.href = "profil.html";
        }
        else {
            const errorText = await response.text();
            alert("Erreur : " + errorText);
        }
    }
    catch (error) {
        console.error("Erreur de connexion :", error);
        alert("Le serveur ne répond pas. Vérifiez que 'node server.js' tourne toujours.");
    }
});
export {};
