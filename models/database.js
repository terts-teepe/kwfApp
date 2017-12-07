const Sequelize = require('sequelize');
const connectionString = ('postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/friendmagnet');
const db = new Sequelize(connectionString);

// defining elements of table user
/*const User = db.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  email: Sequelize.STRING
});*/

const User = db.define('user', {
    name: Sequelize.STRING,
    phoneNumber: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    image: Sequelize.STRING
});

const Relationship = db.define('relationship', {
    user_one_id: Sequelize.INTEGER,
    user_two_id: Sequelize.INTEGER,
    action_user_id: Sequelize.INTEGER
});

const Activity = db.define('activity', {
    plannerId: Sequelize.INTEGER,
    plannerName: Sequelize.STRING,
    categorie: Sequelize.STRING,
    time: Sequelize.TIME,
    date: Sequelize.DATEONLY,
/*    friend: Sequelize.STRING,*/
    location: Sequelize.STRING,
    readStatus: Sequelize.BOOLEAN,
    status: Sequelize.BOOLEAN
});

User.belongsToMany(Activity, {through: 'user_activity'})
Activity.belongsToMany(User, {through: 'user_activity'})

/*const User = db.define('user', {
    local: {
      name: Sequelize.STRING,
      phoneNumber: Sequelize.INTEGER,
      email: Sequelize.STRING,
      password: Sequelize.STRING     
    },
    facebook: {
      id: Sequelize.STRING,
      token: Sequelize.STRING,
      email: Sequelize.STRING,
      name: Sequelize.STRING
    }
});*/

db.sync({
    force: true,
})

.then(yolo => {

    //create test data -- always do this after synchronizing the database, otherwise NodeJS with it's asynchronisity will fuck you up.

    User.create({
      name: 'Terts',
      password: 'weetikniet',
      email: 'terts@live.nl',
      phoneNumber: '+31620528245',
      image: 'img/terts.jpg'
    })
    User.create({
      name: 'Rawan',
      password: '1234r',
      email: 'rawan@live.nl',
      phoneNumber: '+31614845655',
      image: 'img/rawan.jpg'
    })    
    User.create({
      name: 'Anuj',
      password: '1234a',
      email: 'anuj@live.nl',
      phoneNumber: '+31687903132',
      image: 'img/anuj.jpg'
    })    
    User.create({
      name: 'Fabio',
      password: '1234f',
      email: 'fabio@live.nl',
      phoneNumber: '+31637684022',
      image: 'img/fabio.jpg'
    })   

    .catch(e => console.log(e))
})

.catch(e => console.log(e))

module.exports = {
  db: db,
  User: User,
  Relationship: Relationship,
  Activity: Activity
}