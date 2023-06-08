const express = require('express');
const router  = express.Router();
const messages = require('../db/queries/messaging');

router.get('/', (req, res) => {
  const threadId=req.query.id;
  console.log(req.query);
  console.log("this is the thread",threadId);
  messages.getMessages(threadId)
    .then((output )=> {
      console.log("this is the output",output);
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