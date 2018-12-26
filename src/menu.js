export default (menu) => {
  // menu label is different on mac
  const menuLabel = 'EDIT';

  Object.keys(menu).forEach((key) => {
    const menuCategory = menu[key];
    let { label } = menuCategory;
    if (label !== undefined) {
      label = label.toUpperCase();
    }
    if (label === menuLabel) {
      menuCategory.submenu = menuCategory.submenu.concat({
        type: 'separator',
      },
      {
        type: 'submenu',
        label: 'Find',
        submenu: [
          {
            label: 'Find...',
            accelerator: 'CmdOrCtrl+F',
            click(item, focusedWindow) {
              if (focusedWindow) {
                focusedWindow.rpc.emit('hyperfind:find', { focusedWindow });
              }
            },
          },
          {
            label: 'Find Next',
            accelerator: 'CmdOrCtrl+G',
            click(item, focusedWindow) {
              if (focusedWindow) {
                focusedWindow.rpc.emit('hyperfind:findnext', { focusedWindow });
              }
            },
          },
          {
            label: 'Find Previous',
            accelerator: 'CmdOrCtrl+Shift+G',
            click(item, focusedWindow) {
              if (focusedWindow) {
                focusedWindow.rpc.emit('hyperfind:findprev', { focusedWindow });
              }
            },
          },
        ],
      });
    }
  });
  return menu;
};
