module.exports = (src, id = null) => {
  if (!id) {
    id=src;
  }

  if (Object(window.wpify_script_loader) !== window.wpify_script_loader) {
    window.wpify_script_loader = {};
  }

  if (!(window.wpify_script_loader[id] instanceof Promise)) {
    window.wpify_script_loader[id] = new Promise(function (resolve, reject) {
      var fjs = document.getElementsByTagName('script')[0];

      if (document.getElementById(id)) {
        resolve();
      }

      var js = document.createElement('script');
      js.id = id;
      js.src = src;
      js.addEventListener('load', resolve);
      js.addEventListener('error', e => reject(e.error));
      js.src = src;
      fjs.parentNode.insertBefore(js, fjs);
    });
  }

  return window.wpify_script_loader[id];
};

