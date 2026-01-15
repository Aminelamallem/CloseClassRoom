import { Partie } from "./partie.js";
declare class Cour {
    id: number;
    title: string;
    description: string;
    image: string;
    lien: string;
    parties: Partie[];
    constructor(id: number, title: string, description: string, image: string, lien: string, parties: Partie[]);
    getCour(): {
        id: number;
        title: string;
        description: string;
        image: string;
        lien: string;
    };
}
export { Cour };
//# sourceMappingURL=cour.d.ts.map