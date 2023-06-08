
function fetchItems(userName) {
  return $.ajax({
    method: 'GET',
    url: `/users/landing`,
    data: { "userName": userName }
  })
    .done((response) => {

      const $itemsList = $('#items');
      $itemsList.empty();
      for (const i in response.products) {

        if(response.products[i].sold){
          $itemsList.append(`
          <div class="product">
            <li class="image_wrapper">
              <img src="${response.products[i].thumbnail_photo_url}" alt="no image">
              <div class="overlay overlay_0">
                <h3> SOLD OUT </h3>
              </div>
            </li>
            <h3>Product Name: ${response.products[i].name}</h3>
            <p>Price: ${response.products[i].price}</p>
            <p>Stock: ${response.products[i].stock}</p>
            <p>Description: ${response.products[i].description}</p>
            <footer class="product-footer">
              <i class="fa-regular fa-bookmark"></i>
            </footer>
          </div>
          `);
        } else{
          $itemsList.append(`
            <div class="product">
              <img src="${response.products[i].thumbnail_photo_url}" alt="no image">
              <h3>Product Name: ${response.products[i].name}</h3>
              <p>Price: ${response.products[i].price}</p>
              <p>Stock: ${response.products[i].stock}</p>
              <p>Description: ${response.products[i].description}</p>
              <footer class="product-footer">
              <i class="fa-regular fa-bookmark" id="fav"></i>
            </footer>
            </div>`);

        }

      }

    });
}




$(() => {
  const $userName = $('title').text();

  $(window).on("load", function() {
    fetchItems($userName);
  });

  $('#items').on( 'click', '#fav', function(){
    const grandparent = ($('#fav').parent()).parent()
    const favProductName = grandparent.find('h3').text().replace("Product Name: ", "")
    addToFav($userName, favProductName)
  });


});
