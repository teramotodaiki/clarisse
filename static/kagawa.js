!(function() {
  var loaded = localStorage.getItem('clarisse-never-shown') !== null;
  window.addEventListener('load', show, { passive: true });
  window.setTimeout(show, 1000);
  function show() {
    if (loaded) return;
    loaded = true;

    var app = document.createElement('div');
    app.className = 'clarisse-root';
    app.style.backgroundColor = 'rgb(36, 208, 41)';
    app.style.background =
      'linear-gradient(rgb(36, 208, 41), rgb(53, 235, 193))';
    app.style.boxShadow =
      '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)';
    app.style.padding = '16px 24px 16px 16px';
    app.style.position = 'fixed';
    app.style.top = '0px';
    app.style.left = '0px';
    app.style.borderRadius = '2px';
    app.style.transition = 'opacity 250ms';
    app.style.opacity = '0';
    setTimeout(() => {
      app.style.opacity = '1';
    }, 0);

    var header = document.createElement('div');
    header.textContent = 'これはゲームではありません';
    header.style.fontSize = '1.75em';
    header.style.fontWeight = 'bold';
    app.appendChild(header);

    var text = document.createElement('p');
    text.textContent = 'ゲームを制限する条例の対象外です。';
    app.appendChild(text);

    var actions = document.createElement('div');
    actions.style.textAlign = 'right';
    actions.style.textDecoration = 'underline';
    app.appendChild(actions);

    var kill = document.createElement('span');
    kill.textContent = 'これ以上表示しない';
    kill.style.fontSize = '0.75em';
    kill.style.cursor = 'pointer';
    kill.style.marginRight = '2em';
    kill.onclick = function() {
      localStorage.setItem('clarisse-never-shown', new Date().toLocaleString());
      app.parentElement && app.parentElement.removeChild(app);
    };
    actions.appendChild(kill);

    var close = document.createElement('span');
    close.textContent = 'とじる';
    close.style.cursor = 'pointer';
    close.onclick = function() {
      app.parentElement && app.parentElement.removeChild(app);
    };
    actions.appendChild(close);

    document.body.appendChild(app);
  }
})();
