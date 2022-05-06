const btns = document.querySelectorAll('.copy-link-btn');
const jumbo = document.getElementById('jumbo');
const jumboContainer = document.getElementById('jumbo-container');
const mainTour = document.getElementById('main-tour');
const header = document.getElementsByTagName('header');

btns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const id = `#input-${e.target.id}`;

    const url = document.querySelector(id);

    url.select();
    url.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(url.value);
  });
});

jumbo.addEventListener('wheel', (e) => {
  if (e.deltaY > 0) {
    e.preventDefault();
    e.stopPropagation();
    jumboContainer.style.opacity = 0;
    header[0].style.opacity = 0;

    setTimeout(() => {
      jumboContainer.style.display = 'none';
      header[0].style.display = 'none';
      mainTour.style.opacity = 1;
    }, 300);
  }
});

document.addEventListener('scroll', () => {
  if (
    (window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop) === 0
  ) {
    jumboContainer.style.opacity = 1;
    header[0].style.opacity = 1;

    setTimeout(() => {
      jumboContainer.style.display = 'block';
      header[0].style.display = 'block';
      mainTour.style.opacity = 0;
    }, 300);
  }
});
