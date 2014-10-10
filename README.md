# grunt-inline-data

> inline data in file


*Issues with the output should be reported on the grunt-inline-data [issue tracker](https://github.com/xiaokaike/grunt-inline-data/issues).*


## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-inline-data --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-inline-data');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4), but in case you can't please use [v0.3.2](https://github.com/gruntjs/grunt-inline-data/tree/grunt-0.3-stable).*



## inline-data

### Options


### Usage Examples

In your project's Gruntfile, add a section named `inlinedata` to the data object passed into `grunt.initConfig()`.

```js
inlinedata: {
    injs: {
        expand: true,
        cwd: 'test/fixtures/',
        src: ['*.js'],
        dest: 'tmp/',
        ext: '.inline.js'
    }
}
```

such as ：app.js

```js 

// base.min.css will be inline to here
var style = '__inline(../dist/base.min.css)';

// inner.min.tpl will be inline to here
var tpl = '__inline(../dist/inner.min.tpl)';
 
// json data will be inline to here
var jsonData = __inline(inlinesrc/data.json);

```


after grunt buid : app.inline.js

```js
 
// base.min.css will be inline to here
var style = 'body{color:#fff;margin:0;padding:0}.box{color:#eee;display:block}';

// inner.min.tpl will be inline to here
var tpl = '<div class="">test tpl</div>';
 
// json data will be inline to here
var jsonData = {
    "data": [{
        "title": "test",
        "url": "news",
        "icon": "https://google.com"
    }]
};
// 
```

base.min.css
```css
body{color:#fff;margin:0;padding:0}.box{color:#eee;display:block}	
```

## Release History

 * 2014-09-27   v0.0.5   
 

---

