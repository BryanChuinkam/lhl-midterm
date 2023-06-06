// Client facing scripts here
$(() => {
  $('#fetch-items').on('click', () => {
    $.ajax({
      method: 'GET',
      url: '/api/itemsSellerApi'
    })
    .then((response) => {
      const $itemList = $('#items');
      $itemList.empty();
      console.log(response);
      for(const product of response) {
        $(`<li class="items">`).text(product.name).appendTo($itemList);
      }
    });
  });
});


// //untill here it works fine and adds to database
//     //the rest is to display the listings under the form
//     .then (()=>{
//       $.ajax({
//         method: 'GET',
//       url: '/api/getSellerListings'
//       }).then((items)=>{
        
//           // clearListings();
//           for (const item in items) {
//             const item 

//             const listing = propertyListing.createList(property, isReservation);
//             addListing(listing);
//           }

//       })
//       })
//     }
