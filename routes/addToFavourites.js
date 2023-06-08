
router.post('/addToFav', function(req, res) {
  db.getBuyerId(req.body.userName)
    .then((buyerId) => {
      db.getProductId(req.body.prodName)
        .then((prodId) => {
          db.addToFav(buyerId[0].id, prodId[0].id)
            .then(() => {
              res.json(`item has been added `);
            });
        });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

});


module.exports = router;
