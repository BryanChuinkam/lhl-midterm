const express = require('express');
const router = express.Router();
const messages = require('../db/queries/messaging');

router.get('/', (req, res) => {
  const adminId = 1;
  messages.getMessages(adminId)
    .then((output) => {
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