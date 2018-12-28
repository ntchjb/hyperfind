export default (keymaps) => {
  const isMac = process.platform === 'darwin';
  const cmdOrCtrl = isMac ? 'command' : 'ctrl';
  const newKeymaps = {
    'hyperfind:selectAll': `${cmdOrCtrl}+a`,
  };
  return Object.assign({}, keymaps, newKeymaps);
};
