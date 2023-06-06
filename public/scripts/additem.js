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
    // }).then(function () {
    //   $('output').html('140');
    //   $('#section').empty();
    //   $('#tweet-text').val('');
    //   loadTweets();
      

      // for(const product of response.products) {
      //   $(`<li class="user">`).text(product.name).appendTo($productList);
      // }
    });
  });

