module.exports = function(grunt) {
	// Project configuration.
	const sass = require('node-sass');
	require('load-grunt-tasks')(grunt);
	// Initialise Grunt config. 
	grunt.initConfig({
		sass: {
			options: {
				implementation: sass,
				// Generate CSS sourcemap from sass files.
				sourceMap: true,
			},
			dist: {
		        options: {
		        	// Minifies the CSS file. 
		          	outputStyle: 'compressed'
		        },
		        files: {
		        	// Converts sass files into CSS file and puts it into the build folder. 
		          	'build/styles.min.css': 'sass/app.scss'
		        }
     		}
		},
		concat:{
			js: {
				// Looks into directories inside js and then looks for files with the .js extensions.
				src: ['js/**/*.js'],
				// Combines all files into one file and places into the build folder.
				dest: 'build/script.min.js'
			}
		}, 
		uglify: {
			build: {
				files: [{
					// Minifies script.min.js inside the build folder.
					src: 'build/script.min.js',
					dest: 'build/script.min.js'
				}]
			}
		},
		php: {
			dist: {
				// Opens index.php found in the root directory, on port 3000 and keeps it running. 
				options: {
					port: 3000,
					open: true,
					keepAlive: true,
					base: '../'
				}
			}
		},
		watch: {
	      sass: {
	      	// Watches for changes in the following files/folders and runs the appropriate tasks. 
	        files: ['sass/**/*.scss', 'js/*.js'],
        	tasks: ['sass', 'concat']
	      }
	    },
	    concurrent: {
	    	target: {
	    		// Run both these tasks silmutaneously. 
	    		tasks: ['php:dist', 'sync'],
	    		options: {
					logConcurrentOutput: true
				}
			}
	    },
	});
	
	// Load tasks. 
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Register tasks.
	grunt.registerTask('default', ['sass', 'concat', 'uglify']);
	grunt.registerTask('sync', ['default', 'watch']);
	grunt.registerTask('serve', ['concurrent:target']);

};