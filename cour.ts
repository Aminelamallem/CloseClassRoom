class Cour {
    private id: number;
    private title: string;
    private description: string;
    private image: string;
    private lien: string;
    

    constructor(id: number,title: string,description: string,image: string,lien: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.image = image;
        this.lien = lien;
    }

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

fetch("cour.json")
    .then(res => res.json())
    .then(data => {
        const cours: Cour[] = data.map((item: any) =>
            new Cour(
                item.id,
                item.title,
                item.description,
                item.image,
                item.lien
            )
        );

        const container = document.getElementById("cours-container");
        if (!container) return;

       cours.forEach(cour => {
            const courData = cour.getCour();

            const col = document.createElement("div");
            col.className = "col-span-4";

            const card = document.createElement("div");
             card.className =
                "bg-[#f6efec] border-2 border-blue-400 rounded-3xl p-6 flex flex-wrap items-center gap-6 h-full cursor-pointer";

            const img = document.createElement("img");
            img.src = courData.image;
            img.alt = courData.title;
            img.className = "w-28 h-28 object-contain flex-shrink-0";

            const content = document.createElement("div");
            content.className = "flex flex-col gap-3 flex-1 min-w-[220px]";

            const title = document.createElement("h2");
            title.textContent = courData.title;
            title.className = "text-2xl font-semibold text-black";

            const desc = document.createElement("p");
            desc.textContent = courData.description;
            desc.className = "text-gray-700 text-sm";

            const btn = document.createElement("button");
            btn.textContent = "Consulter";
            btn.className =
                "mt-2 bg-blue-500 text-white px-8 py-3 rounded-full w-fit hover:bg-gray-800 transition";

            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                window.location.href = courData.lien;
            });

            card.addEventListener("click", () => {
                window.location.href = courData.lien;
            });

            content.appendChild(title);
            content.appendChild(desc);
            content.appendChild(btn);

            card.appendChild(img);
            card.appendChild(content);
            col.appendChild(card);
            container.appendChild(col);
        });
    })
    .catch(err => console.error("Erreur :", err));
