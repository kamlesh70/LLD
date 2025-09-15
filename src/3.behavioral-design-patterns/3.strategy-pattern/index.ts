interface RidingStrategy {
  match(): void; // just for example return type is void
}

class NearestDriverStrategy implements RidingStrategy {
  match(): void {
    console.log("Riding strategy is", NearestDriverStrategy.name);
  }
}

class AirportQueueStrategy implements RidingStrategy {
  match(): void {
    console.log("Riding strategy is", AirportQueueStrategy.name);
  }
}

class RideMatchingStrategy {
  constructor(private ridingStrategy: RidingStrategy) { }
  
  setStrategy(ridingStrategy: RidingStrategy) {
    this.ridingStrategy = ridingStrategy;
  }

  matchRider() {
    this.ridingStrategy.match();
  }
}

const rider = new RideMatchingStrategy(new AirportQueueStrategy());
rider.matchRider();

// change strategy at run time
rider.setStrategy(new NearestDriverStrategy());
rider.matchRider();