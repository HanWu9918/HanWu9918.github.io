(() => {
  const root = document.documentElement;
  const langButton = document.getElementById('langToggle');
  const menuButton = document.getElementById('menuToggle');
  const navLinks = document.querySelector('.nav-links');

  function applyLanguage(language) {
    const isChinese = language === 'zh';
    root.dataset.lang = isChinese ? 'zh' : 'en';
    root.lang = isChinese ? 'zh-CN' : 'en';
    if (langButton) {
      langButton.textContent = isChinese ? '中' : 'EN';
      const label = isChinese ? 'Click to switch to English' : '点击切换到中文';
      langButton.title = label;
      langButton.setAttribute('aria-label', label);
    }
    document.title = isChinese
      ? '吴瀚 — AI Agent 与基础模型评测'
      : 'Han Wu (吴瀚) — AI Agents & Foundation Model Evaluation';
    try { localStorage.setItem('hw-academic-lang', root.dataset.lang); } catch (_) {}
    try {
      const url = new URL(location.href);
      if (url.searchParams.has('lang')) {
        url.searchParams.set('lang', root.dataset.lang);
        history.replaceState(null, '', url);
      }
    } catch (_) {}
  }

  let savedLanguage = 'en';
  try { savedLanguage = new URLSearchParams(location.search).get('lang') || localStorage.getItem('hw-academic-lang') || 'en'; } catch (_) {}
  applyLanguage(savedLanguage);
  langButton?.addEventListener('click', () => {
    applyLanguage(root.dataset.lang === 'en' ? 'zh' : 'en');
  });

  function closeMenu() {
    navLinks?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }
  menuButton?.addEventListener('click', (event) => {
    event.stopPropagation();
    const open = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
  navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

  const picker = document.getElementById('stylePicker');
  const trigger = document.getElementById('styleTrigger');
  const panel = document.getElementById('stylePanel');
  function closePicker(restoreFocus = false) {
    panel.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
    if (restoreFocus) trigger.focus();
  }
  trigger.addEventListener('click', () => {
    const opening = panel.hidden;
    panel.hidden = !opening;
    trigger.setAttribute('aria-expanded', String(opening));
  });
  picker.querySelectorAll('.style-option').forEach(link => {
    link.addEventListener('click', () => {
      const target = new URL(link.getAttribute('href'), location.href);
      target.searchParams.set('lang', root.dataset.lang);
      const current = document.querySelector('.nav-links a.active');
      target.hash = (current ? current.hash : '') || location.hash;
      link.href = target.href;
    });
  });
  document.addEventListener('click', event => {
    if (!picker.contains(event.target)) closePicker();
    if (navLinks && !navLinks.contains(event.target) && !menuButton?.contains(event.target)) closeMenu();
  });
  document.addEventListener('focusin', event => {
    if (!picker.contains(event.target)) closePicker();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      if (!panel.hidden) closePicker(true);
      closeMenu();
    }
  });

  const progress = document.querySelector('.scroll-progress');
  let ticking = false;
  function updateScroll() {
    const distance = root.scrollHeight - innerHeight;
    const ratio = distance > 0 ? Math.min(scrollY / distance, 1) : 0;
    if (progress) progress.style.transform = `scaleX(${ratio})`;
    ticking = false;
  }
  addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(updateScroll); ticking = true; }
  }, { passive: true });
  updateScroll();

  const sections = [...document.querySelectorAll('main.content section[id]')];
  const navigation = [...document.querySelectorAll('.nav-links a')];
  if ('IntersectionObserver' in window) {
    const activeObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navigation.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      });
    }, { rootMargin: '-18% 0px -68% 0px', threshold: 0 });
    sections.forEach(section => activeObserver.observe(section));
  }

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = document.querySelectorAll('.pub, .edu-block, .exp, .proj, .skill-block, .resume-box');
  if (!reducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible', 'in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -35px', threshold: 0.03 });
    revealItems.forEach(item => {
      item.classList.add('reveal');
      revealObserver.observe(item);
    });
  }
})();
