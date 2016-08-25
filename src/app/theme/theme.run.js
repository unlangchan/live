/**
 * @author v.lugovksy
 * created on 15.12.2015
 */
(function() {
  'use strict';

  angular.module('Live.theme')
    .run(themeRun);

  /** @ngInject */
  function themeRun($rootScope, $timeout, $q, room, SinaEmotion) {
    $rootScope.$pageFinishedLoading = false;
    var whatToWait = [
      SinaEmotion.load(),
      room.load()
    ];
    $q.all(whatToWait).then(function() {
      room.decode();
      $rootScope.$pageFinishedLoading = true;
      $timeout(init, 0);
    });
  }

  function init() {}


})();