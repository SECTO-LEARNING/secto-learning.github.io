const lessonButtons = document.querySelectorAll('[data-complete]');
const completedCount = document.querySelector('#completedCount');
const progressFill = document.querySelector('#progressFill');
const progressMessage = document.querySelector('#progressMessage');
const storageKey = 'secto-completed-lessons';
const totalLessons = lessonButtons.length;

function readProgress() {
  try {
    return new Set(JSON.parse(localStorage.getItem(storageKey) || '[]'));
  } catch {
    return new Set();
  }
}

function saveProgress(completed) {
  localStorage.setItem(storageKey, JSON.stringify([...completed]));
}

function renderProgress() {
  const completed = readProgress();
  lessonButtons.forEach((button) => {
    const isComplete = completed.has(button.dataset.complete);
    button.classList.toggle('is-complete', isComplete);
    button.textContent = isComplete ? '✓ Lesson complete' : 'Mark lesson complete';
  });

  const count = completed.size;
  completedCount.textContent = String(count);
  progressFill.style.width = `${(count / totalLessons) * 100}%`;
  progressMessage.textContent = count === totalLessons
    ? 'Starter Academy complete — excellent foundation.'
    : count === 0
      ? 'Start with Computer Foundations.'
      : `${totalLessons - count} lesson${totalLessons - count === 1 ? '' : 's'} remaining.`;
}

lessonButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const completed = readProgress();
    const id = button.dataset.complete;
    completed.has(id) ? completed.delete(id) : completed.add(id);
    saveProgress(completed);
    renderProgress();
  });
});

document.querySelectorAll('.knowledge-check').forEach((check) => {
  check.querySelectorAll('[data-choice]').forEach((choice) => {
    choice.addEventListener('click', () => {
      const correct = choice.dataset.choice === check.dataset.answer;
      check.querySelectorAll('[data-choice]').forEach((item) => {
        item.classList.remove('correct-answer', 'wrong-answer');
      });
      choice.classList.add(correct ? 'correct-answer' : 'wrong-answer');
      const result = check.querySelector('.quiz-result');
      result.textContent = correct
        ? 'Correct — you understood the key idea.'
        : 'Not quite. Review the explanation and try again.';
      result.className = `quiz-result ${correct ? 'quiz-success' : 'quiz-retry'}`;
    });
  });
});

renderProgress();
