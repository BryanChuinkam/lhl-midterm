
//delete an item from database
function deleteProduct(button) {
  let d = $(button).data('product-id');

  $.ajax({
    method: 'DELETE',
    url: '/api/deleteItem',
    data: { d },

  })
    .then(() => { grabItems(); });

  // return d;
}

//update an item thet is sold out 

function updateIsSold(button) {
  let d = $(button).data('product-id');
  console.log(d);
  $.ajax({
    method: 'PUT',
    url: '/api/updateItemSold',
    data: { d},

  })
    .then(() => { grabItems(); });

  // return d;
}




function populateItems(item) {
  let $item = $(`
  <div class="col">
    <div class="card mb-8">
      <div class="row g-0">
        <div class="col-md-2">
          <img src="${item.thumbnail_photo_url}" class="img-fluid rounded-start" alt="no image">
        </div>
        <div class="col-md-10">
          <div class="card-body">
            <h5 class="card-title">${item.name}  ${item.promotion ? "<span class=\"badge text-bg-primary\">Featured</span>" : ""} </h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">Price: $${item.price}</h6>
            <p class="card-text">${item.description}</p>
            <p class="card-text"><small class="text-body-secondary"> ${item.sold ? "<span class=\"badge text-bg-danger\">Sold out!</span>" : `Only ${item.stock} remaining in stock`}</small></p>
          </div>
          <div class="card-body">
            <button name="deleteProduct" type="button" data-product-id="${item.id}" onclick="deleteProduct(this)" class="btn btn-primary">Delete</button>
            <button name="isSold" type="button" data-product-id="${item.id}" onclick="updateIsSold(this)" class="btn btn-primary">SOLD</button>
          </div>
        </div>
      </div>
    </div>
</div>
`);
  return $item
}


// function populateItems(item) {
//   let $item = $(`<div class="product">
//   <img id="itemImage" src="${item.thumbnail_photo_url}" alt="no image">
//   <h4>Product Name: ${item.name}</h4>
//   <p>Price: ${item.price}</p>
//   <p>Stock: ${item.stock}</p>
//   <p>Description: ${item.description}</p>
//   <p>featured: ${item.promotion}</p>
//   <p>SOLD!: ${item.sold}</p>
//   <button name="deleteProduct" type="button" data-product-id="${item.id}" onclick="deleteProduct(this)" text="delete">Delete</button>
//   <button name="isSold" type="button" data-product-id="${item.id}" onclick="updateIsSold(this)" text="isSold">SOLD</button>
  
//   <i id="toggle-icon-on" class="fas fa-toggle-on" font-size: 24px style="color: red;font-size: 30px;"></i>
//   <i id="toggle-icon-off" class="fas fa-toggle-off" style="font-size: 30px; "></i>

// `);
//   return $item
// }
function grabItems() {
  return $.ajax({
    method: 'GET',
    url: '/api/itemsSellerApi'
  })
    .done((response) => {
      const $itemsList = $('#items');
      $itemsList.empty();

      for (const item of response) {
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
  $('#post-item-form').hide();


  $('#showAddForm').click(function () {
    if ($('#post-item-form').is(':visible')) {
      $('#post-item-form').hide();
    } else {
      $('#post-item-form').show();
    }
  });

  $('#post-item-form').on('submit', (event) => {
    event.preventDefault();
    console.log("ajax request");



    //   const data = $('#post-item-form').serialize({
    //     checkboxesAsBools: true
    // });
    let data = $(event.target).serializeArray()
      .filter(function (item) {
        return item.name != "promotion";
      })
      .concat({
        name: "promotion", value: $('input[name=promotion]').is(":checked")
      });
    data = jQuery.param(data);



    $.ajax({
      method: 'POST',
      url: '/api/additem',
      data: data
    })
      .then(function () {
        grabItems();
      });
  });


  //toggle the icons
  $('#toggle-icon-on').on('click', function () {
    toggleIcon.toggleClass('fa-toggle-off');
  });





});


