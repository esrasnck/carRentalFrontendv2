export interface Payment{
    paymentId?:number;
    customerId:number;
    creditCardNumber:string;
    money:number;
    expirationDate:string;
    securityCode:string;
}

