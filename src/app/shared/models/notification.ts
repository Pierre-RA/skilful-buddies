export class Notification {

  constructor(
    private url: string,
    private title: string,
    private read: boolean
  ) {}

  setItRead(): void {
    this.read = true;
  }
}
