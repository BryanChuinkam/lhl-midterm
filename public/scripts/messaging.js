

function getAllMessages(threadId) {
  return $.ajax({
    method: 'GET',
    url: '/api/getAllMessagesApi',
    data: { id: threadId },
  })
    .then((messages) => {
      console.log("this is ajax", messages);
      const $messageList = $('#messageHistory');
      $messageList.empty();

      for (const message of messages) {
        console.log(message);
        $messageList.append(populateMessages(message));
      }

      $('#messageText').val('');
    })
    .catch((error) => {
      console.error("AJAX request failed:", error);
    });
}


function populateMessages(message) {
  var $message = $(
    `<section>
      <p><strong>Sender Name:</strong> ${message.user_name}</p>
      <p><strong> date:</strong> ${message.created_at}</p>
      <p><strong>thread:</strong> ${message.thread_id}</p>
      <p><strong>Message Text:</strong> ${message.message}</p>
    </section>`
  );
  return $message;
}
$(() => {
  getAllMessages(1);
  $('#message-form').on('submit', (event) => {
    event.preventDefault();
    console.log("ajax request");
  const data = $('#message-form').serialize();
  $.ajax({
    method: 'POST',
    url: '/api/messaging',
    data: data
  }).then(function () {
    getAllMessages(1); //change this to thread id from the user threads
  });
  })
});


{/* <section id="messageHistory"></section> */}



// function deleteProduct(button) {
//   let d = $(button).data('product-id');

//   $.ajax({
//     method: 'DELETE',
//     url: '/api/deleteItem',
//     data: { d },

//   })
//     .then(() => { grabItems(); });

// }


// function updateIsSold(button) {
//   let d = $(button).data('product-id');
//   console.log(d);
//   $.ajax({
//     method: 'PUT',
//     url: '/api/updateItemSold',
//     data: { d },

//   })
//     .then(() => { grabItems(); });

// }







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
// function grabItems() {
//   return $.ajax({
//     method: 'GET',
//     url: '/api/itemsSellerApi'
//   })
//     .done((response) => {
//       const $itemsList = $('#items');
//       $itemsList.empty();

//       for (const item of response) {
//         console.log(item)
//         $itemsList.prepend(populateItems(item));
//       }
//       $('#item-image, #item-name, #item-description, #item-price, #item-category, #item-quantity, #featured-item').val('');
//     });
// }

// $(() => {

//   grabItems();
//   $('#post-item-form').hide();


//   $('#showAddForm').click(function () {
//     if ($('#post-item-form').is(':visible')) {
//       $('#post-item-form').hide();
//     } else {
//       $('#post-item-form').show();
//     }
//   });

//   $('#post-item-form').on('submit', (event) => {
//     event.preventDefault();
//     console.log("ajax request");



//     const data = $('#post-item-form').serialize()
//     // checkboxesAsBools: true
//     // });
//     // let data = $(event.target).serializeArray()
//     //   .filter(function (item) {
//     //     return item.name != "promotion";
//     //   })
//     //   .concat({
//     //     name: "promotion", value: $('input[name=promotion]').is(":checked")
//     //   });
//     // data = jQuery.param(data);



//     $.ajax({
//       method: 'POST',
//       url: '/api/additem',
//       data: data
//     })
//       .then(function () {
//         grabItems();
//       });
//   });

// });


