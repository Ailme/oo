"use strict";

import Polyglot from 'polyglot';

const lang = document.documentElement.lang;
const phrases = require('./' + lang);
const polyglot = new Polyglot({phrases: phrases});

export default polyglot;
