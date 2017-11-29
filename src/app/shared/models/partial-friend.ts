export interface PartialFriend {
  _id: string;
  name: string;
}

export interface PartialFriendList {
  _id: string;
  friends: Array<PartialFriend>;
}
