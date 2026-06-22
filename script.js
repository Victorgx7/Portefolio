// ===== Ano dinâmico no footer =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Menu mobile =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===== Efeito de digitação no terminal =====
const phrases = [
  "npm run carreira -- iniciar",
  "console.log('pronto para novos desafios')",
  "git commit -m 'sempre aprendendo'"
];

const typedEl = document.getElementById('typedText');
let phraseIndex = 0, charIndex = 0, deleting = false;

function typeLoop(){
  const current = phrases[phraseIndex];
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if(prefersReduced){
    typedEl.textContent = current;
    return;
  }

  if(!deleting){
    charIndex++;
    typedEl.textContent = current.slice(0, charIndex);
    if(charIndex === current.length){
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    charIndex--;
    typedEl.textContent = current.slice(0, charIndex);
    if(charIndex === 0){
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  setTimeout(typeLoop, deleting ? 35 : 65);
}
typeLoop();

// ===== Reveal on scroll =====
const revealTargets = document.querySelectorAll('.section, .project-card, .skill-card, .stat-card, .contact-card');
revealTargets.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(18px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => observer.observe(el));

// ===== Navbar com sombra ao rolar =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 10 ? '0 8px 24px -12px rgba(0,0,0,0.6)' : 'none';
});
