'use strict';

module.exports = function (grunt) {

    // Show elapsed time at the end
    require('time-grunt')(grunt);
    // Load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        mochaTest: {
            test: {
                src:['test/**/AAA_initialDBTestCases_test.js', 'test/**/users_test.js','test/**/carDirectorys_test.js', 'test/**/departments_test.js', 'test/**/userroles_test.js']
            },
            debug :{
                src:['test/**/AAA_initialDBTestCases_test.js', 'test/**/departments_test.js']
            },
            live: {
                src: ['test/**/*_live.js']
            },
            init :{
                src:[ 'test/**/AAA_initialDBTestCases_test.js']
            }
        },
        mocha_istanbul: {
            coverage: {
                src: 'test', // the folder, not the files,
                options: {
                    //mask: '{main,SIMCard}_test.js',
                    mask: '**_test.js',     //String options.mask (default: false)The mask for the tests to be ran. By default, mocha will execute the test folder and all test files. Will override any files specified in src and instead use the mask on those files' folders.
                    //require: ['test/aaa_initialTestCases_test.js'],
                    excludes : ['config/config.js'],
                    mochaOptions: ['--bail', '--debug-brk'],
                    istanbulOptions: ['--default-excludes'],
                    timeout: 4000
                }
            },
            it: {
                src: 'test', // the folder, not the files,
                options: {
                    mask: '**/*_it.js',
                    require: ['test/common.js'],
                    timeout: 20000
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            lib: {
                src: ['lib/**/*.js']
            },
            test: {
                src: ['test/**/*.js']
            }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            lib: {
                files: '<%= jshint.lib.src %>',
                tasks: ['jshint:lib', 'mochaTest']
            },
            test: {
                files: '<%= jshint.test.src %>',
                tasks: ['jshint:test', 'mochaTest']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-istanbul');
    grunt.loadNpmTasks('grunt-mocha-test');

    // Default task.
    grunt.registerTask('init', ['mochaTest:init']);
    grunt.registerTask('test', ['mochaTest:test']);
    grunt.registerTask('debug', ['mochaTest:debug']);
    grunt.registerTask('it', ['jshint', 'mocha_istanbul:it']);
    grunt.registerTask('live', ['mochaTest:live']);
    grunt.registerTask('coverage', ['mocha_istanbul:coverage']);
    grunt.registerTask('default', ['jshint', 'coverage']);
};
