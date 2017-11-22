import { Serializable } from './serializable';

export class User implements Serializable<User> {

  id: string;
  name: string;
  slug: string;
  gender: string;
  picture: string;
  social: {
    facebook?: string,
    linkedIn?: string,
    google?: string,
    twitter?: string
  };
  place: {
    address?: string,
    city?: string,
    state?: string,
    country?: string,
    latitude?: number,
    longitude?: number
  };
  skills: Array<string>;
  friends: Array<User>;

  deserialize<User>(input: Object): this {
    this.id = input['_id'];
    this.name = input['name'];
    this.slug = input['slug'];
    this.gender = input['gender'];
    this.picture = input['picture'];
    if (input['social']) {
      this.social = {
        facebook: input['social']['facebook'],
        linkedIn: input['social']['linkedIn'],
        google: input['social']['google'],
        twitter: input['social']['twitter']
      };
    }
    if (input['skills']) {
      this.skills = [];
      input['skills'].forEach(skill => {
        this.skills.push(skill);
      });
    }
    if (input['friends']) {
      this.friends = [];
      input['friends'].forEach(friend => {
        this.friends.push(new User().deserialize(friend));
      });
    }
    if (input['place']) {
      this.place = {
        address: input['place']['address'],
        city: input['place']['city'],
        country: input['place']['country'],
        latitude: input['place']['latitude'],
        longitude: input['place']['longitude'],
      };
    }
    return this;
  }

  static getUsers(input: Array<Object>): Array<User> {
    let result = [];
    input.forEach(user => {
      if (user['social']) {
        result.push(new User().deserialize(user));
      }
    });
    return result;
  }

}
