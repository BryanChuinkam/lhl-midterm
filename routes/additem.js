const express = require('express');
const router  = express.Router();
const itemQueries = require('../db/queries/additem');

router.get('/', (req, res) => {
  res.render('addItem');
}); 

router.post("/", function(req, res) {
  if (!req.body.text) {
    res.status(400).json({ error: 'invalid request: no data in POST body'});
    return;
  }
  itemQueries.addItemDatabase(req.body).then(users => {
    res.json({ users });
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });;
  
 
  //   },
  // };
});
module.exports = router;

// router.get('/', (req, res) => {
//   userQueries.getUsers()
//     .then(users => {
//       res.json({ users });
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ error: err.message });
//     });
// });
