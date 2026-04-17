// Wishlist array
let wishlistItems = [];

function addToWishlist(category) {
  if(!wishlistItems.includes(category)){
    wishlistItems.push(category);
    renderWishlist();
  }
}

function renderWishlist() {
  let list = document.getElementById("wishlist");
  list.innerHTML = "";
  wishlistItems.forEach(item => {
    let li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
}

function searchMemes() {
  let query = document.getElementById("searchBox").value.trim();
  let result = document.getElementById("searchResult");

  if(query === ""){
    result.innerText = "Please enter a search term.";
    return;
  }

  // Simple demo search
  result.innerText = "Searching for memes about: " + query;
}