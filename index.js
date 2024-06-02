document.addEventListener("DOMContentLoaded", () => {
  const booksContainer = document.getElementById("booksContainer");
  const cardList = document.getElementById("cardList");
  const searchInput = document.getElementById("searchInput");
  const emptyCartBtn = document.getElementById("emptyCartBtn");
  let books = [];
  let cart = [];

  fetch("https://striveschool-api.herokuapp.com/books")
    .then((response) => response.json())
    .then((data) => {
      books = data;
      renderBooks(books);
    });
  const renderBooks = (books) => {
    booksContainer.innerHTML = "";
    books.forEach((book) => {
      const bookCard = document.createElement("div");
      bookCard.className = "col-md-3 book-card";
      bookCard.innerHTML = `<div class="card">
                        <img src="${book.img}" class="card-img-top" alt="${book.title}">
                        <div class="card-body">
                            <h5 class="card-title">${book.title}</h5>
                            <p class="card-text">${book.price}€</p>
                            <button class="btn btn-primary add-to-cart-btn">Aggiungi al carrello</button>
                        </div>
                    </div>`;
      booksContainer.appendChild(bookCard);
      const addToCartBtn = bookCard.querySelector(".add-to-cart-btn");
      addToCartBtn.addEventListener("click", () => {
        addToCart(book);
        bookCard.classList.add("added-to-cart");
      });
    });
  };

  const addToCart = (book) => {
    if (!cart.includes(book)) {
      cart.push(book);
      updateCart();
    }
  };
  const updateCart = () => {
    cardList.innerHTML = "";
    cart.forEach((book) => {
      const cartItem = document.createElement("li");
      cartItem.className = "list-group-item";
      cartItem.innerHTML = `${book.title} - ${book.price}€
                <button class="btn btn-danger btn-sm float-right remove-btn">Rimuovi</button>`;
      cardList.appendChild(cartItem);
      const removeBtn = cartItem.querySelector(".remove-btn");
      removeBtn.addEventListener("click", () => {
        removeFromCart(book);
      });
    });
  };
  const removeFromCart = (book) => {
    cart = cart.filter((item) => item !== book);
    updateCart();
    const bookCard = Array.from(document.querySelectorAll(".book-card")).find(
      (card) => card.querySelector(".card-title").textContent === book.title
    );
    if (bookCard) {
      bookCard.classList.remove("added-to-cart");
    }
  };
  emptyCartBtn.addEventListener("click", () => {
    cart = [];
    updateCart();
    document
      .querySelectorAll(".book-card")
      .forEach((card) => card.classList.remove("added-to-cart"));
  });
  searchInput.addEventListener("input", (b) => {
    const searchTerm = b.target.value.toLowerCase();
    const filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm)
    );
    renderBooks(filteredBooks);
  });
});
