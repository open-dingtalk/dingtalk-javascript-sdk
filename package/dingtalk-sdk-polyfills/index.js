/* @flow */

import env from './core/env.js';
import initRequire from './core/requireModule.js';

export default {
  env: env,
  requireModule: initRequire()
};
