console.log("salut");
class Cour {
    id;
    title;
    description;
    images;
    constructor(id, title, description, images) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.images = images;
    }
    getCour() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            images: this.images
        };
    }
}
export {};
//# sourceMappingURL=cour.js.map