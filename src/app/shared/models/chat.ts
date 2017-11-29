import { Serializable } from './serializable';

export class Chat implements Serializable<Chat> {
  name: string;
  image: string;
  title: string;
  subtext: string;
  read: boolean;
  last: string;
  messages: Array<Message>;

  deserialize<Chat>(input: Object): this {
    this.name = input['name'];
    this.image = input['image'];
    this.title = input['title'];
    this.subtext = input['subtext'];
    this.last = input['last'];
    this.read = input['read'];
    this.messages = [];
    if (input['messages']) {
      input['messages'].forEach(message => {
        this.messages.push(message);
      });
    }
    return this;
  }

  static getChats(input: Array<Object>): Array<Chat> {
    let result = [];
    input.forEach(chat => {
      result.push(new Chat().deserialize(chat));
    });
    return result;
  }
}

export interface Message {
  user: string;
  text: string;
  date: string;
}
