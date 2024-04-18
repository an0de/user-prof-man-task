const idMaker = (start = 0, end = Infinity) => {
  let prevId = start - 1;

  return () => {
    const id = prevId + 1;
    prevId = id;
    return id <= end ? id : -1;
  };
};

class UserProfileManager {
  constructor() {
    this.users = [];
    this.makeId = idMaker(1);
  }

  addUser({ name, email }) {
    const id = this.makeId();
    if (id === -1) {
      return false;
    }
    this.users.push({ id, name, email });
    return true;
  }

  getIndexById(id) {
    const [index] = this.users.map((user, i) => (user.id === id ? i : -1))
      .filter((i) => i > -1);
    return index;
  }

  updateUser(id, userInfo) {
    const index = this.getIndexById(id);
    const user = this.users.at(index);
    if (index > -1) {
      this.users[index] = { ...user, ...userInfo };
      return true;
    }
    return false;
  }

  removeUser(id) {
    const index = this.getIndexById(id);
    const [user] = this.users.splice(index, 1);
    return user;
  }

  getAllUsers() {
    return [...this.users];
  }

  findUserByName(prefix) {
    return this.users.filter(({ name }) => name.startsWith(prefix));
  }
}

const profileManager = new UserProfileManager();

profileManager.addUser({ name: 'Alice', email: 'alice@example.com' });
profileManager.addUser({ name: 'Bob', email: 'bob@example.com' });

console.log(profileManager.getAllUsers());

profileManager.updateUser(1, { name: 'Alicia' });
profileManager.removeUser(2);

console.log(profileManager.findUserByName('Ali'));
