const Sequelize = require('sequelize');
const connectionString = ('postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/friendmagnet');
const db = new Sequelize(connectionString);

// defining elements of table user
const User = db.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  email: Sequelize.STRING
});

const Relationship = db.define('relationship', {
  user_one_id: Sequelize.INTEGER,
  user_two_id: Sequelize.INTEGER,
  action_user_id: Sequelize.INTEGER
});

db.sync({
    force: true,
})

.then(yolo => {

    //create test data -- always do this after synchronizing the database, otherwise NodeJS with it's asynchronisity will fuck you up.
    User.create({
      username: 'terts-teepe',
      password: 'weetikniet',
      email: 'terts@live.nl'
    })
    User.create({
      username: 'rawan.ad',
      password: '1234r',
      email: 'rawan@live.nl'
    })    
    User.create({
      username: 'anuj',
      password: '1234a',
      email: 'anuj@live.nl'
    })    
    User.create({
      username: 'fabio',
      password: '1234f',
      email: 'fabio@live.nl'
    })    
    User.create({
      username: 'Pascal',
      password: '1234p',
      email: 'pascal@live.nl'
    })    
    User.create({
      username: 'Pierre',
      password: '1234p',
      email: 'pierre@live.nl'
    })
    .catch(e => console.log(e))
})

.catch(e => console.log(e))

module.exports = {
  db: db,
  User: User,
  Relationship: Relationship
}