module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON( 'package.json' ),

    watch: {
      scss: {
        files: ['scss/**/*.scss'],
        tasks: 'scss'
      },
      html: {
        files: ['src/**/*.hbs'],
        tasks: 'html'
      },
      js: {
        files: ['js/**/*.js'],
        tasks: 'js'
      },
      livereload: {
        options: {
          livereload: true
        },
        files: [
          'dist/**/*.html',
          'assets/css/{,*/}*.css',
          'assets/js/{,*/}*.js'
        ]
      }
    },

    sass: {
      build: {
        files : [
          {
            src : ['**/*.scss', '!**/_*.scss'],
            cwd : 'scss',
            dest : 'css',
            ext : '.css',
            expand : true
          }
        ],
        options : {
          style : 'expanded'
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 8000,
          base: './'
        }
      }
    },

    assemble: {
      options: {
        flatten: true,
        layout: 'layout.hbs',
        layoutdir: 'src/templates/layouts',
        assets: 'assets',
        partials: ['src/templates/pages/*.hbs', 'src/templates/parts/*.hbs']
      },
      demo: {
        options: {
          data: ['src/data/*.{json,yml}']
        },
        files: {
          'dist/': ['src/templates/pages/*.hbs']
        }
      }
    },

    copy: {
      css: {
        files: [
          { expand: true, cwd: './css', src: ['./**/*.*'], dest: 'assets/css' }
        ]
      },
      js: {
        files: [
          { expand: true, cwd: './js', src: ['./**/*.*'], dest: 'assets/js' }
        ]
      }
    }

  });

  // Default task
  grunt.registerTask('default', ['sass', 'assemble', 'copy']);

  grunt.registerTask('scss', ['sass', 'copy:css']);
  grunt.registerTask('html', ['assemble']);
  grunt.registerTask('js', ['copy:js']);

  grunt.registerTask('dev', ['connect', 'watch']);
  grunt.registerTask('demo', ['copy:demo', 'assemble:demo']);
  grunt.registerTask('deploy', ['gh-pages']);

  grunt.loadNpmTasks('assemble');
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
};
