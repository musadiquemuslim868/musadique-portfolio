document.addEventListener("DOMContentLoaded", function(){

  // Dark Mode Toggle
  const toggle = document.getElementById("modeToggle");
  if(toggle){
    toggle.addEventListener("click", function(){
      document.body.classList.toggle("dark");
      if(document.body.classList.contains("dark")){
        toggle.textContent="☀️";
        localStorage.setItem("theme","dark");
      } else {
        toggle.textContent="🌙";
        localStorage.setItem("theme","light");
      }
    });
  }

  if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark");
    if(toggle) toggle.textContent="☀️";
  }

  // Mobile Hamburger Menu
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-links a");

  if(hamburger && navLinks){
    hamburger.addEventListener("click", function(){
      navLinks.classList.toggle("active");
    });
  }

  navItems.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });

  // ===== Scroll Active Link (including Contact fix) =====
  const sections = document.querySelectorAll("section");

  function updateActiveLink(){
    let scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 80; // header height offset
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if(scrollY >= sectionTop && scrollY < sectionTop + sectionHeight){
        navItems.forEach(link => {
          link.classList.remove("active-link");
          if(link.getAttribute("href") === "#" + sectionId){
            link.classList.add("active-link");
          }
        });
      }
    });

    // Extra fix for bottom of page (Contact)
    if(window.innerHeight + scrollY >= document.body.scrollHeight - 5){
      navItems.forEach(link => link.classList.remove("active-link"));
      const contactLink = document.querySelector('.nav-links a[href="#contact"]');
      if(contactLink) contactLink.classList.add("active-link");
    }
  }

  window.addEventListener("scroll", updateActiveLink);
  updateActiveLink(); // call once on load

});
