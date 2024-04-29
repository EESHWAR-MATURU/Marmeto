function changeButtonStyle(button) {
    var buttons = document.querySelectorAll('.button');
    buttons.forEach(function(btn) {
        btn.style.backgroundColor = '';
        btn.querySelector('.icon').style.display = 'none';
    });

    button.style.backgroundColor = 'black';
    button.querySelector('.icon').style.display = 'inline';
}

async function fetchData(categoryName) {
    try {
        const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
        const data = await response.json();

        const categoryData = data.categories.find(category => category.category_name.toLowerCase() === categoryName.toLowerCase());

        if (!categoryData) {
            console.error(`Category "${categoryName}" not found.`);
            return null;
        }

        return categoryData.category_products;
    } 
    catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', async function() {
        changeButtonStyle(this);

        const categoryName = this.textContent.trim();

        const products = await fetchData(categoryName);

        if (products) {
            document.getElementById('content').innerHTML = '';
            const contentElement = document.getElementById('content');
            products.forEach((product, index) => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');

                if (categoryName.toLowerCase() === 'men' && index === 0) {
                    addBadge(productCard, 'Wedding Special');
                }
                if (categoryName.toLowerCase() === 'men' && index === 3) {
                    addBadge(productCard, 'New Season');
                }
                if (categoryName.toLowerCase() === 'men' && index === 2) {
                    addBadge(productCard, 'On Offer');
                }
                if (categoryName.toLowerCase() === 'women' && (index === 0 || index === 3)) {
                    addBadge(productCard, 'New Season');
                }
                if (categoryName.toLowerCase() === 'women' && index === 2) {
                    addBadge(productCard, 'On Offer');
                }
                if (categoryName.toLowerCase() === 'kids' && (index === 0 || index === 3)) {
                    addBadge(productCard, 'New Season');
                }
                if (categoryName.toLowerCase() === 'kids' && index === 2) {
                    addBadge(productCard, 'On Offer');
                }

                const productImage = document.createElement('img');
                productImage.src = product.image;
                productImage.alt = product.title;
                productCard.appendChild(productImage);

                const productDetails = document.createElement('div');
                productDetails.classList.add('product-details');

                const productTitle = document.createElement('div');
                productTitle.classList.add('product-title');
                if (categoryName.toLowerCase() === 'men' && index === 0) {
                    productTitle.textContent = `${product.title} • Manyawar`; 
                } 
                else if (categoryName.toLowerCase() === 'men' && index === 1) {
                    productTitle.textContent = `${product.title} •  Puma`; 
                }
                else if (categoryName.toLowerCase() === 'women' && index === 0) {
                    productTitle.textContent = `${product.title} •  Manyawar`; 
                }
                else if (categoryName.toLowerCase() === 'kids' && index === 0) {
                    productTitle.textContent = `${product.title} •  Manyawar`; 
                }
                else {
                    productTitle.textContent = `${product.title} •  Myntra`;
                }
                productDetails.appendChild(productTitle);
                

                const pricesContainer = document.createElement('div');
                pricesContainer.classList.add('prices-container');

                const productPrice = document.createElement('div');
                productPrice.classList.add('product-price');
                productPrice.textContent = 'Rs ' + product.price;
                pricesContainer.appendChild(productPrice);

                const comparePrice = document.createElement('div');
                comparePrice.classList.add('product-compare-price');
                comparePrice.textContent = product.compare_at_price;
                pricesContainer.appendChild(comparePrice);

                const discountElement = document.createElement('div');
                discountElement.classList.add('discount');
                discountElement.textContent = '50% Off';
                pricesContainer.appendChild(discountElement);

                productDetails.appendChild(pricesContainer);

                const addToCartBtn = document.createElement('button');
                addToCartBtn.classList.add('add-to-cart');
                addToCartBtn.textContent = 'Add to Cart';
                productDetails.appendChild(addToCartBtn);

                productCard.appendChild(productDetails);

                contentElement.appendChild(productCard);
            });
        } 
        else {
            console.log('Error fetching products.');
        }
    });
});

function addBadge(productCard, badgeText) {
    const badge = document.createElement('div');
    badge.classList.add('badge');
    badge.textContent = badgeText;
    productCard.appendChild(badge);
}
