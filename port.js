import animation from './animation.js';
onclick = function (e) {
    const target = e.target;
    if (target.classList.contains('port')) {
        const port = target.dataset.port;
        const portName = target.dataset.portName;
        const portType = target.dataset.portType;
        const portId = target.dataset.portId;
        animation(port, portName, portType, portId);
    }
}