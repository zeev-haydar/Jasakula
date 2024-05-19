export default class Pengguna {
    public id: string;
    public fullName: string;
    public nickname: string;
    public deskripsi: string;

    constructor(id: string, fullName: string, nickname: string, deskripsi: string){
        this.id = id;
        this.fullName = fullName;
        this.nickname = nickname;
        this.deskripsi = deskripsi;
    }
    static createTemplatePengguna(): Pengguna {
        return new Pengguna("dananggokil", "Rahmat Danang", "Danang", "Si Paling Webdev");
    }
}