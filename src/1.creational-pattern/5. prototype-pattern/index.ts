// Prototype Interface
interface Prototype<T> {
  clone(): T;
}

// Concrete Prototype
class Query implements Prototype<Query> {
  private query: string;

  constructor(query: string) {
    this.query = query;
  }

  setQuery(query: string): void {
    this.query = query;
  }

  getQuery(): string {
    return this.query;
  }

  // Prototype method
  clone(): Query {
    // use deep clone for nested arguments
    return new Query(this.query);
  }
}

const baseQuery = new Query("SELECT id, name FROM users WHERE isActive = true");

const query1 = baseQuery.clone();
query1.setQuery(query1.getQuery() + " ORDER BY name ASC");

const query2 = baseQuery.clone();
query2.setQuery(query2.getQuery() + " LIMIT 10");

console.log(baseQuery.getQuery());

console.log(query1.getQuery());

console.log(query2.getQuery());
