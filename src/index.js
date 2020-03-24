const jQuery = require('./resources/jquery.js');
window.jQuery = jQuery;
window.$ = jQuery
require('./resources/hm.js');
require('./resources/push.js');
require('./resources/hammer.js');
require('./resources/tongji.js');
require('./resources/11.0.1.js');
require('./resources/ab77b6ea7f3fbf79.js');
require('./resources/bootstrap.js');
require('./resources/js_v1.js');
require('./resources/jquery.marquee.js');
require('./resources/app.js');

const appcss = require('./resources/app.css');
// const allcss = require('./resources/all.css');
const indexcss = require('./resources/index.css');
const v1css = require('./resources/style_v1.css');
const v2css = require('./resources/style_v2.css');


var styleTag = document.createElement('style');
styleTag.innerHTML += appcss;
styleTag.innerHTML += indexcss;
styleTag.innerHTML += v1css;
styleTag.innerHTML += v2css;
// styleTag.innerHTML += allcss;

document.body.appendChild(styleTag);