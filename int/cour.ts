import { Partie } from "../dist/partie.js";

class Cour {
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public image: string,
        public lien: string,
        public parties: Partie[]
    ) {}

    getCour() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            image: this.image,
            lien: this.lien
        };
    }
}

// Fonction pour afficher les cours
function afficherCours(cours: Cour[]) {
    const container = document.getElementById("cours-container");
    const partiesContainer = document.getElementById("parties-container");
    if (!container || !partiesContainer) return;

    container.innerHTML = "";

    cours.forEach(cour => {
        const courData = cour.getCour();

        const card = document.createElement("div");
        card.className =
            "bg-[#f6efec] border-2 border-blue-400 rounded-3xl p-6 flex gap-6 items-center cursor-pointer hover:shadow-lg transition";

        const img = document.createElement("img");
        img.src = courData.image;
        img.alt = courData.title;
        img.className = "w-28 h-28 object-contain";

        const content = document.createElement("div");
        content.className = "flex flex-col gap-3";

        const title = document.createElement("h2");
        title.textContent = courData.title;
        title.className = "text-xl font-semibold";

        const desc = document.createElement("p");
        desc.textContent = courData.description;
        desc.className = "text-gray-600 text-sm";

        content.append(title, desc);
        card.append(img, content);
        container.appendChild(card);

        // Événement click pour afficher les parties
        card.addEventListener("click", () => {
            partiesContainer.innerHTML = "";
            cour.parties.forEach(partie => {
                const partieData = partie.getPartie();

                const partieCard = document.createElement("div");
                partieCard.className = " border border-gray-300 p-4 rounded-lg mb-4 bg-white shadow" ;

                const pTitle = document.createElement("h3");
                pTitle.textContent = partieData.titre;
                pTitle.className = "font-semibold text-lg mb-2";

                const pImg = document.createElement("img");
                pImg.src = partieData.image;
                pImg.alt = partieData.titre;
                pImg.className = "w-20 h-20 object-contain mb-2";

                const pContent = document.createElement("p");
                pContent.textContent = partieData.contenu;
                pContent.className = "text-sm text-gray-600";

                partieCard.append(pTitle, pImg, pContent);
                partiesContainer.appendChild(partieCard);
            });

            partiesContainer.scrollIntoView({ behavior: "smooth" });
        });
    });
}

// Chargement du fichier JSON
fetch("../data/cour.json")
    .then(res => {
        if (!res.ok) throw new Error("Impossible de charger cour.json");
        return res.json();
    })
    .then(data => {
        const cours: Cour[] = data.map((item: any) => 
            new Cour(
                item.id,
                item.title,
                item.description,
                item.image,
                item.lien,
                item.parties.map((p: any) => new Partie(p.titre, p.image, p.contenu))
            )
        );
        afficherCours(cours);
    })
    .catch(err => console.error("Erreur :", err));

export { Cour };
