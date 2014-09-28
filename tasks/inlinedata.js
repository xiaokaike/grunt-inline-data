/*
 * grunt-inline-data
 * https://github.com/xiaokai/grunt-inline-data
 *
 * Copyright (c) 2014 xiaokai
 * Licensed under the MIT license.
 */

'use strict';
var path = require('path');
var chalk = require('chalk');

module.exports = function(grunt) {
    /**
     * @describe getinline message
     * @param {filepath}
     * @param {source}
     * @return {source}
     */
    var inliner = function(source, filepath){
        var flags = source.match(/__inline\(([\s\S]*?)\)/g);
        if(flags && flags.length > 0){
            flags.forEach(function (fa){
                var inlineFile = fa.match(/\(([\s\S]*?)\)/)[1];
                var inlineContent = grunt.file.read(filepath + '/' + inlineFile);
                source = source.replace(fa, inlineContent);
            });
        }
        return source;
    };


    grunt.registerMultiTask('inlinedata', 'inline data in any file', function() {
        
        var options = this.options({
            });

        this.files.forEach(function (file) {

            var valid = file.src.filter(function (filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file ' + chalk.cyan(filepath) + ' not found.');
                    return false;
                } else {
                    return true;
                }

            });

            var inner = valid.map(function (file) {
                var src = grunt.file.read(file);

                options.relativeTo = path.dirname(file);
                return inliner(src, options.relativeTo);
            });

            if (inner.length === 0) {
                return grunt.log.warn('Destination not written because inner filer was empty.');
            }

            if (options.banner) {
                inner = options.banner + grunt.util.linefeed + inner;
            }

            grunt.file.write(file.dest, inner);
            grunt.log.writeln('File ' + chalk.cyan(file.dest) + ' created: ');
        });
        
    });
};
