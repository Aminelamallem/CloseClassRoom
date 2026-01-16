const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const FILE_PATH = './data/user.json';

// --- ROUTE DE CONNEXION (LOGIN) ---
app.post('/login', (req, res) => {
    const { email, passwordHash } = req.body;

    fs.readFile(FILE_PATH, 'utf8', (err, data) => {
        // Si le fichier n'existe pas encore, on renvoie une erreur propre
        if (err || !data) return res.status(404).send("Aucun utilisateur trouvé");

        const utilisateurs = JSON.parse(data);
        const utilisateurValide = utilisateurs.find(u => 
            u.email === email && u.passwordHash === passwordHash
        );

        if (utilisateurValide) {
            res.status(200).json({ message: "Connexion réussie", user: utilisateurValide });
        } else {
            res.status(401).send("Email ou mot de passe incorrect");
        }
    });
});

// --- ROUTE D'INSCRIPTION ---
app.post('/register', (req, res) => {
    const nouvelUtilisateur = req.body;

    fs.readFile(FILE_PATH, 'utf8', (err, data) => {
        let utilisateurs = [];
        if (!err && data) {
            utilisateurs = JSON.parse(data);
        }

        const existe = utilisateurs.find(u => u.email === nouvelUtilisateur.email);
        if (existe) {
            return res.status(400).send("Cet email est déjà enregistré.");
        }

        utilisateurs.push(nouvelUtilisateur);

        fs.writeFile(FILE_PATH, JSON.stringify(utilisateurs, null, 2), (err) => {
            if (err) return res.status(500).send("Erreur d'écriture");
            res.status(201).json({ message: "Utilisateur créé avec succès" });
        });
    });
});

app.listen(3000, () => console.log("Serveur démarré sur http://localhost:3000"));