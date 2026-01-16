/***************************************************
 * 2. FONCTION DE HASH DU MOT DE PASSE
 ***************************************************/
async function hashPassword(password) {
    const data = new TextEncoder().encode(password);
    // Calcule le hash SHA-256
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    // Convertit le buffer binaire en chaîne hexadécimale
    return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}
/***************************************************
 * 3. GESTION DE L’INSCRIPTION
 ***************************************************/
const signupForm = document.getElementById("formInscription");
// Utilisation de : Event pour une compatibilité maximale
signupForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    // Récupération des éléments HTML avec casting (as)
    const nameInput = document.getElementById("name");
    const firstnameInput = document.getElementById("firstname");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmInput = document.getElementById("confirmPassword");
    // Vérification de sécurité locale
    if (passwordInput.value !== confirmInput.value) {
        alert("Les mots de passe ne sont pas identiques.");
        return;
    }
    // Préparation des données pour le serveur
    const hash = await hashPassword(passwordInput.value);
    const utilisateurData = {
        id: Date.now(),
        name: nameInput.value.trim(),
        firstname: firstnameInput.value.trim(),
        email: emailInput.value.trim(),
        passwordHash: hash
    };
    // Envoi des données au serveur Node.js
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
            // Redirige vers la page de connexion
            window.location.href = "register.html";
        }
        else {
            // Récupère le message d'erreur envoyé par le serveur
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
