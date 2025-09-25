interface DocumentSessionMediator {
  addUser(user: User): void;
  broadCast(changes: string, sender: User): void;
}

class CollaborativeDocument implements DocumentSessionMediator {
  private userList: User[] = [];

  addUser(user: User): void {
    this.userList.push(user);
  }

  broadCast(changes: string, sender: User): void {
    this.userList.forEach((user: User) => {
      if (user !== sender) {
        console.log("doc changed by", sender);
      }
    });
  }
}

class User {
  protected name: string;
  protected mediator: DocumentSessionMediator;

  constructor(name: string, mediator: DocumentSessionMediator) {
    this.name = name;
    this.mediator = mediator;
  }

  // Method for users to make a change
  public makeChange(change: string) {
    console.log(this.name + " edited the document: " + change);
    this.mediator.broadCast(change, this);
  }

  // Method to receive a change from another user
  public receiveChange(change: string, sender: User) {
    console.log(
      this.name + " saw change from " + sender.name + ': "' + change + '"'
    );
  }
}

const doc = new CollaborativeDocument();

// Creating users
const alice = new User("Alice", doc);
const bob = new User("Bob", doc);
const charlie = new User("Charlie", doc);

// Joining the collaborative document
doc.addUser(alice);
doc.addUser(bob);
doc.addUser(charlie);

// Users making changes
alice.makeChange("Added project title");
bob.makeChange("Corrected grammar in paragraph 2");
