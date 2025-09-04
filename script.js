document.addEventListener('DOMContentLoaded', () => {
  // --- Particle Animation on Canvas ---
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particlesArray = [];

  class Particle {
    constructor(x, y, directionX, directionY, size, color) {
      this.x = x;
      this.y = y;
      this.directionX = directionX;
      this.directionY = directionY;
      this.size = size;
      this.color = color;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
    update() {
      if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
      if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
      this.x += this.directionX;
      this.y += this.directionY;
      this.draw();
    }
  }

  function initParticles() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
      let size = Math.random() * 2 + 1;
      let x = Math.random() * (canvas.width - size * 2) + size * 2;
      let y = Math.random() * (canvas.height - size * 2) + size * 2;
      let directionX = Math.random() * 0.4 - 0.2;
      let directionY = Math.random() * 0.4 - 0.2;
      let color = 'rgba(0,0,0,0.5)';
      particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
  }

  function animateParticles() {
    requestAnimationFrame(animateParticles);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => p.update());
  }

  initParticles();
  animateParticles();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  });

  // --- Typing Text Animation ---
  const typingTextElement = document.getElementById('typing-text');
  const words = ["Frontend Developer", "UI/UX Designer", "Web Developer"];
  let wordIndex = 0, charIndex = 0, isDeleting = false;

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      setTimeout(() => (isDeleting = true), 2000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
    setTimeout(type, isDeleting ? 100 : 200);
  }
  type();

  // --- Header Scroll Effect ---
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  // --- Scroll Reveal Animation ---
  const revealElements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    },
    { threshold: 0.1 }
  );
  revealElements.forEach(el => observer.observe(el));

  // --- Project Data and Modal Logic ---
  const projectData = {
    1: { title: "Hotels", description: "A real-time hotels conferencing app...", tech: ["Tailwindcss", "React", "JS", "Node.js"], liveUrl: "https://hotels-pages.vercel.app/", codeUrl: "#" },
    2: { title: "Net-clone", description: "A live social media platform with React and Redux...", tech: ["React", "Redux", "Node.js", "Tailwindcss"], liveUrl: "https://net-clone-one.vercel.app/", codeUrl: "#" },
    3: { title: "Landing-Page", description: "A live Markdown blog editor with filtering...", tech: ["Node.js", "React", "JavaScript"], liveUrl: "https://landing-page-opal-nine-95.vercel.app/", codeUrl: "#" },
    4: { title: "Tech-Page", description: "A live Markdown blog editor with filtering...", tech: ["Node.js", "React", "JavaScript"], liveUrl: "https://tech-page-theta.vercel.app/", codeUrl: "#" },
    5: { title: "EDigital Design", description: "A modular e-learning platform with user...", tech: ["React", "Node.js"], liveUrl: "https://project-assign-3vq6.vercel.app/", codeUrl: "#" },
  };

  const projectsGrid = document.getElementById('projects-grid');
  Object.keys(projectData).slice(0, 6).forEach(key => {
    const project = projectData[key];
    const card = document.createElement('div');
    card.className = 'project-card card-hover reveal cursor-pointer group h-full flex flex-col';
    card.dataset.projectId = key;
    card.innerHTML = `
      <div class="relative rounded-lg overflow-hidden shadow-lg flex-1 bg-blue">
        <img src="https://placehold.co/600x400/${Math.floor(Math.random()*16777215).toString(16)}/ffffff?text=${project.title.replace(' ', '+')}" 
             alt="${project.title}" 
             class="w-full h-full object-cover transition-transform duration-500">
        <div class="card-overlay absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 transition-opacity duration-500">
          <h3 class="text- text-2xl font-bold">${project.title}</h3>
        </div>
      </div>
    `;
    projectsGrid.appendChild(card);
  });

  const projectCards = document.querySelectorAll('.project-card');
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');

  function openModal(projectId) {
    const data = projectData[projectId];
    if (!data) return;

  modalContent.innerHTML = `
  <div class="p-6 sm:p-8 relative 
              bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
              text-white dark:from-gray-800 dark:via-gray-900 dark:to-black 
              rounded-2xl shadow-xl transition-colors duration-300 
              w-full max-w-2xl mx-auto overflow-y-auto max-h-[90vh]">
              
    <button id="close-modal" 
      class="absolute top-4 right-4 text-gray-200 hover:text-white dark:hover:text-gray-300 transition">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
    
    <h2 class="text-2xl sm:text-4xl font-bold mb-4">${data.title}</h2>
    
    <p class="text-white/90 dark:text-gray-300 mb-6 text-base sm:text-lg">
      ${data.description}
    </p>
    
    <div class="flex flex-wrap gap-3 mb-8">
      ${data.tech.map(t => `
        <span class="bg-white/20 dark:bg-gray-700 text-white dark:text-gray-200 
                     text-sm font-medium px-4 py-2 rounded-full backdrop-blur-sm">
          ${t}
        </span>`).join('')}
    </div>
    
    <div class="flex flex-col sm:flex-row sm:space-x-4 gap-4 sm:gap-0">
      <a href="${data.liveUrl}" target="_blank" 
         class="bg-white text-indigo-700 hover:bg-gray-100 
                font-bold py-3 px-6 rounded-full text-lg text-center 
                transition-transform transform hover:scale-105">
         View Live
      </a>
      <a href="${data.codeUrl}" target="_blank" 
         class="bg-gray-900 text-white hover:bg-gray-800 
                font-bold py-3 px-6 rounded-full text-lg text-center 
                transition-transform transform hover:scale-105">
         View Code
      </a>
    </div>
  </div>
`;





  







    modal.classList.remove('hidden');
    setTimeout(() => modalContent.classList.remove('scale-95', 'opacity-0'), 50);
    document.getElementById('close-modal').addEventListener('click', closeModal);
  }

  function closeModal() {
    modalContent.classList.add('scale-95', 'opacity-0');
    setTimeout(() => modal.classList.add('hidden'), 300);
  }

  projectCards.forEach(card => card.addEventListener('click', () => openModal(card.dataset.projectId)));
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal(); });

  // --- Mobile menu toggle ---
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });
  }

  // --- Contact Form Validation ---
  const form = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      formStatus.textContent = 'Sending...';
      formStatus.className = 'text-blue-600 text-center mt-4';

      // Simulate async
      setTimeout(() => {
        formStatus.textContent = 'Message sent successfully!';
        formStatus.className = 'text-green-600 text-center mt-4';
        form.reset();

        setTimeout(() => (formStatus.textContent = ''), 5000);
      }, 1000);
    });
  }
});



document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");
  const navLinks = document.querySelectorAll("nav a");

  // Reveal on scroll
  const revealOnScroll = () => {
    const trigger = window.innerHeight * 0.85;
    reveals.forEach((el) => {
      const top = el.getBoundingClientRect().top;
      if (top < trigger) {
        el.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  // Highlight active section in nav
  const sections = document.querySelectorAll("section[id]");
  const highlightOnScroll = () => {
    let scrollY = window.pageYOffset + 150; // offset for header
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  };

  window.addEventListener("scroll", highlightOnScroll);
  highlightOnScroll();
});





document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    const triggerBottom = window.innerHeight * 0.85;

    reveals.forEach((el) => {
      const boxTop = el.getBoundingClientRect().top;

      if (boxTop < triggerBottom) {
        el.classList.add("active");
      }
    });
  }

  // Run on scroll
  window.addEventListener("scroll", revealOnScroll);

  // Run on page load
  revealOnScroll();
});



