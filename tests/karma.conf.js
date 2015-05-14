module.exports = function(config) {
    config.set({
        frameworks: ['mocha', 'chai'],

        files: [
            'dist/specs.bundle.js'
        ],

        reporters: ['spec'],
        port: 9000,
        runnerPort: 9100,
        colors: true,
        autoWatch: false,
        singleRun: true,
        browsers: ['PhantomJS'],
        captureTimeout: 60000,
        reportsSlowerThan: 500
    });
};
