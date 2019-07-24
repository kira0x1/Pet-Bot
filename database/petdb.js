const Sequelize = require("sequelize");

const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  storage: "database.sqlite"
});

const Discord = require("discord.js");
const users = [];
const shop = [];
const user_pets = [];

const Users = sequelize.import("models/Users.js");
const UserPets = sequelize.import("models/UserPets.js");
const PetShop = sequelize.import("models/PetShop.js");

UserPets.belongsTo(PetShop, { foreignKey: "pet_id", as: "pet" });

Users.prototype.getPets = function () {
  return UserPets.findAll({
    where: { user_id: this.user_id },
    include: ["pet"]
  });
};

Reflect.defineProperty(users, "add", {
  value: async function add(user, amount) {
    const userFound = users.get(user.id);
    if (userFound) {
      userFound.balance += Number(amount);
      return userFound.save();
    }

    const new_user = await Users.create({
      user_id: user.id,
      user_name: user.tag,
      balance: amount
    });
    users.set(id, new_user);
    return new_user;
  }
});

Reflect.defineProperty(users, "getPets", {
  value: function getPets(id) {
    const user = users.find(u => u.id === id);
    if (!user) return;

    return UserPets.findAll({
      where: { user_id: id },
    });
  }
});

Reflect.defineProperty(users, "getBalance", {
  value: function getBalance(id) {
    const user = users.get(id);
    return user ? user.balance : 0;
  }
});

//ANCHOR init
//NOTE This needs to be called when the bot starts
async function init() {
  //set up users
  await setUpCollection(Users, ["id", "name", "balance"], users);
  await setUpCollection(PetShop, ["name", "cost"], shop);
}

async function setUpCollection(table, attributes, array) {
  const res = await table.findAll({ attributes: attributes }, { raw: true });
  res.map(data => array.push(data.toJSON()));
}

async function addUser(user) {
  await Users.create(user);
  users.push(user);
}

async function addUserPet(userID, petID) {
  
}

// async function getUserPets(id){
// const userFound = users.find(usr)
// }

//Users (db model)
//  getPets()

//users (Collection of users)
//  add(user, amount)
//  getBalance(id)

module.exports = { init, users, Users, addUser, shop, addUserPet };
