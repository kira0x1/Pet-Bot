const Sequelize = require('sequelize')
const chalk = require('chalk')

//NOTE For setting up / Clearing tables

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite',
});

const Users = sequelize.import('models/Users.js')
const UserPets = sequelize.import('models/UserPets.js')
const PetShop = sequelize.import('models/PetShop.js')

const force = process.argv.includes('--force') || process.argv.includes('-f')

sequelize.sync({ force: true }).then(async () => {
    const pets = [
        PetShop.upsert({ name: 'Pikachu', cost: 14 }),
        PetShop.upsert({ name: 'Meowth', cost: 10 }),
        PetShop.upsert({ name: 'Charizard', cost: 120 })
    ]

    await Promise.all(pets)
    console.log(chalk`{blue Database Synced!}\nForce:${force}`)
    sequelize.close()
}).catch(console.error)