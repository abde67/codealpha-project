function toggleMenu() {
  const menu = document.getElementById("navMenu");
  const nav = document.getElementById("mainNav");
  const openIcon = document.getElementById("openIcon");
  const closeIcon = document.getElementById("closeIcon");

  const isOpen = menu.classList.toggle("show");
  nav.classList.toggle("mobile-active", isOpen);

  openIcon.style.display = isOpen ? "none" : "block";
  closeIcon.style.display = isOpen ? "block" : "none";
}

