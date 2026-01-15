class Partie {
    titre;
    image;
    contenu;
    constructor(titre, image, contenu) {
        this.titre = titre;
        this.image = image;
        this.contenu = contenu;
    }
    getPartie() {
        return {
            titre: this.titre,
            image: this.image,
            contenu: this.contenu
        };
    }
}
export { Partie };
//# sourceMappingURL=partie.js.map