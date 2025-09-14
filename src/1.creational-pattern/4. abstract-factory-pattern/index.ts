import { GATEWAY_TYPE, Invoice, PaymentGateway, RegionFactory } from "./interfaces";

class RazorpayGateway implements PaymentGateway {
  processPayment(amount: number): void {
    console.log("payment processed by ", RazorpayGateway.name);
  }
}

class PayUGateway implements PaymentGateway {
  processPayment(amount: number): void {
    console.log("payment processed by ", PayUGateway.name);
  }
}

class USInvoice implements Invoice {
  generateInvoice(): void {
    console.log("generating invoice for ", USInvoice.name);
  }
}

class GSTInvoice implements Invoice {
  generateInvoice(): void {
    console.log("generating invoice for ", GSTInvoice.name);
  }
}

class PaymentGatewayFactory {
  static getPaymentGatewayInstance(type: GATEWAY_TYPE) {
    switch (type) {
      case PayUGateway.name:
        return new PayUGateway();
      case RazorpayGateway.name:
        return new RazorpayGateway();
      default:
        console.log("no payment fount for provided payment type ", type);
    }
  }
}

class IndianFactory implements RegionFactory {
  createPaymentGateway(gatewayType: GATEWAY_TYPE): PaymentGateway {
    const gateway = PaymentGatewayFactory.getPaymentGatewayInstance(gatewayType);
    if (!gateway) throw new Error("failed to create payment gate instance");
    return gateway;
  }

  createInvoice(): Invoice {
    return new GSTInvoice();
  }
}

class USFactory implements RegionFactory {
  createPaymentGateway(gatewayType: GATEWAY_TYPE): PaymentGateway {
    const gateway =
      PaymentGatewayFactory.getPaymentGatewayInstance(gatewayType);
    if (!gateway) throw new Error("failed to create payment gate instance");
    return gateway;
  }

  createInvoice(): Invoice {
    return new USInvoice();
  }
}

class CheckoutService {
  private paymentGateway: PaymentGateway;
  private invoice: Invoice;

  constructor(
    factory: RegionFactory,
    gatewayType: GATEWAY_TYPE,
  ) {
    this.paymentGateway = factory.createPaymentGateway(gatewayType);
    this.invoice = factory.createInvoice();
  }
  
  completeOrder(amount: number) {
    this.paymentGateway.processPayment(amount);
    this.invoice.generateInvoice();
  }
}


export function main() {
  const indianCheckoutService = new CheckoutService(new IndianFactory(), GATEWAY_TYPE.PayUGateway);
  indianCheckoutService.completeOrder(12.1);

  console.log("==============================");

  const USCheckoutService = new CheckoutService(new USFactory(), GATEWAY_TYPE.RazorpayGateway);
  USCheckoutService.completeOrder(10);
}