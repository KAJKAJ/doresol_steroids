/*

Default Gruntfile for AppGyver Steroids
http://www.appgyver.com
Licensed under the MIT license.

*/

module.exports = function(grunt) {
  grunt.loadNpmTasks("grunt-steroids");
  grunt.loadNpmTasks("grunt-ng-constant");

  grunt.initConfig({
      ngconstant: {
        // Options for all targets
        options: {
          space: '  ',
          wrap: '\'use strict\';\n\n {%= __ngModule %}',
          name: 'env',
        },
        // Environment targets
        development: {
          options: {
            dest: 'app/doresolApp/scripts/env.js'
          },
          constants: {
            ENV: {
              name: 'development',
              FIREBASE_URI: 'https://doresol-dev.firebaseio.com/',
              GOOGLE_API_URI: 'https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyAR3-1YSkP2LM-HuJshMivhOZuai9L5htM',
              HOST: 'http://doresol.net:8000',
              MEMORIAL_KEY:'-J_yaUS2gsgyLbDtgzQA'
              // HOST: 'http://doresol.net',
              // MEMORIAL_KEY:'-JXlUzqjXxv9TT49vTtT',
              // HOST: 'http://localhost:9876',
              // MEMORIAL_KEY:'-JZ7gqIDugLV4H57tRNg'
            }
          }
        },
        beta: {
          options: {
            dest: 'app/doresolApp/scripts/env.js'
          },
          constants: {
            ENV: {
              name: 'beta',
              // FIREBASE_URI: 'https://doresol-beta.firebaseio.com/',
              // GOOGLE_API_URI: 'https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyAR3-1YSkP2LM-HuJshMivhOZuai9L5htM',
              // HOST: 'http://doresol.net',
              // MEMORIAL_KEY:'-JWg83I6imBHVjgQs87P'
              FIREBASE_URI: 'https://doresol-beta.firebaseio.com/',
              GOOGLE_API_URI: 'https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyAR3-1YSkP2LM-HuJshMivhOZuai9L5htM',
              HOST: 'http://doresol.net',
              MEMORIAL_KEY:'-J_yaUS2gsgyLbDtgzQA'
            }
          }
        }
      },
    });

  // grunt.registerTask("default", [
  //   "steroids-make-fresh"
  // ]);

  grunt.registerTask("default", [
    "dev"
    // "beta"
  ]);

  grunt.registerTask("dev", [
    "ngconstant:development",
    "steroids-make-fresh"
  ]);

  grunt.registerTask("beta", [
    "ngconstant:beta",
    "steroids-make-fresh"
  ]);



}
