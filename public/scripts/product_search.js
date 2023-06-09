
function displayresultsContent(response, productCategory, priceFiltersApplied) {
  let $filterSection = $(filterSection);
  let $searchResults = $(searchResults);
  if (!priceFiltersApplied) {
    // filter section
    $filterSection.append(`
        <form id="price-range-form">
        <div class="labelSpanInput">
          <label for="min-price" class="form-label">Min price: </label>
          <span id="min-price-txt">$0</span>
          <input type="range" class="form-range" id="min-price" step="1" value="0" max="${response.maxPrice}">
        </div>
        <div class="labelSpanInput">
          <label for="max-price" class="form-label">Max price: </label>
          <span id="max-price-txt">$${response.maxPrice}</span>
          <input type="range" class="form-range" min="1" max="${response.maxPrice}" id="max-price" step="1" value="${response.maxPrice}">
      </div>
      </form>
  `);
  }

  if(priceFiltersApplied){
    $searchResults.empty();
  }

  // products
  for (const i in response.products) {
    $searchResults.append(`
      <div class="productContainers">
        <div class="resultsImageContainer">
          <img src="${response.products[i].thumbnail_photo_url}" alt="${response.products[i].description}" width="200" height="200">
        </div>
        <div class="resultsTextContainer">
          <h3>${response.products[i].name}</h3>
          <p>${response.products[i].description}</p>
        </div>
        <div class="resultsPriceContainer">
          $ ${response.products[i].price}
        </div>
      </div>
      `);
  }

}

function dispalyResults(response, productCategory, priceFiltersApplied) {
  let $resultsHeadingContainer = $(resultsHeadingContainer);

  if (!productCategory) {
    productCategory = 'ALL';
  }
  if(priceFiltersApplied){
    $resultsHeadingContainer.empty();
  }
  // response header
  $resultsHeadingContainer.append(`
    <h1 class="resultsHeading">Results for ${productCategory}</h1>
    <span class="resultsShowingCount">Showing 1 - ${response.products.length} of ${response.products.length}  results</span>`
  );

  // response content
  displayresultsContent(response, productCategory, priceFiltersApplied);


}

function showProducts(productCategory, minPrice, maxPrice) {
  return $.ajax({
    method: 'GET',
    url: '/search/products',
    data: { "productCategory": productCategory }
  })
    .done((response) => {
      dispalyResults(response, productCategory, false);
    });
}

function showProductsFiltered(productCategory, minPrice, maxPrice) {
  return $.ajax({
    method: 'GET',
    url: '/search/products/filtered',
    data: { "productCategory": productCategory, "minPrice": minPrice, "maxPrice": maxPrice }
  })
    .done((response) => {
      console.log('reponse', response);
      dispalyResults(response, productCategory, true);
    });
}

$(() => {
  const $productCategory = $('title').text();

  showProducts($productCategory);

  $('#filterSection').on('change', '#min-price', function() {
    let $minPrice = parseInt($('#min-price').val());
    let $maxPrice = parseInt($('#max-price').val());
    $('#min-price-txt').text('$' + $minPrice);
    showProductsFiltered($productCategory, $minPrice, $maxPrice);
  });

  $('#filterSection').on('change', '#max-price', function() {
    let $minPrice = parseInt($('#min-price').val());
    let $maxPrice = parseInt($('#max-price').val());
    $('#max-price-txt').text('$' + $maxPrice);
    showProductsFiltered($productCategory, $minPrice, $maxPrice);
  });

  $('#searchResults').on('click', '.productContainers', function() {
    const productName = $(this).find('h3').text().replace("Product Name: ", "");
    window.location.href = `/products/${productName}`;
  });


});
