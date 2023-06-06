// Client facing scripts here

function deleteProduct(button){
  let d = $(button).data('product-id'); 
  
  $.ajax({
    method: 'DELETE',
    url: '/api/deleteItem',
    data: {d},
    
    })
    .then(()=>{grabItems();});
  
  // return d;
}
function populateItems(item){
  let $item = $(`<div class="product">
  <img id="itemImage" src="${item.product_image}" alt="no image">
  <h4>Product Name: ${item.name}</h4>
  <p>Price: ${item.price}</p>
  <p>Stock: ${item.stock}</p>
  <p>Description: ${item.description}</p>
  <p>featured: ${item.promotion}</p>
 
  <button name="deleteProduct" type="button" data-product-id="${item.id}" onclick="deleteProduct(this)" text="delete">Delete</button>
</div> `);
return $item
}
function grabItems(){
  return $.ajax({
    method: 'GET',
    url: '/api/itemsSellerApi'
  })
  .done((response) => {
    const $itemsList = $('#items');
    $itemsList.empty();

    for(const item of response) {
      console.log(item)
// $item.appendTo($itemsList);
$itemsList.prepend(populateItems(item));
    }
    $('#item-image, #item-name, #item-description, #item-price, #item-category, #item-quantity, #featured-item').val('');
  });
}

$(() => {
//get all items in database for certain seller on page load
  grabItems();

  $('#post-item-form').on('submit', (event) => {
    event.preventDefault();
    console.log("ajax request");
    const data = $('#post-item-form').serialize({
      checkboxesAsBools: true
  });
    $.ajax({
      method: 'POST',
      url: '/api/additem',
      data: data
    })
    .then(function () {
     grabItems();
    });
  });



//   $("button[name=deleteProduct]").click(() =>{
//      deleteProduct(this);
// });


    });
  

