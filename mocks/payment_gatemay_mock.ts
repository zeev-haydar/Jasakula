import { Alert } from "react-native";

export interface PaymentGatewayMock {
    Pay(noRekAsal: string, noRekTujuan: string): boolean;
}

export class QRISMock implements PaymentGatewayMock {
    Pay(noRekAsal: string, noRekTujuan: any): boolean {
        Alert.alert("Sukses", "Pembayaran berhasil!")
        return true;
    }
    
} 