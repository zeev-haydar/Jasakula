import { Float } from "react-native/Libraries/Types/CodegenTypes";
import Penjual from "./Penjual";

export default class Jasa {
    id: string;
    nama: string;
    deskripsi: string;
    rating: Float;
    harga: number;
    jenis: string;
    penjual: Penjual;

    constructor(id: string, nama: string, deskripsi: string, rating: number, harga: number, jenis: string, penjual: Penjual){
        this.id = id;
        this.nama = nama;
        this.deskripsi = deskripsi;
        this.rating = rating;
        this.harga = harga;
        this.jenis = jenis;
        this.penjual = penjual;
    }

    static CreateTemplateJasa(): Jasa{
        const nama: string = "Desain Logo Profesional - bebas revisi";
        const deskripsi: string = "Menerima jasa pembuatan logo untuk pelaku bisnis indonesia. Cocok untuk anda para pelaku usaha UMKM yang membutuhkan logo dengan budget pas-pasan untuk brand yang dimiliki!!";
        const rating = 5.0;
        const jenis = "Digital Talent";
        const harga = 500000;
        return new Jasa("90195b9gt9381bg90", nama, deskripsi, rating, harga, jenis, Penjual.createTemplatePenjual())
    }
}