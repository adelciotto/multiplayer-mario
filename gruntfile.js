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

        jshint: {
            options: {
                jshintrc: true,
                force: true
            },
            files: ['src/**/*.js', '!src/client/vendor/stats.js']
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
            },

            karma: {
                dest: 'tests/dist/specs.bundle.js',
                src: 'tests/src/**/*.js',
                options: {
                    debug: true,
                    multifile: true
                }
            }
        },

        karma: {
            unit: {
                configFile: 'tests/karma.conf.js'
            }
        },

        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'sass',
                    src: ['*.scss'],
                    dest: 'dist/css',
                    ext: '.css'
                }]
            }
        },

        express: {
            dev: {
                options: {
                    script: 'index.js'
                }
            }
        },

        watch: {
            options: {
                livereload: true
            },
            client: {
                files: ['src/client/**/*.js', '!src/client/vendor/*.js'],
                tasks: ['jshint', 'browserify:dist']
            },
            server: {
                options: {
                    spawn: false
                },
                files: ['app.js', 'gruntfile.js', 'src/server/**/*.js', 'src/common/**/*.js'],
                tasks: ['jshint', 'express', 'browserify:dist']
            },
            sass: {
                options: {
                    livereload: false
                },
                files: ['sass/*.scss'],
                tasks: ['sass']
            },
            stylesheets: {
                files: ['dist/css/*.css']
            }
        }
    });

    grunt.registerTask('test', ['browserify:karma', 'karma']);
    grunt.registerTask('lint', ['jshint']);
    grunt.registerTask('build', ['lint', 'browserify:dist', 'sass']);
    grunt.registerTask('default', ['build', 'express', 'watch']);
};
