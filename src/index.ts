class ResumeEditor {
  private name: string | undefined;
  private skills: string[] | undefined;
  private experience: number | undefined;

  public setName(name: string) {
    this.name = name;
  }
  public setSkills(skills: string[]) {
    this.skills = skills;
  }
  public setExperience(expe: number) {
    this.experience = expe;
  }

  Memento = class {
    constructor(
      private name: string,
      private skills: string[],
      private experience: number
    ) {}

    private getName() {
      return this.name;
    }
  };

  public save(): any {
    return new this.Memento(this.name!, this.skills!, this.experience!);
  }

  public restore(memento: any) {
    this.name = memento.name;
  }

  public print() {
    console.log(this.name, " working")
  }
}

class ResumeHistory {
  private history: any = [];
  public save(editor: ResumeEditor): void {
    this.history.push(editor.save());
  }
  public undo(editor: ResumeEditor): void {
    editor.restore(this.history.pop());
  }
}

const editor = new ResumeEditor();
const history = new ResumeHistory();
editor.setName("test1");
editor.setExperience(3);
editor.setSkills(['node', 'react']);

editor.save();
history.save(editor);
editor.print();

editor.setName("test2");
editor.save();
history.save(editor);
editor.print();
history.undo(editor);
editor.print();