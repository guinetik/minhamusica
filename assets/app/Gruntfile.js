module.exports = function(grunt) {
    "use strict";
    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    var gruntConfig = grunt.file.readJSON('./grunt-config.json');
    grunt.initConfig(gruntConfig);
    grunt.registerTask('compile', ['uglify', 'cssmin']);
};