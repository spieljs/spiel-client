module.exports = function(config) {
    config.set({
        frameworks: ['mocha', 'karma-typescript'],
        files: [
            "src/**/*.ts",
            "test/**/**.ts",
            "test/**/**.tsx"
        ],
        preprocessors: {
            "**/*.ts": "karma-typescript",
            "**/*.tsx": "karma-typescript"
        },

        exclude: [
            "lib/**"
        ],

        reporters: ['karma-typescript', 'coverage', 'remap-coverage','mocha'],
        port: 9876,
        autoWatch: true,
        karmaTypescriptConfig: {
            compilerOptions: {
                "target": "es6",
                "module": "commonjs",
                "strict": true,
                "emitDecoratorMetadata": true,
                "experimentalDecorators": true,
                "declaration": true,
                "jsx": "react",
                "jsxFactory": "h",
                "sourceMap": true
            }
        },
        remapCoverageReporter: {
            'text-summary': null,
            html: './coverage/html',
            cobertura: './coverage/cobertura.xml'
        },

        mochaReporter: {
            output: 'full'
        }
    });
}