import { supabase } from "@/utils/supabase";
import { Alert } from "react-native";

export interface PaymentGatewayMock {
    Pay(): Promise<{order: any, transaksi: any}>;
}

export class QRISMock implements PaymentGatewayMock {
    userId: string;
    penjualId: string;
    cost: number;
    jasaId: string;

    constructor(userId: string, penjualId: string, cost: number,jasaId: string,) {
        this.userId = userId;
        this.penjualId = penjualId;
        this.cost = cost;
        this.jasaId = jasaId;

    }
    async Pay(): Promise<{order: any, transaksi: any}> {
        const { order, transaksi } = await this.insertOrderAndTransaction();
        return { order, transaksi };
    }
    async insertOrderAndTransaction() {

        if (this.userId.length === 0 || this.penjualId.length === 0) {
            throw new Error("empty id");
        }
        //insert
        const { data: orderData, error: errorInsertNewOrder } = await supabase.from('order').insert({
            cost: this.cost,
            status: "Sudah dibayar",
            penjual_pengguna_id: this.penjualId,
            pengguna_id: this.userId,
            jasa_id: this.jasaId,
            waktu: "Aktif"
        }).select().single()

        if (errorInsertNewOrder) {
            throw errorInsertNewOrder
        }

        //insert new transaction data with the order id that
        const { data: transactionData, error: errorInsertTransactionData } = await supabase.
            from("transaksi").
            insert({
                metode: "QRIS",
                nominal: this.cost,
                order_id: orderData.id
            }).select().single();

        if (errorInsertTransactionData) {
            throw errorInsertTransactionData
        }

        return { order: orderData, transaksi: transactionData }

    }

} 