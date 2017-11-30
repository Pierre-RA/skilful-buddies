import { Serializable } from './serializable';

export class Trade implements Serializable<Trade> {
  name: string;
  content: string;
  owner: string;
  price: {
    value: number,
    type: string
  };
  color: string;

  deserialize<Trade>(input: Object): this {
    this.name = input['name'];
    this.content = input['content'];
    this.owner = input['owner'];
    if (input['price']) {
      this.price = {
        value: input['price']['value'],
        type: input['price']['type']
      };
    }
    this.color = input['color'];
    return this;
  }
}
