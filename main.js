document.getElementById('year').textContent = new Date().getFullYear();

const form = document.getElementById('signup');
const status = form.querySelector('.form-status');
const endpoint = form.dataset.endpoint;
const msg = (key) => form.dataset['msg' + key[0].toUpperCase() + key.slice(1)];

// Remember a language picked with the switcher, so the English page doesn't redirect.
document.querySelectorAll('[data-lang]').forEach((a) =>
  a.addEventListener('click', () => { try { localStorage.setItem('mn-lang', a.dataset.lang); } catch {} }));

if (!endpoint) {
  form.querySelector('button[type="submit"]').disabled = true;
  status.textContent = msg('soon');
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!endpoint) return;
  const data = new FormData(form);
  if (!data.getAll('capabilities').length) {
    status.textContent = msg('tick');
    return;
  }
  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  status.textContent = msg('sending');
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
    status.textContent = msg('thanks');
  } catch {
    status.textContent = msg('error');
  } finally {
    button.disabled = false;
  }
});
