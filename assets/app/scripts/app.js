'use strict';

/**
 * @ngdoc overview
 * @name musicaApp
 * @description
 * # musicaApp
 *
 * Main module of the application.
 */
angular.module('musicaApp',
    ['ui.router',
        'ngAnimate',
        'toastr',
        'bardo.directives',
        'angularFileUpload',
        'blockUI',
        'ng-sortable',
        'igTruncate',
        'ezfb',
        'dcbImgFallback',
        'mediaPlayer',
        'angularMoment']).run(function ($rootScope) {
        functions.playlist.init(this);
        // helper function to seek to a percentage
        $rootScope.seekPercentage = function ($event) {
            var percentage = ($event.offsetX / $event.target.offsetWidth);
            if (percentage <= 1) {
                return percentage;
            } else {
                return 0;
            }
        };
    });
var functions = functions || {};
functions = {
    playlist: {
        init: function (element) {
            var _this = $(element);
            _this.toggleClass('closed');
            if ($('#playlist').hasClass('visible')) {
                functions.playlist.hide();
            } else {
                functions.playlist.show();
            }

        },
        show: function () {
            $('#playlist').animate({'height': '172px', 'border-top': 0});
            $('#playlist .playlist-plug').attr('title', 'Esconder Playlist');
            $('#playlist').addClass('visible')
        },
        hide: function () {
            $('#playlist').animate({'height': '5px', 'border-top': '1px solid #3a3a3a'});
            $('#playlist .playlist-plug').attr('title', 'Abrir Playlist');
            $('#playlist').removeClass('visible');
        }
    },
    dropdownGenre: {
        show: function (element) {
            var _this = $(element);
            _this.find('.genre-trigger').addClass('active');
            _this.find('.genre-dropdown').stop().show();
        },
        hide: function (element) {
            var _this = $(element);
            _this.find('.genre-trigger').removeClass('active');
            _this.find('.genre-dropdown').stop().hide();
        }
    }
};
$(window).load(function () {
    // Plug Playlist
    $(document).on('click', '#playlist .playlist-plug', function (e) {
        e.preventDefault();
        functions.playlist.init(this);
    });
    // Genre dropdown
    $(document).on('mouseover', '#genre', function (e) {
        e.preventDefault();
        functions.dropdownGenre.show(this);
    });
    $(document).on('mouseleave', '#genre', function (e) {
        e.preventDefault();
        functions.dropdownGenre.hide(this);
    });
});
