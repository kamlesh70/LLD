export class Logger {
  private static instance: Logger;

  private constructor() { }
  
  public static getInstance() {
    if (Logger.instance) {
      console.log("initialized")
      return Logger.instance;
    }

    Logger.instance = new Logger();
    console.log("new ");
    return Logger.instance;
  }

}

// we can use "aync-mutex" to handle thread safety and for race condition
// mutex lock the execution of provided code and release once the code execution complete