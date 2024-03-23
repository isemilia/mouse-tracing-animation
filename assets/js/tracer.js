const makeStarSvg = ({ color = '#FFFFFF', size = 26 }) => `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="${size}" height="${size}" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="m21.137 11.519-2.726-.779a7.453 7.453 0 0 1-5.151-5.151l-.779-2.726a.52.52 0 0 0-.962 0l-.779 2.726a7.453 7.453 0 0 1-5.151 5.151l-2.726.779a.5.5 0 0 0 0 .962l2.726.779a7.453 7.453 0 0 1 5.151 5.151l.779 2.726a.5.5 0 0 0 .962 0l.779-2.726a7.453 7.453 0 0 1 5.151-5.151l2.726-.779a.5.5 0 0 0 0-.962z" fill="${color}" opacity="1" data-original="#000000" class=""></path></g></svg>`;

const colors = ['#AC75FF', '#FF67D5', '#FF9F74', '#F9F871'];
const fallAnimations = ['fall-1', 'fall-2', 'fall-3', 'fall-2'];
const shineAnimations = ['shine-1', 'shine-2'];

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
            const randomNum = Math.floor(Math.random() * colors.length);
            const randomColor = colors[randomNum];
            const randomAnimation = fallAnimations[randomNum];

            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.innerHTML = makeStarSvg({ color: randomColor });

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

const useCreateGlow = (rootSelector) => {
    const rootElement = document.querySelector(rootSelector);

    return (e) => {
        const glow = document.createElement('div');
        glow.className = 'glow';
        glow.style.top = e.offsetY + 'px';
        glow.style.left = e.offsetX + 'px';
        rootElement.appendChild(glow);

        setTimeout(() => {
            rootElement.removeChild(glow);
        }, 100);
    }
}

const useCreateDots = (rootSelector) => {
    const root = document.querySelector(rootSelector);

    return () => {
        const dotCount = Math.floor(Math.random() * (60 - 30 + 1)) + 30;

        for (let i = 0; i < dotCount; i++) {
            const dot = document.createElement('div');

            const width = Math.floor(root.offsetWidth);
            const height = Math.floor(root.offsetHeight);

            const randomX = Math.floor(Math.random() * width);
            const randomY = Math.floor(Math.random() * height);
            const randomSize = Math.floor((Math.random() * 3)) + 1;

            dot.className = 'dot';
            dot.innerHTML = '<span></span>'

            dot.style.width = randomSize + 'px';
            dot.style.height = randomSize + 'px';

            dot.style.left = randomX + 'px';
            dot.style.top = randomY + 'px';

            const randomDelay = Math.floor(Math.random() * 10);
            const randomAnimation = shineAnimations[Math.floor(Math.random() * 2)]
            dot.style.animation = `${randomAnimation} 1.5s ease ${randomDelay}s infinite alternate`;

            root.appendChild(dot);
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('.root');

    const createStar = useCreateStar('.root');
    const createGlow = useCreateGlow('.root');
    const createDots = useCreateDots('.root');

    createDots();

    root.addEventListener('mousemove', (e) => {
        createStar(e);
        createGlow(e);
    });
});