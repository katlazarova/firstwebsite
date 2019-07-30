module.exports = function(grunt) {
	// Project configuration.
	const sass = require('node-sass');
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		sass: {
			options: {
				implementation: sass,
				sourceMap: true,
			},
			dist: {
				options: {
					outputStyle: 'compressed'
				},
				files: {
					'build/styles.min.css': 'sass/app.scss',
				}
			}
		},
		concat:{
			js: {
				// Looks into directories inside js and then looks for files with the .js extensions.
				src: ['js/**/*.js'],
				// Compresses into one file and places into the build folder.
				dest: 'build/scripts.js'
			},
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
	grunt.loadNpmTasks('grunt-browser-sync');

	grunt.registerTask('default', ['sass', 'concat', 'uglify']);
	//grunt.registerTask('watch', ['watch']);
};
