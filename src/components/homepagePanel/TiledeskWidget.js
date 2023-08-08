import React, { useEffect } from 'react';

const TiledeskWidget = () => {
  useEffect(() => {
    window.tiledeskSettings = {
      projectid: "64a388b12fb10000130a3fe6"
    };

    const initTiledesk = () => {
      var w = window;
      var d = document;
      var i = function () {
        i.c(arguments);
      };
      i.q = [];
      i.c = function (args) {
        i.q.push(args);
      };
      w.Tiledesk = i;
      var js, fjs = d.getElementsByTagName('script')[0];
      if (d.getElementById('tiledesk-jssdk')) return;
      js = d.createElement('script');
      js.id = 'tiledesk-jssdk';
      js.async = true;
      js.src = 'https://widget.tiledesk.com/v6/launch.js';
      fjs.parentNode.insertBefore(js, fjs);
    };

    initTiledesk();
  }, []);

  return <div id="tiledesk-widget-container"></div>;
};

export default TiledeskWidget;
