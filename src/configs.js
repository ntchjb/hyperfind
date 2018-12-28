export default config => Object.assign(
  {},
  config,
  {
    css: `
      ${config.css || ''}
      .hyperfind-wrapper {
        background: inherit;
        z-index: 10;
        border-radius: 10px;
        height: 40px;
        width: 220px;
        position: absolute;
        right: 14px;
        top: 0px;
      }
      .hyperfind-box {
        display: table-cell;
        vertical-align: middle;
        background: rgba(0,0,0,0.5);
        border: 1px solid rgba(255,255,255,0.5);
        border-radius: 10px;
        height: 40px;
        width: 220px;
        padding: 5px 10px;
      }
      #hyperfind-input {
        background: none;
        border: none;
        color: rgba(255,255,255,0.75);
        outline: none;
        width: 155px;
        height: 15px;
      }
      .hyperfind-btn {
        background: rgba(0,0,0,0);
        border: none;
        border-radius: 10px;
        color: rgba(255,255,255,0.75);
        height: 100%;        
        outline: none;
        position: relative;
        width: 20px;
      }
      .hyperfind-btn:hover {
        background: rgba(0,0,0,0.5);
      }
      .hyperfind-btn:active {
        background: rgba(255,255,255,0.5);
        color: rgba(0,0,0,0.5);
      }

      .invert {
        mix-blend-mode: difference;
      }
    `,
  },
);
