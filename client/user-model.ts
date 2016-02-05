'use strict';

class User {
  id:number;
  username:string;
  email:string;
  active:boolean;
  createdAt:string;
  updatedAt:string;

  constructor(options:any) {
    this.setOptions(options);
  }

  /**
   * @param options
   */
  setOptions(options:any) {
    for (let key in options) {
      this[key] = options[key];
    }
  }

  /**
   * @returns {boolean}
   */
  isGuest():boolean {
    return !!!this.id;
  }
}

export default User;
