import Jasa from "./Jasa";
import Pengguna from "./Pengguna";

export default class Ulasan {
    id: string;
    sent_at: string;
    content: string;
    rating: number;
    pengguna: Pengguna;

    constructor(id: string, sent_at: string, content: string, rating: number, pengguna: any){
        this.id = id;
        this.sent_at = sent_at;
        this.content = content;
        this.rating = rating;
        this.pengguna = pengguna;
    }
}