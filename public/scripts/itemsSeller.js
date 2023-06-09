// // Client facing scripts here
$(() => {
  $('#fetch-items').on('click', () => {
    $.ajax({
      method: 'GET',
      url: '/api/itemsSellerApi'
    })
      .done((response) => {
        const $itemsList = $('#items');
        $itemsList.empty();

        for (const item of response) {
          console.log(item)

          let $item = $(`<div class="product">
  <img src="https://example.com/product-image.jpg" alt="no image">
  <h3>Product Name: ${item.name}</h3>
  <p>Price: ${item.price}</p>
  <p>Stock: ${item.stock}</p>
  <p>Description: ${item.description}</p>
</div> `);
          $itemsList.prepend($item);
        }
      });
  });
});


