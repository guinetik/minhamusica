'use strict';
/**
 * Created by guinetik on 10/30/14.
 */
angular.module('musicaApp').service('ws', ['$rootScope', '$http', 'API_URL', 'blockUI', ws]);
function ws($rootScope, $http, API_URL, blockUI) {
    var ws = this;
    var m = "POST";
    ws.baseURL = API_URL;
    ws.consumeService = function (endpoint, params, token, cb, overrideBase, method, shouldBlockUI) {
        var serviceURL;
        if (token) {
            var headers = {
                'content-type': 'application/json'
            };
            headers.token = token;
        } else  headers = null;
        if (shouldBlockUI == null) shouldBlockUI = true;
        if (!params) params = null;
        if (!method) method = m;

        if (!overrideBase) {
            serviceURL = ws.baseURL + endpoint;
        } else {
            serviceURL = endpoint;
        }
        console.log("method", method);
        if(shouldBlockUI) blockUI.start();
        $http({
            url: serviceURL,
            method: method,
            data: params,
            headers: headers
        }).success(function (result, status, headers, config) {
            blockUI.stop();
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
            blockUI.stop();
            console.log("errror");
            cb({message: err, status: status});
        });
    }
}
