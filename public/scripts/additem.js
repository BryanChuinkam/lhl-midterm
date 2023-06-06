// Client facing scripts here
$(() => {
  $('#post-item-form').on('submit', (event) => {
    event.preventDefault();
    console.log("ajax request");
    const data = $('#post-item-form').serialize({
      checkboxesAsBools: true
  });
    // let data = $("#post-item-form").serializeArray();
    // data["promotion"] = $('#featured-item').is(":checked");
    // data = jQuery.param(data);
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
    <img id="itemImage" src="${item.product_image}" alt="no image">
    <h4>Product Name: ${item.name}</h4>
    <p>Price: ${item.price}</p>
    <p>Stock: ${item.stock}</p>
    <p>Description: ${item.description}</p>
    <p>featured: ${item.promotion}</p>
  </div> `);
    // $item.appendTo($itemsList);
    $itemsList.prepend($item);
        }
        $('#item-image, #item-name, #item-description, #item-price, #item-category, #item-quantity, #featured-item').val('');
      });
    });
  });
    });
  

