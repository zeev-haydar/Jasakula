import Pengguna from "./Pengguna";

export default class Penjual {
    public id: string;
    public pengguna: Pengguna;

    constructor(id: string, pengguna: Pengguna){
        this.id = id;
        this.pengguna = pengguna;
    }

    static createTemplatePenjual():Penjual {
        return new Penjual("awdnbibgnaebi", Pengguna.createTemplatePengguna())
    }
}