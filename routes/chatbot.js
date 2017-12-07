const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');
var ConversationV1 = require('watson-developer-cloud/conversation/v1');
    // Set up Conversation service wrapper.
    var conversation = new ConversationV1({
      username: 'd9770ce8-59fa-4134-88fd-e42fdfc86642', // replace with username from service key
      password: 'JLSm1G40w02H', // replace with password from service key
      path: { workspace_id: 'd11b2b05-b64c-4914-9ccf-3db1480c8b05' }, // replace with workspace ID
      version_date: '2017-05-26'
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
        console.log(response.output.text[0]);
      }
    }
})

module.exports = router;




