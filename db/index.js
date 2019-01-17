const Sequelize = require('sequelize');
const sampleUsers = require('./seedData.js')

const sequelize = new Sequelize('twitchchat', 'root', 'WallacePennyToby', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,
  define: {
    timestamps: false
  },

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const User = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING
  },
  twitch_sub: {
    type: Sequelize.BOOLEAN
  },
  mod_status: {
    type: Sequelize.BOOLEAN
  },
  color: {
    type: Sequelize.STRING
  }
});



// User.bulkCreate(sampleUsers()).then(() => {
//   return User.findAll();
// }).then(users => {
//   console.log(users)
// });

const Chat = sequelize.define('chats', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  video_timestamp: {
    type: Sequelize.STRING
  },
  chat: {
    type: Sequelize.TEXT
  },
  user_id: {
    type: Sequelize.INTEGER,
    references: 'users',
    referencesKey: 'id'
  },
  video_id: {
    type: Sequelize.INTEGER
  }
});

User.hasMany(Chat);

const grabUsernameFromDb = (id) => {
  return User.findByPk(id)
    .then((foundUser) => {
      const username = foundUser.dataValues;
      return username;
    })
    .catch((err)=> {
      console.error('from db', err);
    });
};

module.exports = grabUsernameFromDb;

