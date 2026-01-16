class Partie {
    constructor(
        public titre: string,
        public image: string,
        public contenu: string
    ) {}

    getPartie() {
        return {
            titre: this.titre,
            image: this.image,
            contenu: this.contenu
        };
    }
}

export { Partie };
