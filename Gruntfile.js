'use strict';

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-wiredep');

  grunt.initConfig({
    jshint: {
      all: ['<%= project.alljs %>', 'Gruntfile.js', 'server.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    jscs: {
      src: ['<%= project.alljs %>', 'server.js', 'Gruntfile.js'],
      options: {
        config: '.jscsrc'
      }
    },

    pkg: grunt.file.readJSON('package.json'),

    project: {
      app: ['app'],
      sass: ['<%= project.app %>/sass/style.sass'],
      css: ['<%= project.app %>/css/**/*.css'],
      alljs: ['<%= project.app %>/js/**/*.js'],
      alljsx: ['<%= project.app %>/js/**/*.jsx']
    },

    wiredep: {
      task: {
        src: [
            '<%= project.app %>/*.html',
            '<%= project.app %>/sass/style.sass'
        ]
      }
    },

    clean: {
      dev: {
        src: ['build/']
      }
    },

    copy: {
      dev: {
        expand: true,
        cwd: 'app/',
        src: ['*.html', 'fonts/*.**', 'images/*.**', '<%= project.css %>', '<%= project.app %>/css/*.css.map'],
        dest: 'build/',
        filter: 'isFile'
      }
    },

    browserify: {
      dev: {
        options: {
          transform: [['reactify', {harmony:true}], 'debowerify'],
          debug: true
        },
        src: ['<%= project.alljs %>'],
        dest: 'build/js/app.js'
      },
      frontEndTest: {
        options: {
          transform: [['reactify', {harmony:true}], 'debeowerify'],
          debug: true
        },
        src: ['test/front-end/**/*test.js'],
        dest: 'test/testbundle.js'
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js'
      },
      continuous: {
        configFile: 'karma.conf.js',
        singleRun: true,
        browsers: ['PhantomJS']
      }
    },

    sass: {
      dev: {
        options: {
          style: 'expanded',
          compass: true
        },
        files: {
          'build/css/style.css':'<%= project.sass %>'
        }
      }
    },

    express: {
      options: {
         // Override defaults here
         output: 'listening'
      },
      dev: {
        options: {
          script: 'server.js'
        }
      },
      prod: {
         options: {
           script: 'server.js',
           node_env: 'production'
        }
      },
      test: {
        options: {
          script: 'server.js',
          node_env: 'test'
        }
      }
    },

    watch: {
      sass: {
        files: '<%= project.app %>/sass/{,*/}*.{sass,sass}',
        tasks: ['sass:dev']
      },
      express: {
        files:  ['server.js', 'app/index.html'],
        tasks:  ['build', 'express:dev'],
        options: {
          spawn: false
        }
      },
      app: {
        files: ['<%= project.alljs %>'],
        tasks: ['browserify:dev']
      },
      test: {
        files: ['<%= project.alljs %>', 'test/front-end/**/*.js'],
        tasks: ['build:dev', 'browserify:frontEndTest', 'karma:unit']
      }
    }
  }); //end initConfig

  grunt.registerTask('test', ['jshint', 'jscs']);
  grunt.registerTask('build', ['test', 'clean:dev', 'sass:dev', 'browserify:dev', 'copy:dev']);
  grunt.registerTask('default', ['build', 'watch']);
  grunt.registerTask('serve', ['build:dev', 'express:dev', 'watch']);
};
