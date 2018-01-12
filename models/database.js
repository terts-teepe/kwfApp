const Sequelize = require('sequelize');
const connectionString = ('postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/friendmagnet');
const db = new Sequelize(connectionString);
const pg = require('pg');
const conString = process.env.ELEPHANTSQL_URL || "postgres://postgres:5432@localhost/postgres";

// defining elements of table user
/*const User = db.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  email: Sequelize.STRING
});*/

var client = new pg.Client(conString);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT NOW() AS "theTime"', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].theTime);
    //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
    client.end();
  });
});


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
    location: Sequelize.STRING,
    accepter: Sequelize.INTEGER,
    status: Sequelize.BOOLEAN
});

User.belongsToMany(Activity, {through: 'user_activity'});
Activity.belongsToMany(User, {through: 'user_activity'});

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
    // open json(models.json) file form same folder
    User.create({
      name: 'Terts',
      password: 'weetikniet',
      email: 'terts@live.nl',
      phoneNumber: '+31620528245',
      image: 'img/avatars/avatar-three.png'
    })
    User.create({
      name: 'Rawan',
      password: '1234r',
      email: 'rawan@live.nl',
      phoneNumber: '+31614845655',
      image: 'img/avatars/avatar-four.png'
    })    
    User.create({
      name: 'Anuj',
      password: '1234a',
      email: 'anuj@live.nl',
      phoneNumber: '+31687903132',
      image: 'img/avatars/avatar-one.png'
    })    
    User.create({
      name: 'Fabio',
      password: '1234f',
      email: 'fabio@live.nl',
      phoneNumber: '+31637684022',
      image: 'img/avatars/avatar-two.png'
    })    
    User.create({
      name: 'Aida',
      password: '1234a',
      email: 'aida@live.nl',
      phoneNumber: '+31634061173',
      image: 'img/avatars/avatar-five.png'
    })      
    User.create({
      name: 'Omar',
      password: '1234o',
      email: 'omar@live.nl',
      phoneNumber: '+31636462976',
      image: 'img/avatars/avatar-five.png'
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