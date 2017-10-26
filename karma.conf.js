// Karma configuration
// Generated on Fri Oct 20 2017 17:05:17 GMT+0800 (CST)
const webpack = require('webpack')
const path = require('path')
const srcPath = path.resolve(__dirname, './src')

module.exports = function (config) {
  config.set({

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai'],

    // list of files / patterns to load in the browser
    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      'test/**/*.spec.js'
    ],

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/**/*.spec.js': ['webpack']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec', 'coverage-istanbul'],
    coverageReporter: {
      type: 'html',
      dir: 'build/coverage/'
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    //webpack 配置
    webpack: {
      module: {
        rules: [
          {
            test: /\.js/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['es2015']
              }
            }
          },
          {
            test: /\.js$/,
            enforce: 'post',
            use: {loader: 'istanbul-instrumenter-loader', options: {esModules: true}},
            include: srcPath,
            exclude: /(test|node_modules|bower_components)/,
          }
        ]
      }
    },

    // 配置代码覆盖率插件
    coverageIstanbulReporter: {
      // 以什么格式, 这里设置了输出 html文件 ,info文件 ,及控制台
      reports: ['html', 'text', 'text-summary'],
      // 将文件输出路径定位
      dir: path.join(__dirname, 'coverage'),
      // 修正 weback 路径（翻译了是这个意思）
      fixWebpackSourcePaths: true,
      // 将生成的html放到./coverage/html/下
      'report-config': {
        html: {
          subdir: 'html'
        }
      }
    },

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      noInfo: true
    },

    //插件列表
    plugins: [
      'karma-webpack',
      'karma-coverage',
      'karma-mocha',
      'karma-chai',
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'istanbul-instrumenter-loader',
      'karma-sourcemap-loader',
      'karma-babel-preprocessor',
      'karma-spec-reporter',
      'karma-coverage-istanbul-reporter'
    ]
  })
}
