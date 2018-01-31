const Sequelize = require('sequelize');
// const connectionString = ('postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/friendmagnet');
const connectionString = process.env.DATABASE_URL || 'postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/friendmagnet'
const db = new Sequelize(connectionString);
const pg = require('pg');
const bcrypt = require('bcrypt');

var client = new pg.Client(connectionString);
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

                                                      /* Tables */
const User = db.define('user', {
  name: Sequelize.STRING,
  phoneNumber: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  image: Sequelize.STRING
});

const Relationship = db.define('relationship', {
  user_one_id: Sequelize.INTEGER,
  user_two_id: Sequelize.INTEGER
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

                                                  /* Relationships */
User.belongsToMany(Activity, {through: 'user_activity'});
Activity.belongsToMany(User, {through: 'user_activity'});

db.sync({
    force: true,
})
.then(yolo => {
  //create test data -- always do this after synchronizing the database, otherwise NodeJS with it's asynchronisity will fuck you up.
  // open json(models.json) file form same folder

                                                /* Create some test data */
  bcrypt.hash('weetikniet', 10, function(err, hash) {
    User.create({
      name: 'Terts',
      password: hash,
      email: 'terts@live.nl',
      phoneNumber: '+31620528245',
      image: 'img/avatars/avatar-three.png'
    });
  });
  bcrypt.hash('1234r', 10, function(err, hash) {
    User.create({
      name: 'Rawan',
      password: hash,
      email: 'rawan@live.nl',
      phoneNumber: '+31614845655',
      image: 'img/avatars/avatar-four.png'
    }) ;
  });
  bcrypt.hash('1234a', 10, function(err, hash) {
    User.create({
      name: 'Anuj',
      password: hash,
      email: 'anuj@live.nl',
      phoneNumber: '+31687903132',
      image: 'img/avatars/avatar-one.png'
    });
  });
  bcrypt.hash('1234f', 10, function(err, hash) {
    User.create({
      name: 'Fabio',
      password: hash,
      email: 'fabio@live.nl',
      phoneNumber: '+31637684022',
      image: 'img/avatars/avatar-two.png'
    });
  });
})
.catch(e => console.log(e));

module.exports = {
  db: db,
  User: User,
  Relationship: Relationship,
  Activity: Activity
}