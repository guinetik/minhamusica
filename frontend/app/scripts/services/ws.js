'use strict';
/**
 * Created by guinetik on 10/30/14.
 */
angular.module('musicaApp').service('ws', ['$rootScope', '$http', 'API_URL', ws]);
function ws($rootScope, $http, API_URL) {
  var ws = this;
  var m = "POST";
  ws.baseURL = API_URL;
  ws.consumeService = function (endpoint, params, token, cb, overrideBase, method) {
    var serviceURL;
    if (!params) params = {};
    if(!method) method = m;
    if (token) {
      params.token = token;
      console.log("injecting token", token, params.token);
    }
    if (!overrideBase) {
      serviceURL = ws.baseURL + endpoint;
    } else {
      serviceURL = endpoint;
    }
    console.log("serviceURL", serviceURL, params);
    $http({
      url: serviceURL,
      method: method,
      data: params
    }).success(function (result, status, headers, config) {
      //console.log("data", result, status, headers, config);
      result.status = status;
      if(status == 200) {
        if (result.token) {
          console.log("tem token");
          $rootScope.$emit("update-user-token", result.token);
        }
      }
      if (cb) {
        console.log("dispatching callback", result, result.token);
        cb(result);
      }
    }).error(function(err){
      cb(err);
    });
  }
}
