/*
 * ===========================================================================
 * File: gruntfile.js
 * Author: Anthony Del Ciotto
 * Desc: TODO
 * ===========================================================================
 */

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            dist: ['dist/**']
        },

        copy: {
            main: {
                files: [
                    { expand: true, src: ['index.html'], dest: 'dist/' },
                    { expand: true, src: ['res/**'], dest: 'dist/' },
                    { expand: true, flatten: true,  src: [
                                            './node_modules/underscore/underscore.js',
                                            './node_modules/underscore/underscore-min.js',
                                            './node_modules/underscore/underscore.-min.map',
                                            './node_modules/peerjs/dist/peer.js',
                                            './node_modules/peerjs/dist/peer.min.js',
                                            './node_modules/phaser/build/phaser.js',
                                            './node_modules/phaser/build/phaser.min.js',
                                            './node_modules/phaser/build/phaser.map',
                                            './node_modules/phaser-debug/dist/phaser-debug.js'], dest: 'dist/js/vendor/' }
                ]
            }
        },

        jshint: {
            options: {
                jshintrc: true,
                force: true
            },
            files: ['src/**/*.js']
        },

        browserify: {
            options: {
                browserifyOptions: {
                    debug: true,
                    paths: ['./src'],
                },
                transform: ['babelify']  //'uglifyify']
            },
            dist: {
                files: {
                    'dist/js/bundle.js': ['src/client/**/*.js']
                }
            }
        },

        express: {
            dev: {
                options: {
                    script: 'app.js'
                }
            }
        },

        watch: {
            options: {
                livereload: true
            },
            client: {
                files: ['src/client/**/*.js'],
                tasks: ['jshint', 'browserify:dist']
            },
            server: {
                options: {
                    spawn: false
                },
                files: ['app.js', 'gruntfile.js', 'src/server/**/*.js', 'src/const.js'],
                tasks: ['jshint', 'express', 'browserify:dist', 'watch']
            }
        }
    });

    grunt.registerTask('lint', ['jshint']);
    grunt.registerTask('build', ['clean', 'copy', 'lint', 'browserify:dist']);
    grunt.registerTask('default', ['build', 'express', 'watch']);
};
