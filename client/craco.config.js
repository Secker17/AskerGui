const JavaScriptObfuscator = require('webpack-obfuscator');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  webpack: {
    plugins: {
      add: [
        // Obfuscate in both development AND production
        new JavaScriptObfuscator({
          // Basic obfuscation
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
          
          // Disable console output
          disableConsoleOutput: true,
          
          // Self defending
          selfDefending: true,
          debugProtection: true,
          debugProtectionInterval: 4000,
          
          // No source maps
          sourceMap: false,
        }, ['vendor.js'])
      ],
      
      // Enhanced minification
      optimization: {
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              compress: {
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn', 'console.error']
              },
              mangle: {
                // Mangle variable and function names
                toplevel: false,
                properties: {
                  regex: /^_/
                }
              },
              format: {
                comments: false
              }
            },
            extractComments: false
          })
        ]
      }
    },
    
    // Additional webpack configuration
    configure: (webpackConfig, { env, paths }) => {
      // Add more aggressive obfuscation for production
      if (env === 'production') {
        // Remove source maps
        webpackConfig.devtool = false;
        
        // Set more aggressive optimization
        webpackConfig.optimization.usedExports = true;
        webpackConfig.optimization.sideEffects = false;
      }
      
      return webpackConfig;
    }
  }
};
