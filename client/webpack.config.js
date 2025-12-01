const JavaScriptObfuscator = require('webpack-obfuscator');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = function(webpackEnv) {
  const isEnvProduction = webpackEnv === 'production';
  
  return {
    // Standard CRA webpack config extends...
    webpack: {
      plugins: [
        isEnvProduction && new JavaScriptObfuscator({
          // Basic obfuscation options
          rotateStringArray: true,
          stringArray: true,
          stringArrayThreshold: 0.75,
          deadCodeInjection: true,
          deadCodeInjectionThreshold: 0.4,
          renameGlobals: false,
          compact: true,
          controlFlowFlattening: true,
          controlFlowFlatteningThreshold: 0.75,
          numbersToExpressions: true,
          simplify: true,
          shuffleStringArray: true,
          splitStrings: true,
          stringArrayThreshold: 0.75,
          
          // Disable console logs in production
          disableConsoleOutput: true,
          
          // Domain lock (optional - restricts to specific domains)
          // domainLock: ['localhost', 'yourdomain.com'],
          
          // Self defending - makes debugging harder
          selfDefending: true,
          debugProtection: true,
          debugProtectionInterval: 4000,
          
          // Source maps (disable for production)
          sourceMap: false,
          sourceMapMode: 'separate',
        }, ['vendor.js', 'main.js'])
      ].filter(Boolean),
      
      optimization: {
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              compress: {
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn']
              },
              mangle: true,
              format: {
                comments: false
              }
            },
            extractComments: false
          })
        ]
      }
    }
  };
};
