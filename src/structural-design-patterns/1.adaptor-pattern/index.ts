interface PaymentGateway {
  makePayment(): void;
}

class PayU implements PaymentGateway {
  makePayment(): void {
    console.log("payment done by", PayU.name);
  }
}

class RazorPay {
  pay(): void {
    console.log("payment done by", RazorPay.name);
  }
}

class RazorPayAdaptor implements PaymentGateway {
  private razorPay: RazorPay;

  constructor() {
    this.razorPay = new RazorPay();
  }

  makePayment(): void {
    this.razorPay.pay();
  }
}

class Checkout {
  constructor(private readonly paymentGateway: PaymentGateway) {}

  makePayment() {
    // some logging or there work
    this.paymentGateway.makePayment();
  }
}

const checkout = new Checkout(new PayU());
checkout.makePayment();

const checkout2 = new Checkout(new RazorPayAdaptor());
checkout2.makePayment();
