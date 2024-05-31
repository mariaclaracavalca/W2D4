document.addEventListener('DOMContentLoaded', () => {
    const booksContainer = document.getElementById('booksContainer');
    const cartList = document.getElementById('cartList');
    const searchInput = document.getElementById('searchInput');
    const emptyCartBtn = document.getElementById('emptyCartBtn');
    let books = [];

    // Fetch - API
    fetch('https://striveschool-api.herokuapp.com/books')
        .then(response => response.json())
        .then(data => {
            books = data;
            renderBooks(books);
        });

   
});
