const btns = document.querySelectorAll('.copy-link-btn');

btns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const id = `#input-${e.target.id}`;

    const url = document.querySelector(id);

    url.select();
    url.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(url.value);
  });
});
