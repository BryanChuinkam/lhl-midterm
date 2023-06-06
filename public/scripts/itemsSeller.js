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