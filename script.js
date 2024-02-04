
const apiUrl = 'https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json';

function showTab(category) {
 
  document.querySelectorAll('.tab-content').forEach(tabContent => {
    tabContent.style.display = 'none';
  });

  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.remove('active');
  });


  document.getElementById(category).style.display = 'block';


  const tabElement = document.querySelector(`.tab[data-category="${category}"]`);
  if (tabElement) {
    tabElement.classList.add('active');
  }

  
  // Fetch and display products based on category
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const productList = document.getElementById(`${category}ProductList`);

      // Clear existing products
      productList.innerHTML = '';

      // Iterate through the array of products and display each product
      data.categories.forEach(fetch_data => {
        if (fetch_data.category_name.toLowerCase() === category) {
          fetch_data.category_products.forEach(product => {

            const discountPercentage = product.compare_at_price ? ((product.compare_at_price - product.price) / product.compare_at_price) * 100 : 0;

            const productDiv = document.createElement('div');
            productDiv.className = 'product';

            const truncatedTitle = product.title.length > 20 ? product.title.substring(0, 10) + '...' : product.title;

            productDiv.innerHTML = `
                      <img class='img' src="${product.image}" alt="${product.title}">
                      <div class='topic'>
                      <h3>${truncatedTitle}</h3>
                      <ul>
                        <li class='list'>${product.vendor}</li>
                      </u>
                      </div>
                      <p class='price'>
                        <span class="discounted-price">Rs${product.price}</span>
                        <span class="original-price">${product.compare_at_price ? `${product.compare_at_price}` : ''}</span>
                        <span class="discount-percentage">${discountPercentage.toFixed(2)}% off</span>
                      </p>
                      <button>Add to Cart</button>
            `;

            productList.appendChild(productDiv);
          });
        }
      });
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

// Show the default tab on page load
showTab('men');

