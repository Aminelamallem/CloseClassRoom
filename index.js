export {};

/***************************************************
 * 1. INTERFACE & SÉLECTION DES ÉLÉMENTS
 ***************************************************/
interface Utilisateur {
    name: string;
    firstname: string;
    email: string;
}

const profileForm = document.getElementById("formProfil") as HTMLFormElement | null;
const btnSupprimer = document.getElementById("btnSupprimer") as HTMLButtonElement | null;
const btnDeconnexion = document.getElementById("btnDeconnexion") as HTMLButtonElement | null;

// Champs de saisie
const nameInput = document.getElementById("profileName") as HTMLInputElement;
const firstnameInput = document.getElementById("profileFirstname") as HTMLInputElement;
const emailInput = document.getElementById("profileEmail") as HTMLInputElement;

/***************************************************
 * 2. CHARGEMENT INITIAL (GET)
 ***************************************************/
async function chargerDonneesProfil() {
    try {
        // Remplace l'URL par ton endpoint réel (ex: fetch('/api/user/me'))
        const response = await fetch("http://localhost:3000/mon-profil");
        
        if (response.ok) {
            const data: Utilisateur = await response.json();
            
            // Injection des données dans le HTML
            nameInput.value = data.name;
            firstnameInput.value = data.firstname;
            emailInput.value = data.email;
        } else {
            console.error("Impossible de récupérer les données du profil.");
        }
    } catch (error) {
        console.error("Erreur réseau lors du chargement :", error);
    }
}

// Lancer le chargement au démarrage
chargerDonneesProfil();

/***************************************************
 * 3. MODIFIER LE PROFIL (PUT)
 ***************************************************/
profileForm?.addEventListener("submit", async (e: Event) => {
    e.preventDefault();

    const updatedUser = {
        name: nameInput.value.trim(),
        firstname: firstnameInput.value.trim()
    };

    try {
        const response = await fetch("http://localhost:3000/update-profil", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedUser)
        });

        if (response.ok) {
            alert("✅ Profil mis à jour avec succès !");
        } else {
            const errorMsg = await response.text();
            alert("❌ Erreur : " + errorMsg);
        }
    } catch (error) {
        alert("Erreur de connexion au serveur.");
    }
});

/***************************************************
 * 4. SUPPRIMER LE COMPTE (DELETE)
 ***************************************************/
btnSupprimer?.addEventListener("click", async () => {
    const confirmation = confirm("⚠️ ATTENTION : Voulez-vous vraiment supprimer votre compte ? Cette action est définitive.");

    if (confirmation) {
        try {
            const response = await fetch("http://localhost:3000/delete-profil", {
                method: "DELETE"
            });

            if (response.ok) {
                alert("Votre compte a été supprimé.");
                window.location.href = "inscription.html"; 
            } else {
                alert("Erreur lors de la suppression.");
            }
        } catch (error) {
            alert("Erreur serveur.");
        }
    }
});

/***************************************************
 * 5. GESTION DE LA DÉCONNEXION
 ***************************************************/
btnDeconnexion?.addEventListener("click", async () => {
    // 1. (Optionnel) Prévenir le serveur de la déconnexion
    try {
        await fetch("http://localhost:3000/logout", { method: "POST" });
    } catch (error) {
        console.log("Déconnexion locale uniquement.");
    }

    // 2. Nettoyage des données locales (si tu en stockes)
    localStorage.removeItem("userToken"); 
    sessionStorage.clear();

    // 3. Redirection vers la page de connexion
    alert("Vous avez été déconnecté.");
    window.location.href = "register.html"; 
});
