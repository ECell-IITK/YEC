window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let header = document.querySelector("header");

    if (!header) return;

    // Add scrolled class when user scrolls down for shadow/border enhancement
    if (scrollTop > 20) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// Dynamic Desktop Timeline Curve Calibration
// Perfectly aligns the serpentine wavy line through the center of every milestone node badge
function updateTimelineCurve() {
    if (window.innerWidth <= 991) return; // Vertical roadmap is used for mobile/tablet

    const container = document.querySelector('.serpentine-track-container');
    const svg = document.querySelector('.serpentine-svg-path');
    const path = svg ? svg.querySelector('path') : null;
    const badges = document.querySelectorAll('.serpentine-nodes-grid .serp-node .node-circle-badge');

    if (!container || !svg || !path || badges.length === 0) return;

    const containerRect = container.getBoundingClientRect();
    const scrollLeft = container.scrollLeft || 0;
    const scrollTop = container.scrollTop || 0;

    const totalWidth = Math.max(container.scrollWidth, containerRect.width);
    const totalHeight = Math.max(container.scrollHeight, containerRect.height);

    svg.style.width = totalWidth + 'px';
    svg.style.height = totalHeight + 'px';
    svg.setAttribute('viewBox', `0 0 ${totalWidth} ${totalHeight}`);

    const points = [];
    badges.forEach(badge => {
        const badgeRect = badge.getBoundingClientRect();
        const cx = (badgeRect.left - containerRect.left) + scrollLeft + badgeRect.width / 2;
        const cy = (badgeRect.top - containerRect.top) + scrollTop + badgeRect.height / 2;
        points.push({ x: cx, y: cy });
    });

    if (points.length < 2) return;

    let d = '';

    // Smooth entry before Node 1
    const p0 = points[0];
    const startX = Math.max(10, p0.x - 45);
    d += `M ${startX} ${p0.y} `;
    d += `C ${startX + 18} ${p0.y}, ${p0.x - 18} ${p0.y}, ${p0.x} ${p0.y} `;

    // Connect each sequential milestone badge exactly through its center with smooth horizontal tangents
    for (let i = 0; i < points.length - 1; i++) {
        const curr = points[i];
        const next = points[i + 1];
        const dx = next.x - curr.x;
        const cp1x = curr.x + dx * 0.5;
        const cp1y = curr.y;
        const cp2x = next.x - dx * 0.5;
        const cp2y = next.y;
        d += `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y} `;
    }

    // Smooth exit after the Grand Finale node
    const pLast = points[points.length - 1];
    const endX = Math.min(totalWidth - 10, pLast.x + 45);
    d += `C ${pLast.x + 18} ${pLast.y}, ${endX - 18} ${pLast.y}, ${endX} ${pLast.y}`;

    path.setAttribute('d', d);
}

// Lifecycle listeners for instant and responsive curve updating
window.addEventListener('resize', updateTimelineCurve);
window.addEventListener('load', updateTimelineCurve);
document.addEventListener('DOMContentLoaded', updateTimelineCurve);

if (document.fonts) {
    document.fonts.ready.then(updateTimelineCurve);
}

// Immediate and delayed triggers to handle rendering/asset layouts
updateTimelineCurve();
setTimeout(updateTimelineCurve, 50);
setTimeout(updateTimelineCurve, 200);
setTimeout(updateTimelineCurve, 600);