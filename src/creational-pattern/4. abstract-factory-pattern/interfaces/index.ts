export interface PaymentGateway {
  processPayment(amount: number): void;
}

export interface Invoice {
  generateInvoice(): void;
}

export enum GATEWAY_TYPE {
  RazorpayGateway = "RazorpayGateway",
  PayUGateway = "PayUGateway",
}

export interface RegionFactory {
  createPaymentGateway(type: GATEWAY_TYPE): PaymentGateway;
  createInvoice(): Invoice;
}