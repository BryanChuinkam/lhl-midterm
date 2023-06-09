
function fetchItems() {
  $.ajax({
    method: 'GET',
    url: '/api/itemsSellerApi',
    success: (response) => {
      const $itemsList = $('#items');
      $itemsList.empty();

      for (const item of response) {
        if (item.promotion) {
          let $item = $(`
            <div class="product">
              <img src="${item.thumbnail_photo_url}" alt="no image">
              <h3>Product Name: ${item.name}</h3>
              <p>Price: ${item.price}</p>
              <p>Stock: ${item.stock}</p>
              <p>Description: ${item.description}</p>
            </div>
          `);
          $itemsList.append($item);
        }
      }
    },
    error: (xhr, status, error) => {
      console.error('Error fetching items:', error);
    }
  });
}


$(document).ready(() => {

  fetchItems();

  $('#items').on('click', '.product', function() {
    const productName = $(this).find('h3').text().replace("Product Name: ", "");
    window.location.href = `/products/${productName}`;
  });

}


);

