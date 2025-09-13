// Component
interface Coffee {
  cost(): number;
  description(): string;
}

// ConcreteComponent
class SimpleCoffee implements Coffee {
  cost(): number {
    return 40;
  }

  description(): string {
    return 'Simple Coffee';
  }
}

// Decorator
abstract class CoffeeDecorator implements Coffee {
  protected coffee: Coffee;

  constructor(coffee: Coffee) {
    this.coffee = coffee
  }

  cost(): number {
    return this.coffee.cost();
  }

  description(): string {
    return this.coffee.description();
  }
}

// ConcreteDecorator
class MilkDecorator extends CoffeeDecorator {
  constructor(coffee: Coffee) {
    super(coffee);
  }

  cost(): number {
    return this.coffee.cost() + 10;
  }

  description(): string {
    return this.coffee.description() + " with milk";
  }

}

class CreamDecorator extends CoffeeDecorator {
  constructor(coffee: Coffee) {
    super(coffee);
  }

  cost(): number {
    return this.coffee.cost() + 10;
  }

  description(): string {
    return this.coffee.description() + " with Cream";
  }
}

const coffee = new SimpleCoffee();
const coffeeWithMilk = new MilkDecorator(coffee);
const coffeeWithCream = new CreamDecorator(coffee);
const coffeeWithMilkAndCream = new CreamDecorator(coffeeWithMilk);

console.log(coffee.description());
console.log(coffeeWithMilk.description());
console.log(coffeeWithCream.description());
console.log(coffeeWithMilkAndCream.description());