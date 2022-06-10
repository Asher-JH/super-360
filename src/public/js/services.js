const serviceBtns = document.getElementsByClassName('service-btn');
const containers = document.getElementsByClassName('iframe-container');
const infoContainers = document.getElementsByClassName('info-box');
const closeBtnContainers = document.getElementsByClassName(
  'close-demo-btn-container'
);

for (let i = 0; i < 3; i += 1) {
  serviceBtns[i].addEventListener('click', () => {
    const container = containers[i];
    const infoContainer = infoContainers[i];
    const closeBtnContainer = closeBtnContainers[i];

    container.style.width = '100%';
    infoContainer.style.display = 'none';
    closeBtnContainer.style.display = 'flex';

    const img = container.querySelector('img');
    const iframe = container.querySelector('iframe');
    img.style.display = 'none';
    iframe.style.display = 'block';

    closeBtnContainer.addEventListener('click', () => {
      iframe.style.display = 'none';
      img.style.display = 'block';
      infoContainer.style.display = 'block';
      closeBtnContainer.style.display = 'none';
    });
  });
}
