import { Serializable } from './serializable';

export class Skill implements Serializable<Skill> {
  name: string;
  content: string;
  owner: string;

  deserialize<Skill>(input: Object): this {
    this.name = input['name'];
    this.content = input['content'];
    this.owner = input['owner'];
    return this;
  }
}
