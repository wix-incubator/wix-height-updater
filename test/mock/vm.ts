import {Engine} from 'velocity';
import requireReload from 'require-reload';
import velocityData from './velocity.data';

function loadJson(filename) {
  try {
    const reload = requireReload(require);
    return reload(filename);
  } catch (e) {}
}

export function renderVM(template, data) {
  const engine = new Engine({template});
  const velocityDataPrivate = loadJson('../../velocity.private.data.js');
  return engine.render(Object.assign({}, velocityData, velocityDataPrivate, data));
}
