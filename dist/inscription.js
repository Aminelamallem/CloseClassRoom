
async function hashPassword(password) {
    const data = new TextEncoder().encode(password);
    // Calcule le hash SHA-256
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    // Convertit le buffer binaire en chaîne hexadécimale
    return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}
//Inscription
const signupForm = document.getElementById("formInscription");

signupForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const nameInput = document.getElementById("name");
    const firstnameInput = document.getElementById("firstname");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmInput = document.getElementById("confirmPassword");
    
    if (passwordInput.value !== confirmInput.value) {
        alert("Les mots de passe ne sont pas identiques.");
        return;
    }
    
    const hash = await hashPassword(passwordInput.value);
    const utilisateurData = {
        id: Date.now(),
        name: nameInput.value.trim(),
        firstname: firstnameInput.value.trim(),
        email: emailInput.value.trim(),
        passwordHash: hash
    };
    // Envoi des données au serveur 
    try {
        const response = await fetch("http://localhost:3000/inscription", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(utilisateurData)
        });
        if (response.ok) {
            alert("Compte créé avec succès !");
            
            window.location.href = "register.html";
        }
        else {
            
            const errorMsg = await response.text();
            alert("Erreur lors de l'inscription : " + errorMsg);
        }
    }
    catch (error) {
        console.error("Erreur réseau :", error);
        alert("Impossible de contacter le serveur. Est-il lancé (node server.js) ?");
    }
});
export {};
