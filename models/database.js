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
    phoneNumber: Sequelize.INTEGER,
    email: Sequelize.STRING,
    password: Sequelize.STRING
});

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

const Relationship = db.define('relationship', {
    user_one_id: Sequelize.INTEGER,
    user_two_id: Sequelize.INTEGER,
    action_user_id: Sequelize.INTEGER
});

const Activity = db.define('activity', {
    categorie: Sequelize.STRING,
    time: Sequelize.DATE,
    friend: Sequelize.STRING,
    location: Sequelize.STRING
});

db.sync({
    force: true,
})

.then(yolo => {

    //create test data -- always do this after synchronizing the database, otherwise NodeJS with it's asynchronisity will fuck you up.
/*    User.create({
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
    User.create({
      username: 'Eva',
      password: '1234e',
      email: 'eva@live.nl'
    })*/
    User.create({
      name: 'terts-teepe',
      password: 'weetikniet',
      email: 'terts@live.nl',
      phoneNumber: 0643526354
    })
    User.create({
      name: 'Rawan',
      password: '1234r',
      email: 'rawan@live.nl',
      phoneNumber: 0643526354
    })    
    User.create({
      name: 'Anuj',
      password: '1234a',
      email: 'anuj@live.nl',
      phoneNumber: 0643526354
    })    
    User.create({
      name: 'Fabio',
      password: '1234f',
      email: 'fabio@live.nl',
      phoneNumber: 0643526354
    })   

    .catch(e => console.log(e))
})

.catch(e => console.log(e))

module.exports = {
  db: db,
  User: User,
  Relationship: Relationship
}