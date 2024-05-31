document.addEventListener('DOMContentLoaded', () => {
    const booksContainer = document.getElementById('booksContainer');
    const cardList = document.getElementById('cardList');
    const searchInput = document.getElementById('searchInput');
    const emptyCartBtn = document.getElementById('emptyCartBtn');
    let books = [];
    let cart = [];

    // Fetch - API
    fetch('https://striveschool-api.herokuapp.com/books')
        .then(response => response.json())
        .then(data => {
            books = data;
            renderBooks(books);
        });
        const renderBooks = (books) => {
            booksContainer.innerHTML = '';
            books.forEach(book => {
                const bookCard = document.createElement('div');
                bookCard.className = 'col-md-4 book-card';
                bookCard.innerHTML = `<div class="card">
                        <img src="${book.img}" class="card-img-top" alt="${book.title}">
                        <div class="card-body">
                            <h5 class="card-title">${book.title}</h5>
                            <p class="card-text">${book.price}€</p>
                            <button class="btn btn-primary add-to-cart-btn">Aggiungi al carrello</button>
                        </div>
                    </div>`;
                booksContainer.appendChild(bookCard);
                const addToCartBtn = bookCard.querySelector('.add-to-cart-btn');
                addToCartBtn.addEventListener('click', () => {
                    addToCart(book);
                    bookCard.classList.add('added-to-cart');
                });
            });
        };
            // Add to cart
    const addToCart = (book) => {
        if (!cart.includes(book)) {
            cart.push(book);
            updateCart();
        }
    };
                
   
});
