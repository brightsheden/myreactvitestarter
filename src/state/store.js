// stores/UserStore.js
import { Store } from 'pullstate';
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

export const UserStore = new Store({
  user: userInfoFromStorage,        // Initialize user from localStorage
  isLoggedIn: !!userInfoFromStorage // Initialize isLoggedIn based on localStorage
});