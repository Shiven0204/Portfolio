const root = document.documentElement;
const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const navPanel = document.getElementById('nav-panel');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.querySelector('.theme-toggle');
const progressBar = document.querySelector('.progress-bar');
const backToTop = document.querySelector('.back-to-top');
const modal = document.getElementById('project-modal');
const modalContent = document.getElementById('modal-content');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const revealItems = document.querySelectorAll('.reveal');

function createStarBackground() {
  let starLayer = document.querySelector('.star-layer');

  if (!starLayer) {
    starLayer = document.createElement('div');
    starLayer.className = 'star-layer';
    starLayer.setAttribute('aria-hidden', 'true');
    document.body.insertBefore(starLayer, document.body.firstChild);
  }

  const theme = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  const starCount = window.innerWidth < 640 ? 28 : window.innerWidth < 900 ? 42 : 72;
  const minOpacity = theme === 'light' ? 0.08 : 0.35;
  const maxOpacity = theme === 'light' ? 0.35 : 0.9;

  starLayer.innerHTML = '';

  for (let i = 0; i < starCount; i += 1) {
    const star = document.createElement('span');
    star.className = 'star';
    const size = (Math.random() * 2 + 1).toFixed(2);
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.opacity = (Math.random() * (maxOpacity - minOpacity) + minOpacity).toFixed(2);
    star.style.animationDelay = `${(Math.random() * 8).toFixed(2)}s`;
    starLayer.appendChild(star);
  }
}

const projectData = {
  tms: {
    title: 'TMS — Task Management System',
    category: 'Web',
    overview:
      'A web-based Task Management System built using .NET, designed to help users efficiently manage tasks with features like task creation, status tracking, and user management.',
    problem:
      'The goal was to provide a clear and structured way to organize tasks while simplifying user workflows and keeping operations easy to manage.',
    features: [
      'Task creation and assignment',
      'Status tracking and progress visibility',
      'User management and role-based access',
      'Structured dashboard for managing work efficiently'
    ],
    stack: ['.NET', 'C#', 'SQL', 'Web Application'],
    contribution:
      'I focused on building a clean, functional workflow-oriented interface and managing backend logic to support real task operations.',
    github: 'https://github.com/Shiven0204/TMS-TaskManagementSystem/tree/main/TaskManagementSystem'
  },
  ems: {
    title: 'EMS — Enquiry Management System',
    category: 'Backend',
    overview:
      'A comprehensive web-based Enquiry Management System built with ASP.NET Core 8.0 and Entity Framework. It streamlines student enquiry tracking and follow-up processes for educational institutions.',
    problem:
      'Educational institutions often need a dependable system to track and follow up on student enquiries without losing structure or missing leads.',
    features: [
      'Student enquiry tracking',
      'Follow-up workflow management',
      'Structured enquiry records and status visibility',
      'Entity Framework-backed data handling'
    ],
    stack: ['ASP.NET Core 8.0', 'Entity Framework', 'C#', 'SQL'],
    contribution:
      'I handled the core logic and data flow needed to keep enquiries organized, traceable, and easy to manage across the system.',
    github: 'https://github.com/Shiven0204/EMS-EnquiryManagementSystem'
  },
  scheduler: {
    title: 'TimeTable Scheduler',
    category: 'Mobile',
    overview:
      'Developed a cross-platform Timetable Scheduler System using Flutter and Firebase, implementing a Greedy Algorithm with heuristic conflict handling for automated, conflict-free timetable generation and secure role-based access.',
    problem:
      'Scheduling without conflicts is complex, especially when many constraints and roles are involved. The system needed to generate workable timetables quickly and reliably.',
    features: [
      'Conflict-free timetable generation',
      'Heuristic-based scheduling logic',
      'Role-based access control',
      'Firebase-backed data management for a mobile platform'
    ],
    stack: ['Flutter', 'Firebase', 'Dart', 'Algorithm Design'],
    contribution:
      'I worked on the app architecture and scheduling logic to create a practical, efficient timetable generation flow that handled constraints intelligently.',
    github: 'https://github.com/Shiven0204/Timetable_Scheduler'
  }
};

function setTheme(theme) {
  const selectedTheme = theme === 'light' ? 'light' : 'dark';
  root.setAttribute('data-theme', selectedTheme);
  localStorage.setItem('portfolio-theme', selectedTheme);
  createStarBackground();
}

function initTheme() {
  const savedTheme = localStorage.getItem('portfolio-theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const initialTheme = savedTheme || (prefersLight ? 'light' : 'dark');
  setTheme(initialTheme);
}

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  progressBar.style.width = `${progress}%`;

  if (window.scrollY > 30) {
    header.classList.add('scrolled');
    backToTop.style.opacity = '1';
    backToTop.style.visibility = 'visible';
  } else {
    header.classList.remove('scrolled');
    backToTop.style.opacity = '0';
    backToTop.style.visibility = 'hidden';
  }
}

function attachRevealObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function updateActiveNav() {
  const sections = document.querySelectorAll('main section[id]');
  let currentSection = 'home';

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 130 && rect.bottom >= 130) {
      currentSection = section.id;
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${currentSection}`;
    link.classList.toggle('active', isActive);
  });
}

function handleNavToggle() {
  const isOpen = navPanel.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
}

function closeMobileNav() {
  navPanel.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
}

function initFilterButtons() {
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selectedFilter = button.dataset.filter;

      filterButtons.forEach((item) => item.classList.toggle('active', item === button));

      projectCards.forEach((card) => {
        const category = card.dataset.category;
        const shouldShow = selectedFilter === 'all' || category === selectedFilter;
        card.classList.toggle('hidden', !shouldShow);
      });
    });
  });
}

function openModal(projectId) {
  const project = projectData[projectId];
  if (!project) return;

  modalContent.innerHTML = `
    <div class="modal-hero">
      <div>
        <p class="eyebrow">${project.category}</p>
        <h3 id="modal-title">${project.title}</h3>
      </div>
      <span class="meta-tag">${project.category}</span>
    </div>
    <div class="modal-body">
      <div class="modal-section">
        <h4>Overview</h4>
        <p>${project.overview}</p>
      </div>
      <div class="modal-section">
        <h4>Problem solved</h4>
        <p>${project.problem}</p>
      </div>
      <div class="modal-section">
        <h4>Key features</h4>
        <ul>
          ${project.features.map((feature) => `<li>${feature}</li>`).join('')}
        </ul>
      </div>
      <div class="modal-section">
        <h4>Technology stack</h4>
        <div class="tech-stack">
          ${project.stack.map((item) => `<span>${item}</span>`).join('')}
        </div>
      </div>
      <div class="modal-section">
        <h4>My contribution</h4>
        <p>${project.contribution}</p>
      </div>
      <div class="modal-links">
        <a class="button primary" href="${project.github}" target="_blank" rel="noreferrer">View on GitHub</a>
      </div>
    </div>
  `;

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function initProjectDetails() {
  document.querySelectorAll('.detail-trigger').forEach((button) => {
    button.addEventListener('click', () => openModal(button.dataset.project));
  });

  modal.addEventListener('click', (event) => {
    if (event.target.matches('[data-close-modal]')) {
      closeModal();
    }
  });

  document.querySelector('.modal-close').addEventListener('click', closeModal);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
}

function initCopyEmail() {
  const copyButton = document.querySelector('.copy-email');
  if (!copyButton) return;

  copyButton.addEventListener('click', async () => {
    const email = copyButton.dataset.copy;

    try {
      await navigator.clipboard.writeText(email);
      const originalText = copyButton.textContent;
      copyButton.textContent = 'Email copied!';
      copyButton.disabled = true;

      setTimeout(() => {
        copyButton.textContent = originalText;
        copyButton.disabled = false;
      }, 1500);
    } catch (error) {
      copyButton.textContent = 'Copy failed';
      setTimeout(() => {
        copyButton.textContent = 'Copy Email';
      }, 1500);
    }
  });
}

function smoothScrollTo(targetId) {
  const section = document.querySelector(targetId);
  if (!section) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    const offset = header ? header.offsetHeight + 18 : 18;
    const top = Math.max(0, section.offsetTop - offset);
    window.scrollTo({ top, behavior: 'auto' });
    return;
  }

  const startY = window.scrollY;
  const offset = header ? header.offsetHeight + 18 : 18;
  const targetY = Math.max(0, section.offsetTop - offset);
  const distance = targetY - startY;
  const duration = 500;
  const startTime = performance.now();

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animateScroll(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutCubic(progress);
    window.scrollTo({ top: startY + distance * eased, behavior: 'auto' });

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  }

  requestAnimationFrame(animateScroll);
}

function handleAnchorLinks() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const target = anchor.getAttribute('href');
      if (!target || target === '#') return;

      const section = document.querySelector(target);
      if (!section) return;

      event.preventDefault();
      smoothScrollTo(target);
      closeMobileNav();
    });
  });
}

function initBackToTop() {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function init() {
  initTheme();
  createStarBackground();
  attachRevealObserver();
  initFilterButtons();
  initProjectDetails();
  initCopyEmail();
  handleAnchorLinks();
  initBackToTop();

  updateScrollProgress();
  updateActiveNav();

  window.addEventListener('scroll', () => {
    updateScrollProgress();
    updateActiveNav();
  });

  window.addEventListener('resize', createStarBackground);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const nextTheme = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      setTheme(nextTheme);
    });
  }

  if (navToggle) {
    navToggle.addEventListener('click', handleNavToggle);
  }

  navLinks.forEach((link) => link.addEventListener('click', closeMobileNav));
}

window.addEventListener('load', () => {
  init();
});
