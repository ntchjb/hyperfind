exports.decorateMenu = (menu) => {
  // menu label is different on mac
  const menuLabel = 'Edit';

  return menu.map((menuCategory) => {
    if (menuCategory.label !== menuLabel) {
      return menuCategory;
    }
    return [
      ...menuCategory,
      {
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
              // on macOS, menu item can clicked without or minized window
              if (focusedWindow) {
                focusedWindow.rpc.emit('hyperfind:find');
              }
            },
          },
          {
            label: 'Find Next',
            accelerator: 'CmdOrCtrl+G',
            click(item, focusedWindow) {
              // on macOS, menu item can clicked without or minized window
              if (focusedWindow) {
                focusedWindow.rpc.emit('hyperfind:findnext');
              }
            },
          },
          {
            label: 'Find Previous',
            accelerator: 'CmdOrCtrl+Shift+G',
            click(item, focusedWindow) {
              // on macOS, menu item can clicked without or minized window
              if (focusedWindow) {
                focusedWindow.rpc.emit('hyperfind:findprev');
              }
            },
          },
        ],
      },
    ];
  });
};
