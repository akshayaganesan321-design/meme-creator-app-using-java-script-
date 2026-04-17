function login() {
  let msg = document.getElementById("loginMsg");
  msg.style.color = "green";
  msg.innerText = "Login successful! Redirecting...";
  setTimeout(() => {
    window.location.href = "home.html";
  }, 1000);
}

function logout() {
  // Redirect to logout page
  window.location.href = "logout.html";
}