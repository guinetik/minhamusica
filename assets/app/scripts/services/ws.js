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
    var headers = {
      'content-type': 'application/json'
    };
    if (!params) params = {};
    if (!method) method = m;
    if (token) {
      headers.token = token;
    }
    if (!overrideBase) {
      serviceURL = ws.baseURL + endpoint;
    } else {
      serviceURL = endpoint;
    }
    $http({
      url: serviceURL,
      method: method,
      data: params,
      headers:headers
    }).success(function (result, status, headers, config) {
      //console.log("data", result, status, headers, config);
      result.status = status;
      if (status == 200) {
        if (result.token) {
          //console.log("tem token");
          $rootScope.$emit("update-user-token", result.token);
        }
      }
      if (cb) {
        //console.log("dispatching callback", result, result.token);
        cb(result);
      }
    }).error(function (err, status) {
      console.log("errror");
      cb({message:err, status:status});
    });
  }
}
