abstract class SupportHandler {
  nextHandler: SupportHandler | undefined;

  setNextHandler(nextHandler: SupportHandler) {
    this.nextHandler = nextHandler;
  }

  abstract requestHandler(requestType: string): void;
}

class GeneralSupport extends SupportHandler {
  
  requestHandler(requestType: string): void {
    if (requestType === GeneralSupport.name) {
      console.log("handled by", GeneralSupport.name);
    } else if(this.nextHandler) {
      this.nextHandler?.requestHandler(requestType);
    } else {
      console.log(GeneralSupport.name, ' no support found for the request', requestType)
    }
  }
}

class BillingSupport extends SupportHandler {
  requestHandler(requestType: string): void {
    if (requestType === BillingSupport.name) {
      console.log("handled by", BillingSupport.name);
    } else if (this.nextHandler) {
      this.nextHandler?.requestHandler(requestType);
    } else {
      console.log(
        GeneralSupport.name,
        " no support found for the request",
        requestType
      );
    }
  }
}

class TechnicalSupport extends SupportHandler {
  requestHandler(requestType: string): void {
    if (requestType === TechnicalSupport.name) {
      console.log("handled by", TechnicalSupport.name);
    } else if (this.nextHandler) {
      this.nextHandler?.requestHandler(requestType);
    } else {
      console.log(
        GeneralSupport.name,
        " no support found for the request",
        requestType
      );
    }
  }
}


const generalSupport = new GeneralSupport();
const billingSupport = new BillingSupport();
const technicalSupport = new TechnicalSupport();

generalSupport.setNextHandler(billingSupport)
billingSupport.setNextHandler(technicalSupport);

generalSupport.requestHandler(TechnicalSupport.name);
