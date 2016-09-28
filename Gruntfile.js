module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bower: {
            install: {
                options: {
                    copy: true,
                    targetDir: './public',
                    layout: 'byType',
                    install: true,
                    verbose: false,
                    prune: false,
                    cleanTargetDir: false,
                    cleanBowerDir: false,
                    bowerOptions: {}
                }
            }
        },
        uglify: {
            my_target: {
                files: {
                    'public/jquery/jquery.min.js': ['public/jquery/jquery.js'],
                    'public/bootstrap/bootstrap.min.js': ['public/bootstrap/bootstrap.js'],
                    'public/javascripts/qa.min.js': ['public/javascripts/qa.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('bowercopy', ['bower']);
};