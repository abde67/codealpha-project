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

  const nav = document.getElementById('mainNav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }
  });


   const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    tabButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const tab = button.getAttribute('data-tab');
    tabContents.forEach(content => {
      content.classList.remove('active');
      if (content.id === tab) {
        content.classList.add('active');
      }
    });
  });
});


