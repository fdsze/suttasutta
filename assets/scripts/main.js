/* ========================================================================
 * entry point for webpack to build css
 * ======================================================================== */

import css from '../styles/main.scss';

/* ========================================================================
 * include JS
 * ======================================================================== */

import index from './pages/index.js'; this.index = index;
import sutta from './pages/sutta.js'; this.sutta = sutta;

var page = $('main').data('event');
if (page) {
  this[page]();	
}