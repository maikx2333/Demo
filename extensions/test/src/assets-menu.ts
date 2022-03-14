exports.onSystemFolder = function (assetInfo:any) {
    return [
      {
        label: 'i18n:test.menu.onSystemFolder',
        click() {
          if (!assetInfo) {
            console.log('get create command from header menu.');
          } else {
            console.log('get create command from an asset.');
            console.log(assetInfo);
          }
        },
      },
    ];
  };
  
  exports.onAssetMenu = function (assetInfo:any) {
    return [
      {
        label: 'i18n:test.menu.assetCommandParent',
        submenu: [
          {
            label: 'i18n:test.menu.assetCommand1',
            enabled: assetInfo.isDirectory,
            click() {
              console.log(Editor.I18n.t('test.menu.assetCommand1'));
              console.log(assetInfo);
            },
          },
          {
            label: 'i18n:test.menu.assetCommand2',
            enabled: !assetInfo.isDirectory,
            click() {
              console.log(Editor.I18n.t('test.menu.assetCommand2'));
              console.log(assetInfo);
            },
          },
        ],
      },
    ];
  };
  
  exports.onDBMenu = function (assetInfo:any) {
    return [
      {
        label: 'i18n:test.menu.dbCommand1',
        click() {
          console.log(`db command 1 from ${assetInfo.name}`);
        },
      },
      {
        label: 'i18n:test.menu.dbCommand2',
        click() {
          console.log(`db command 2 from ${assetInfo.name}`);
        },
      },
    ];
  };
  
  exports.onPanelMenu = function (assetInfo:any) {
    return [
      {
        label: 'i18n:test.menu.plainCommand1',
        click() {
          console.log(
            `clicked on the plain area of the panel. No asset, 'assetInfo' is ${assetInfo}`
          );
        },
      },
    ];
  };
  