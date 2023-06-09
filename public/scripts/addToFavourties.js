
function addToFav(userName, prodName) {
  $.ajax({
    method: 'POST',
    url: '/users/addToFav',
    data: {"userName": userName, "prodName": prodName}
  })
    .then(function () {
      console.log("DONE");
    });
}



$(() => {
  const $userName = $('title').text();

  $('#items').on( 'click', '#fav', function(){
    const grandparent = ($('#fav').parent()).parent()
    const favProductName = grandparent.find('h3').text().replace("Product Name: ", "")
    addToFav($userName, favProductName)
  });


});
