const makeStarSvg = (color) => `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="m21.137 11.519-2.726-.779a7.453 7.453 0 0 1-5.151-5.151l-.779-2.726a.52.52 0 0 0-.962 0l-.779 2.726a7.453 7.453 0 0 1-5.151 5.151l-2.726.779a.5.5 0 0 0 0 .962l2.726.779a7.453 7.453 0 0 1 5.151 5.151l.779 2.726a.5.5 0 0 0 .962 0l.779-2.726a7.453 7.453 0 0 1 5.151-5.151l2.726-.779a.5.5 0 0 0 0-.962z" fill="${color ?? '#FFFFFF'}" opacity="1" data-original="#000000" class=""></path></g></svg>`;

const colors = ['#AC75FF', '#FF67D5', '#FF9F74', '#F9F871'];
const animations = ['fall-1', 'fall-2', 'fall-3', 'fall-2'];

const useCreateStar = (rootSelector) => {
    const rootElement = document.querySelector(rootSelector);

    let prevX = 0;
    let prevY = 0;

    return (e) => {
        const currX = e.offsetX;
        const currY = e.offsetY;

        const deltaX = currX - prevX;
        const deltaY = currY - prevY;
        const distanceMoved = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        const spawnDistanceThreshold = 70;

        if (distanceMoved >= spawnDistanceThreshold) {
            const randomNum = Math.floor(Math.random() * 4);
            const randomColor = colors[randomNum];
            const randomAnimation = animations[randomNum];

            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.innerHTML = makeStarSvg(randomColor);

            particle.style.animation = `${randomAnimation} 1.5s ease 0s`;
            particle.style.animationFillMode = 'forwards';
            particle.style.top = e.offsetY + 'px';
            particle.style.left = e.offsetX + 'px';

            rootElement.appendChild(particle);

            setTimeout(() => {
                rootElement.removeChild(particle);
            }, 1500);

            prevX = currX;
            prevY = currY;
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('.root');
    const createStar = useCreateStar('.root');

    root.addEventListener('mousemove', (e) => {
        createStar(e);
    });
});