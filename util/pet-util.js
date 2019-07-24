const util = require("util");
const db = require("../database/petdb");
const dir = console.dir;
const log = console.log;
const chalk = require("chalk");

module.exports = {
  /**
   *
   *
   * @returns {Array}
   * Array of pets
   */
  async getShopPets() {
    return db.shop;
  },

  /**
   *
   *
   * @param {String} userID
   * @constant
   */

  async getUserPets(userID) {
    return await db.users.getPets(userID);
  },

  async addUserPet(userID, petID) {
    await db.addUserPet(userID, petID)
  },

  async addUser(user) {
    const userFound = db.users.find(u => u.id === user.id);
    if (userFound) return log(chalk`{red.bold User found: ${userFound.name}}`);

    const newUser = { id: user.id, name: user.tag, balance: 0 };
    db.addUser(newUser);
    log(chalk`{blue.bold Added new user!}`);
  },
  listUsers() {
    const userList = [];
    db.users.map((usr, position) =>
      userList.push(`***(${position + 1})***  **${usr.name}**`)
    );
    return userList;
  }
};
