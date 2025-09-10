class Query {
  private query: string;

  private constructor(query: string) {
    this.query = query;
  }

  getQuery(): string {
    return this.query;
  }

  // Nested Builder Class
  static Builder = class {
    private parts: string[] = [];

    select(fields: string[]): this {
      this.parts.push(`SELECT ${fields.join(", ")}`);
      return this;
    }

    from(table: string): this {
      this.parts.push(`FROM ${table}`);
      return this;
    }

    where(condition: string): this {
      this.parts.push(`WHERE ${condition}`);
      return this;
    }

    orderBy(field: string, direction: "ASC" | "DESC" = "ASC"): this {
      this.parts.push(`ORDER BY ${field} ${direction}`);
      return this;
    }

    build(): Query {
      return new Query(this.parts.join(" "));
    }
  };
}

const queryBuilder = new Query.Builder();
const query = queryBuilder.select(['id', 'name'])
  .from('test')
  .where('name like %test%')
  .orderBy('id', "DESC")
  .build()
  .getQuery()

console.log(query)
