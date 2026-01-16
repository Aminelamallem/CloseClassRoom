export {}; // Empêche les conflits avec inscription.ts
/***************************************************
 * 1. INTERFACE DE RÉPONSE
 ***************************************************/
interface UserResponse {
    message: string;
    user: {
        id: number;
        name: string;
        firstname: string;
        email: string;
    }
}

/***************************************************
 * 2. FONCTION DE HASH (IDENTIQUE À L'INSCRIPTION)
 ***************************************************/
async function hashPassword(password: string): Promise<string> {
    const data = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

/***************************************************
 * 3. LOGIQUE DE CONNEXION
 ***************************************************/
const loginForm = document.getElementById("formRegister") as HTMLFormElement | null;

loginForm?.addEventListener("submit", async (e: Event) => {
    e.preventDefault();

    const emailEl = document.getElementById("email") as HTMLInputElement;
    const passwordEl = document.getElementById("password") as HTMLInputElement;

    if (!emailEl || !passwordEl) return;

    // On hache le mot de passe saisi pour le comparer au hash stocké dans le JSON
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
            const result: UserResponse = await response.json();
            
            alert(`Ravi de vous revoir, ${result.user.firstname} !`);
            
            // On stocke l'email dans le sessionStorage (s'efface à la fermeture du navigateur)
            // Cela permettra à la page profil de savoir qui est connecté
            sessionStorage.setItem("user_session", result.user.email);
            
            // Redirection vers le profil
            window.location.href = "profil.html";
        } else {
            const errorText = await response.text();
            alert("Erreur : " + errorText);
        }
    } catch (error) {
        console.error("Erreur de connexion :", error);
        alert("Le serveur ne répond pas. Vérifiez que 'node server.js' tourne toujours.");
    }
});