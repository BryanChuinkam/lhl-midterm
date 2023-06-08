
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

        if(response.products[i].stock === 10){
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

});
