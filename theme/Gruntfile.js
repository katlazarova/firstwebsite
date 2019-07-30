module.exports = function(grunt) {
	// Project configuration.
	const sass = require('node-sass');
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		concat:{
			js: {
				// Looks into directories inside js and then looks for files with the .js extensions.
				src: ['js/**/*.js'],
				// Compresses into one file and places into the build folder.
				dest: 'build/scripts.js'
			},
			css: {
				src: ['sass/styles.css'],
				dest: 'build/styles.css'
			}
		}, 
		sass: {
			options: {
				implementation: sass,
				sourceMap: true,
			},
			dist: {
				files: [{
					src: 'sass/**/*.scss',
					dest: 'sass/styles.css'
				}]
			}
		},
		uglify: {
			build: {
				files: [{
					src: 'build/scripts.js',
					dest: 'build/script.min.js'
				}]
			}
		},

		watch:{
			scripts: {
				files: ['js/**/*.js', 'sass/**/*.scss'],
				tasks: 'default',
				options: {
					debounceDelay: 250,
				},
			},
		},
	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['sass', 'concat', 'uglify']);
	//grunt.registerTask('watch', ['watch']);
};
