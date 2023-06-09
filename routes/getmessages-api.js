const express = require('express');
const router  = express.Router();
const messages = require('../db/queries/messaging');

router.get('/', (req, res) => {
  // const threadId=req.query.id;
  const adminId=1;
  // console.log(req.query);
  // console.log("this is the thread",adminId);
  messages.getMessages(adminId)
    .then((output )=> {
      // console.log("this is the output",output);
      res.json(output);
      console.log("done");
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;