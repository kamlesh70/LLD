interface PaymentGateway {
  makePayment(client: any, amount: number): any;
  refund(client: any, order: any): any;
  getPaymentDetails(paymentId: number | string): any;
}

class StripePaymentGateway implements PaymentGateway {
  public makePayment() {
    console.log(StripePaymentGateway.name, "make payment");
  }

  public refund() {}

  public getPaymentDetails() {}
}

class PaypalPaymentGateway implements PaymentGateway {
  public makePayment() {
    console.log(PaypalPaymentGateway.name, "make payment");
  }

  public refund() {}

  public getPaymentDetails() {}
}

class PaymentGatewayFactory {
  public static getInstance(gatewayName: string): PaymentGateway | undefined {
    switch (gatewayName) {
      case StripePaymentGateway.name: {
        return new StripePaymentGateway();
      }

      case PaypalPaymentGateway.name: {
        return new PaypalPaymentGateway();
      }

      default: {
        console.log("getting error while creating paymentGateway instance");
      }
    }
  }
}

export function clientSide() {
  try {
    const paymentGateway = PaymentGatewayFactory.getInstance(
      PaypalPaymentGateway.name
    );
    if (!paymentGateway) {
      throw new Error("payment gateway instance not found");
    }

    paymentGateway.makePayment({ name: "client_details" }, 12.1);
  } catch (error) {
    console.log("getting from payment gate client side code", error);
  }
}
