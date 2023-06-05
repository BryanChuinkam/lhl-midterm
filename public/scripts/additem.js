// Client facing scripts here
$(() => {
  $('#additem').on('click', () => {
    const data = $('#post-item-form').serialize();
    $.ajax({
      method: 'POST',
      url: '/api/additem',
      data: data
    })

      // for(const product of response.products) {
      //   $(`<li class="user">`).text(product.name).appendTo($productList);
      // }
    });
  });
});
