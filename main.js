document.getElementById('year').textContent = new Date().getFullYear();

const form = document.getElementById('signup');
const status = form.querySelector('.form-status');
const endpoint = form.dataset.endpoint;

if (!endpoint) {
  form.querySelector('button[type="submit"]').disabled = true;
  status.textContent = 'The waiting list opens soon.';
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!endpoint) return;
  const data = new FormData(form);
  if (!data.getAll('capabilities').length) {
    status.textContent = 'Please tick at least one thing you can make.';
    return;
  }
  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  status.textContent = 'Sending…';
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    form.reset();
    // Count completed sign-ups (the button-click count includes attempts that didn't go through).
    window.goatcounter?.count?.({ path: 'signup-completed', title: 'Waiting list sign-up completed', event: true });
    status.textContent = "Thanks! You're on the list. We'll be in touch when membership opens.";
  } catch {
    status.textContent = 'Sorry, something went wrong. Please try again.';
  } finally {
    button.disabled = false;
  }
});
