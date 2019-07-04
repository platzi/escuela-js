const render = (html, preloadedState) => {
  return (`
    <!doctype html>
      <html>
        <head>
          <title>Platzi Video</title>
          <link rel="stylesheet" href="assets/app.css" type="text/css"/>
        </head>
        <body>
          <div id="app">${html}</div>
          <script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}</script>
          <script src="assets/app.js" type="text/javascript"></script>
          <script src="assets/vendor.js" type="text/javascript"></script>
        </body>
    </html>
  `);
};

export default render;
