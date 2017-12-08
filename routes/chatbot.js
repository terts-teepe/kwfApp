const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');
const Conversation = require('watson-developer-cloud/conversation/v1');

'use strict';

/*// Create the service wrapper
var conversation = new Conversation({
  // If unspecified here, the CONVERSATION_USERNAME and CONVERSATION_PASSWORD env properties will be checked
  // After that, the SDK will fall back to the bluemix-provided VCAP_SERVICES environment property
  'username': process.env.CONVERSATION_USERNAME,
  'password': process.env.CONVERSATION_PASSWORD,
  'version_date': '2017-05-26'
});

// Render profile page
router.get('/', function(req, res) {
    

    // Start conversation with empty message.
    conversation.message({}, processResponse);

    // Process the conversation response.
    function processResponse(err, response) {
      if (err) {
        console.error(err); // something went wrong
        return;
      }

      // Display the output from dialog, if any.
      if (response.output.text.length != 0) {
        console.log("check output here")
        console.log(response.output.text);
        console.log(response.output.text[0]);
      }
    }
    res.render('chatbot')
})*/




// Endpoint to be call from the client side
/*router.post('/api/message', function(req, res) {
  var workspace = process.env.WORKSPACE_ID || '<workspace-id>';
  if (!workspace || workspace === '<workspace-id>') {
=======
router.post('/', function(req, res) {
  var payload = {
    workspace_id: 'd11b2b05-b64c-4914-9ccf-3db1480c8b05',
    context: req.body.context || {},
    input: req.body.input || {}
  };

  console.log("payload.context")
  console.log(payload.context)
  console.log("payload.input")
  console.log(payload.input)

  var workspace = process.env.WORKSPACE_ID || 'd11b2b05-b64c-4914-9ccf-3db1480c8b05';
  if (!workspace || workspace === 'd11b2b05-b64c-4914-9ccf-3db1480c8b05') {
    return res.json({
      'output': {
        'text': 'The app has not been configured with a <b>WORKSPACE_ID</b> environment variable. Please refer to the ' + '<a href="https://github.com/watson-developer-cloud/conversation-simple">README</a> documentation on how to set this variable. <br>' + 'Once a workspace has been defined the intents may be imported from ' + '<a href="https://github.com/watson-developer-cloud/conversation-simple/blob/master/training/car_workspace.json">here</a> in order to get a working application.'
      }
    });
  }
  

  // Send the input to the conversation service
  conversation.message(payload, function(err, data) {
    if (err) {
      return res.status(err.code || 500).json(err);
    }
    console.log("check if input works");
    return res.json(updateMessage(payload, data));
  });
});*/

/**
 * Updates the response text using the intent confidence
 * @param  {Object} input The request to the Conversation service
 * @param  {Object} response The response from the Conversation service
 * @return {Object}          The response with the updated message
 */
function updateMessage(input, response) {
  var responseText = null;
  if (!response.output) {
    response.output = {};
  } else {
    return response;
  }
  if (response.intents && response.intents[0]) {
    var intent = response.intents[0];
    // Depending on the confidence of the response the app can return different messages.
    // The confidence will vary depending on how well the system is trained. The service will always try to assign
    // a class/intent to the input. If the confidence is low, then it suggests the service is unsure of the
    // user's intent . In these cases it is usually best to return a disambiguation message
    // ('I did not understand your intent, please rephrase your question', etc..)
    if (intent.confidence >= 0.75) {
      responseText = 'I understood your intent was ' + intent.intent;
    } else if (intent.confidence >= 0.5) {
      responseText = 'I think your intent was ' + intent.intent;
    } else {
      responseText = 'I did not understand your intent';
    }
  }
  response.output.text = responseText;
  return response;
}


module.exports = router;