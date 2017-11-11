import { Serializable } from './serializable';

export class Contact implements Serializable<Contact> {
  name: string;
  img: string;
  skills: Array<string>;
  trades: Array<string>;
  tagline: string;
  friends: Array<string>;
  place: string;
  networks: Array<string>;

  deserialize<Contact>(input: Object): this {
    this.name = input['name'];
    this.img = input['img'];
    this.tagline = input['tagline'];
    this.place = input['place'];
    this.skills = [];
    if (input['skills']) {
      input['skills'].forEach(skill => {
        this.skills.push(skill);
      })
    }
    this.trades = [];
    if (input['trades']) {
      input['trades'].forEach(trade => {
        this.trades.push(trade);
      })
    }
    this.friends = [];
    if (input['friends']) {
      input['friends'].forEach(friend => {
        this.friends.push(friend);
      })
    }
    this.networks = [];
    if (input['networks']) {
      input['networks'].forEach(network => {
        this.networks.push(network);
      })
    }
    return this;
  }

  static getContacts(input: Array<Object>): Array<Contact> {
    let result = [];
    input.forEach(contact => {
      result.push(new Contact().deserialize(contact));
    });
    return result;
  }
}
