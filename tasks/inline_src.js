/*
 * grunt-inline-src
 * https://github.com/xiaokai/grunt-inline-src
 *
 * Copyright (c) 2014 xiaokai
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    var path = require('path');

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('inline_src', 'The best Grunt plugin ever.', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var files = this.filesSrc,
            options = this.options({
                tag: '__inline',
                punctuation: '.',
                separator: ', '
            }),
            dest = this.data.dest;

        // Iterate over all specified file groups.
        files.forEach(function (filepath) {
            var fileType = path.extname(filepath).replace(/^\./, '');
            var fileContent = grunt.file.read(filepath);

            grunt.log.write('Processing ' + filepath + '...');

            console.log(fileContent);

            fileContent = inline(filepath, fileContent);

            var destFile = getPathToDestination(filepath, dest);
            

            grunt.file.write(destFile, fileContent);
            grunt.log.ok();
        });
    });

    // from grunt-text-replace.js in grunt-text-replace
    function getPathToDestination(pathToSource, pathToDestinationFile) {
        var isDestinationDirectory = (/\/$/).test(pathToDestinationFile);
        var fileName = path.basename(pathToSource);
        var newPathToDestination;
        if (typeof pathToDestinationFile === 'undefined') {
            newPathToDestination = pathToSource;
        } else {
            newPathToDestination = pathToDestinationFile + (isDestinationDirectory ? fileName : '');
        }
        return newPathToDestination;
    }

    /**
     * @describe getinline message
     */
    function inline(filepath, fileContent){
        // 'fdsfsd__inline(dddd.data)'.match(/__inline\(([\s\S]*?)\)/)
        var flags = fileContent.match(/__inline\(([\s\S]*?)\)/g),
            thisfileDir = path.dirname(filepath);

        console.log(flags);

        flags.forEach(function (fa){
            var inlinePath = fa.match(/\(([\s\S]*?)\)/)[1];

            var inlineContent = grunt.file.read(thisfileDir + '/' + inlinePath);

            fileContent = fileContent.replace(fa, inlineContent);

            console.log(fileContent);

        });


        return fileContent;
    }

};