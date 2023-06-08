
function fetchItem(prodName) {
  return $.ajax({
    method: 'GET',
    url: `/products/details`,
    data: { "prodName": prodName }
  })
    .done((response) => {
      console.log("res: ", response.product[0]);
      const $item = $('#item');
      $item.empty();
      if (response.product[0].sold) {
        $item.append(`
          <div class="product">
            <li class="image_wrapper">
              <img src="${response.product[0].thumbnail_photo_url}" alt="no image">
              <div class="overlay overlay_0">
                <h3> SOLD </h3>
              </div>
            </li>
            <h3>Product Name: ${response.product[0].name}</h3>
            <p>Price: ${response.product[0].price}</p>
            <p>Stock: ${response.product[0].stock}</p>
            <p>Description: ${response.product[0].description}</p>
            <footer class="product-footer">
              <i class="fa-regular fa-bookmark"></i>
            </footer>
          </div>
          `);
      } else {
        $item.append(`
            <div class="product">
              <img src="${response.product[0].thumbnail_photo_url}" alt="no image">
              <h3>Product Name: ${response.product[0].name}</h3>
              <p>Price: ${response.product[0].price}</p>
              <p>Stock: ${response.product[0].stock}</p>
              <p>Description: ${response.product[0].description}</p>
              <footer class="product-footer">
              <i class="fa-regular fa-bookmark" id="fav"></i>
            </footer>
            </div>`);
      }

    }
    );
}




$(() => {
  const $prodName = $('title').text();

  $(window).on("load", function() {
    fetchItem($prodName);
  });

  $('#items').on('click', '#fav', function() {
    const grandparent = ($('#fav').parent()).parent();
    const favProductName = grandparent.find('h3').text().replace("Product Name: ", "");
    addToFav($userName, favProductName);
  });


});
