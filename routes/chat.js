											/* Require libraries */
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

											/* chat with emma page */
router.get('/', function(req, res) {
	// If session
	let user = req.session.user;
	if(user) {
		let currentUserId = user.id;
		// Find current user
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
			// If he has activities
			if(user.dataValues.activities.length !== 0){
				res.render('chat', {user: user, title: 'chat', currentUserName: user.name})
			}
			// If not
			else {
				res.render('chat', {user: user, title: 'chat'})
			}
		})
	}
	// If no session
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
	let plannerId = req.body.plannerId;
	let status;
	let obj = {};
	// If friend has accepted
	if(clickedBtn === "Accept"){
		status = true;
		// Change activity status
		db.Activity.findOne({
			where: {
				id: activityId
			},
            include: [{ model: db.User}]
		})
		.then((activity)=> {
			activity.update({
				status: true,
				accepter: currentUserId
			})
			.then(()=> {
				// Find planner
				db.User.findOne({
					where: {
						id: activity.plannerId
					}
				})
				.then((planner)=>{
					// Find accepter
					db.User.findOne({
						where: {
							id: activity.accepter
						}						
					})
					.then ((accepter)=>{
						// Send notification to planner
						client.messages.create({
						    body: `Hallo ${planner.name}, je vriend ${accepter.name} heeft je uitnodiging om ${activity.categorie} geaccepteerd, Bekijk het op je profiel!`,
						    to: planner.phoneNumber,  // Text this number
						    from: '+3197004498785' // From a valid Twilio number
						})
						// Send notification to all but accepter
                        for (var i = 0; i < activity.dataValues.users.length; i++) {
                            if(activity.users[i].id !== planner.id && activity.users[i].id !== accepter.id){
                                client.messages.create({
                                    body: `Hallo ${activity.users[i].name}, ${accepter.name} heeft de activiteit van ${planner.name} geaccepteerd`,
                                    to: activity.users[i].phoneNumber,  // Text this number
                                    from: '+3197004498785' // From a valid Twilio number
                                })
                            }
                            if(i === activity.dataValues.users.length-1){
                            	console.log("********")
                            	console.log('body: ' + JSON.stringify(req.body));
                               	res.send(req.body)
                            }
                        }
					});
				});
			});
		});
	}
	// If friend has declined
	else {
		status = false;
		res.redirect('/index');
	}
});

module.exports = router;