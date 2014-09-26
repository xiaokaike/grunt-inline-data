/*
 * grunt-inline-data
 * https://github.com/xiaokai/grunt-inline-data
 *
 * Copyright (c) 2014 xiaokai
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    var path = require('path');

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('inline_data', 'inline data in any file', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var files = this.filesSrc,
            options = this.options({
                punctuation: '.',
                separator: ', '
            }),
            dest = this.data.dest;

        // Iterate over all specified file groups.
        files.forEach(function (filepath) {
            var fileType = path.extname(filepath).replace(/^\./, ''),
                fileContent = grunt.file.read(filepath),
                destFile = getPathToDestination(filepath, dest);

            grunt.log.write('Processing ' + filepath + '...');

            fileContent = inline(filepath, fileContent);

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
     * @param {filepath}
     * @param {fileContent}
     * @return {fileContent}
     */
    function inline(filepath, fileContent){
        var flags = fileContent.match(/__inline\(([\s\S]*?)\)/g),
            inlinefileDir = path.dirname(filepath);

        flags.forEach(function (fa){
            var inlineFile = fa.match(/\(([\s\S]*?)\)/)[1];

            var inlineContent = grunt.file.read(inlinefileDir + '/' + inlineFile);

            fileContent = fileContent.replace(fa, inlineContent);

        });

        return fileContent;
    }

};
