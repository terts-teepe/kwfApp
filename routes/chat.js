const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const accountSid = 'ACbcdc77c3e680fef8b9eecbdb7bcc5ba4'; // Your Account SID from www.twilio.com/console
const authToken = 'f038a6a0dc3c0c41916100aeefca14f5';   // Your Auth Token from www.twilio.com/console
const client = new twilio(accountSid, authToken);
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/', function(req, res) {
	if(req.session.user) {
		let user = req.session.user
		let currentUserId = user.id;
		let currentUserName = user.name;

		db.User.findOne({
			where: {
				id: currentUserId
			},
			include : [	
				{model: db.Activity, 
                    where: {
                        plannerId: {
                            [Op.ne]: currentUserId
                        }
                    }
                }
			]
		})
		.then((user) => {
			if(user.dataValues.activities.length !== 0){
				res.render('chat', {user: user})
			}

			else {
				res.render('chat', {user: user})
			}
		})

	}
	
	else {
		res.redirect('/login?message=' + encodeURIComponent("Login First"));
	}
})

router.post('/', (req,res)=>{
	let user = req.session.user;
	let currentUserId = user.id;
	let currentUserName = user.name;
	let clickedBtn = req.body.btn;
	let activityId = req.body.id;
	let status;
	console.log("From Ajax request*****")
	console.log(req.body)
	if(clickedBtn === "Accept"){
		status = true;
		db.Activity.findOne({
			where: {
				id: activityId
			},
            include: [{ model: db.User,
                where: {
                    [Op.and]: [
                        {id:
                            {
                                [Op.ne]: planner.id
                            }
                        },
                        {id:
                            {
                                [Op.ne]: accepter.id
                            }
                        }
                    ]
                }
            }]

		})
		.then((activity)=> {
			activity.update({
				status: true,
				accepter: currentUserId
			})
			.then(()=>{
				db.User.findOne({
					where: {
						id: activity.plannerId
					}
				})
				.then((planner)=>{
					// Send a notification to accepter
					db.User.findOne({
						where: {
							id: activity.accepter
						}						
					})
					.then ((accepter)=>{
						client.messages.create({
						    body: `Hallo ${planner.name}, jouw vriend ${accepter.name} heeft je uitnodiging om te ${activity.categorie} geaccepteerd, Bekijk het op je profiel!`,
						    to: planner.phoneNumber,  // Text this number
						    from: '+3197004498785' // From a valid Twilio number
						})
						console.log('planner')
						console.log(planner.name)
						console.log(planner.id)
						console.log('accepter')
						console.log(accepter.id)
						console.log(accepter.name)
                        console.log("activity")
                        console.log(activity)
                        console.log("activity.dataValues")
                        console.log(activity.dataValues)
                        console.log(activity.dataValues.users)
						// Send notification to all but accepter

                        for (var i = 0; i < activity.dataValues.users.length; i++) {
                            console.log("activity.users[i]")
                            console.log(activity.users[i])
                            if(activity.users[i].id != activity.plannerId && activity.users[i].id != activity.accepterId){
                                client.messages.create({
                                    body: `Hello ${activity.users[i].name} this is Emma, your friend ${currentUserName} has planned an activity, check it out!`,
                                    to: activity.users[i].phoneNumber,  // Text this number
                                    from: '+3197004498785' // From a valid Twilio number
                                })
                                if(i === activity.users.length){
                                   res.redirect('/index')
                                }
                            }
                        }
/*						db.User.findAll({
							where: {
							    [Op.and]: [
								    {id:
								      	{
								      		[Op.ne]: planner.id
								      	}
								    },
								    {id:
								      	{
								      		[Op.ne]: accepter.id
								        }
								    }
								]
							  },
/*							include: [{model: db.Activity, where: {id: activityId}}]*/
						/*})
						.then((users)=> {
							console.log("****People who didn't accept****")
							console.log(users)
                            for (var i = 0; i < users.length; i++) {
                                client.messages.create({
                                    body: `Hallo ${users[i].name}, jouw vriend ${planner.name} heeft de hulp die hij nodig heeft gekregen , volgende keer meer succes!`,
                                    to: users[i].phoneNumber,  // Text this number
                                    from: '+3197004498785' // From a valid Twilio number
                                })
                                if(i === users.length-1){
                                    res.send(req.body);
                                }
                            }
							
						});*/

					});
				});
			});
		});
	}
	else {
		status = false;
		res.send(req.body);
	}
});

module.exports = router;