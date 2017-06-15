!(function(window, $, undefined) {
  'use strict';
  var _pathName = window.location.pathname;

  function _router (cur, path) {
    var _route = {
          index: ['/', '', '/index.html']
        };

    for (var key in _route[path]) {
      if (Object.hasOwnProperty.call(_route[path], key) && _route[path][key] === cur) {
        return true;
      }
    }
    return false;
  }

  function isOwnEmpty(obj) {
    for(var name in obj) {
      if(Object.hasOwnProperty.call(obj, name)) {
        return false;
      }
    }
    return true;
  }

  if (!!_router(_pathName, 'index')) {
    $.ajax({
      url: '/index-ajax_getHomead.html',
      type: 'GET',
      dataType: 'json',
      data: {},
      success: function(res) {
        if (!!+res.homeadpop.isShow) {
          require(['modules/newMember'], function (newMember) {
            newMember(res.homeadpop);

            require(['modules/countryChoose'], function (countryChoose) {
              countryChoose();
            });

          });
        } else {
          require(['modules/countryChoose'], function (countryChoose) {
            countryChoose();
          });
        }

        if (!!+res.homead.isShow) {
          require(['modules/headAd'], function (headAd) {
            headAd(res.homead);
          });
        }
      }
    });
  }

  // 活动页所引用变量
  // if (0 < __g_singlePageModule.length) {
  //   require(__g_singlePageModule, function (a) {
  //     typeof a === 'function' && a();
  //   });
  // }

  // 插件所引用变量
  if (false === isOwnEmpty(__g_widgetsModule)) {
    for (var key in __g_widgetsModule) {
      (function(i) {
        if (Object.hasOwnProperty.call(__g_widgetsModule, i)) {
          require([i], function(widget) {
            if (0 < __g_widgetsModule[i].length) {
              typeof widget === 'function' && widget(__g_widgetsModule[i].join(','));
            } else {
              typeof widget === 'function' && widget();
            }
          });
        }
      })(key);
    }
  }

})(window, window.jQuery)
