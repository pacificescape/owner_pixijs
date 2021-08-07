import Stats from 'stats.js';


var stats = new Stats();

stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.append(stats.dom);
window.stats = stats;
