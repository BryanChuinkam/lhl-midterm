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
    });
  });
});
 /* <div class="product-card">
      <img src="https://example.com/product-image.jpg" alt="no image">
      <h3>Product Name</h3>
      <p>Price: $99</p>
      <p>Stock: 10</p>
      <p>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div> 
     */


  //         let $item = $(`
  // <article class="tweet">
  // <header>
  //   <div class="person">
  //     <img src="${item.product_image}">
      
  //   </div>
  //   <div>
  //   <p>${item.name}</p>
  //     <p>${item.price}</p>
  //   </div>
  // </header>
  
  // <div class="content">
  //   <p>
  //   ${item.description}
  //   </p>
  // </div>
  
  // <footer>
  //   <div>${item.stock}</div>
  //    </footer>
  // </article>
  // `);


