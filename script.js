const menuButton = document.querySelector('.menu-button');
const mainNav = document.querySelector('.main-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

mainNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const filters = document.querySelectorAll('.filter');
const courseCards = document.querySelectorAll('.course-card');

filters.forEach((button) => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    filters.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    courseCards.forEach((card) => {
      card.hidden = selected !== 'All' && card.dataset.category !== selected;
    });
  });
});

const languageSelect = document.querySelector('#languageSelect');
const languageMessage = document.querySelector('#languageMessage');

languageSelect?.addEventListener('change', () => {
  if (languageSelect.value === 'English') {
    languageMessage.hidden = true;
    languageMessage.textContent = '';
    return;
  }
  languageMessage.hidden = false;
  languageMessage.innerHTML = `<strong>${languageSelect.value} selected.</strong> Interface translations are represented in this frontend preview; reviewed lesson translations will be released in phases. <button id="resetLanguage">Return to English</button>`;
  document.querySelector('#resetLanguage')?.addEventListener('click', () => {
    languageSelect.value = 'English';
    languageMessage.hidden = true;
    languageMessage.textContent = '';
  });
});

document.querySelector('#runDemo')?.addEventListener('click', (event) => {
  const button = event.currentTarget;
  button.disabled = true;
  button.innerHTML = 'Demo complete <span>▶</span>';
  document.querySelector('#terminalOutput').innerHTML = '<span>OUTPUT</span><p><strong>✓ Length check passed</strong><br><strong>✓ Symbol check passed</strong><br>Nice work—now try a unique passphrase.</p>';
});

document.querySelector('#membershipButton')?.addEventListener('click', () => {
  window.alert('SECTO is currently a frontend beta. Secure membership payments will be added with the backend.');
});

document.querySelectorAll('.course-link, .path-card button').forEach((button) => {
  button.addEventListener('click', () => {
    window.alert('This content will open when the full course pages are added.');
  });
});
