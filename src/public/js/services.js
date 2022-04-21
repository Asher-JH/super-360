const serviceBtns = document.getElementsByClassName('service-btn');
const containers = document.getElementsByClassName('iframe-container');
const infoContainers = document.getElementsByClassName('info-box');

for (let i = 0; i < 3; i += 1) {
  serviceBtns[i].addEventListener('click', () => {
    const container = containers[i];
    const infoContainer = infoContainers[i];

    container.style.width = '80%';
    infoContainer.style.display = 'none';

    const img = container.querySelector('img');
    const iframe = container.querySelector('iframe');
    img.style.display = 'none';
    iframe.style.display = 'block';
  });
}
