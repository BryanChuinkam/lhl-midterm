const express = require('express');
const router  = express.Router();
const itemQueries = require('../db/queries/messaging');

router.post('/', function(req, res) {
  console.log("reached route messaging");
  console.log(req.body);

  let userId = 4;// change this to session_ID later
  // let userID = req.session.user_id;
  if (!req.body) {
    res.status(400).json({ error: 'invalid request: no data in POST body'});
    return;
  }
  itemQueries.sendNewMessage(req.body,userId)
  .then(() => {
    console.log('successful');
    res.json(`item has been added `);
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });;

});

module.exports = router;