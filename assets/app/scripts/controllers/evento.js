'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:PerfilCtrl
 * @description
 * # PerfilCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp').controller('EventoCtrl', ['$scope', 'api', '$stateParams', '$timeout', EventoCtrl]);
function EventoCtrl($scope, api, $stateParams, $timeout) {
    $scope.evento = {};
    $scope.map = {center: {latitude: 45, longitude: -73}, zoom: 14, options:{scrollwheel:false}};
    $scope.id = $stateParams.id;
    $scope.$on('$viewContentLoaded', function (event) {
        $timeout($scope.updateEvent);
    });
    $scope.updateEvent = function () {
        console.log("updateEvent", $scope.id);
        api.getEvent($scope.id, function (result) {
            console.log("updateEvent", result);
            if (result.status == 200) {
                $scope.evento = result;
                $scope.updateMap();
            }
        })
    };
    $scope.updateMap = function () {
        $scope.map.center = {latitude: $scope.evento.local.location.lat, longitude: $scope.evento.local.location.lng};
        $scope.marker = {
            id: 0,
            coords: {
                latitude: $scope.map.center.latitude,
                longitude: $scope.map.center.longitude
            },
            options: {scrollwheel: false},
            events: {
                click: function (marker, eventName, args) {
                    $scope.marker.options = {
                        draggable: false,
                        labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
                        labelAnchor: "100 0",
                        labelClass: "marker-labels"
                    };
                }
            }
        };
    }
}
