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
            accelerator: 'CommandOrControl+F',
            click(item, focusedWindow) {
              if (focusedWindow) {
                focusedWindow.rpc.emit('hyperfind:find');
              }
            },
          },
          {
            label: 'Find Next',
            accelerator: 'CommandOrControl+G',
            click(item, focusedWindow) {
              if (focusedWindow) {
                focusedWindow.rpc.emit('hyperfind:findnext');
              }
            },
          },
          {
            label: 'Find Previous',
            accelerator: 'CommandOrControl+Shift+G',
            click(item, focusedWindow) {
              if (focusedWindow) {
                focusedWindow.rpc.emit('hyperfind:findprev');
              }
            },
          },
        ],
      });
    }
  });
  return menu;
};
