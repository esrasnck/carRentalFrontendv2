export interface Payment{
    paymentId?:number;
    customerId:number;
    creditCardNumber:string;
    price:number;
    expirationDate:string;
    securityCode:string;
}

