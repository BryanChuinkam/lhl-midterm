// Client facing scripts here
$(() => {
  $('#post-item-form').on('submit', (event) => {
    event.preventDefault();
    console.log("ajax request");
    const data = $('#post-item-form').serialize();
    $.ajax({
      method: 'POST',
      url: '/api/additem',
      data: data
    })
    .then(function () {
      $.ajax({
        method: 'GET',
        url: '/api/itemsSellerApi'
      })
      .done((response) => {
        const $itemsList = $('#items');
        $itemsList.empty();
  
        for(const item of response) {
          console.log(item)
  
    let $item = $(`<div class="product">
    <img src="https://example.com/product-image.jpg" alt="no image">
    <h3>Product Name: ${item.name}</h3>
    <p>Price: ${item.price}</p>
    <p>Stock: ${item.stock}</p>
    <p>Description: ${item.description}</p>
  </div> `);
    // $item.appendTo($itemsList);
    $itemsList.prepend($item);
        }
        $('#item-image, #item-name, #item-description, #item-price, #item-category, #item-quantity, #featured-item').val('');
      });
    });
  });
    });
  

