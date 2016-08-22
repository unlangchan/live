/**
 * @author v.lugovksy
 * created on 15.12.2015
 */
(function() {
  'use strict';

  angular.module('Live.theme')
    .run(themeRun);

  /** @ngInject */
  function themeRun() {
    init();
  }

  function init() {
    sina()
    $(document).ready(function() {
      $("#live .chat").mCustomScrollbar();
      $("#live .chat").mCustomScrollbar("scrollTo", "bottom", {
        scrollInertia: 1000
      });
    })
  }

  function sina() {
    uSinaEmotionsHt.put('[pt顶一个]', '/source/face/ct/1.png');
    uSinaEmotionsHt.put('[pt赞一个]', '/source/face/ct/2.png');
    uSinaEmotionsHt.put('[pt掌声]', '/source/face/ct/3.png');
    uSinaEmotionsHt.put('[pt鲜花]', '/source/face/ct/4.png');
    uSinaEmotionsHt.put('[pt看多]', '/source/face/ct/5.png');
    uSinaEmotionsHt.put('[pt看空]', '/source/face/ct/6.png');
    uSinaEmotionsHt.put('[pt震荡]', '/source/face/ct/7.png');
  }
})();