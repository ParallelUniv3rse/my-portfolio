let path = require("path"),
    gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    nodemon = require("gulp-nodemon"),
    webpack = require("webpack-stream");

//TODO: implement webpacking &it's optimization
var options = {
    app: {
        nodemonOptions: {
            script: 'app.js',
            ignore: ['public/**/*.js', 'gulpfile_production.js', 'gulpfile.js', 'webpack.config.js', 'node_modules/'],
            env: {
                'NODE_ENV': 'development',
                'DEBUG': 'appname:*'
            }
        },
        port: 3000, // local node app port
        "bs-port": 4000, // use *different* port than above
    },
    html: {
        path: "views",
        ext: ".ejs"
    },
    js: {
        path: "public/js",
        es6dir: "ES6",
        entryFile: "main.js"
    },
    styles: {
        //minify: true,
        path: {
            scss: "public/stylesheets/sass",
            css: "public/stylesheets"
        },
        autoprefixerCompatibility: ['last 3 versions', '> 1%'],
        sassOptions: {
            outputStyle: 'compressed'
            /*
             ------- nested:(indented like scss)-------

             .widget-social {
             text-align: right; }
             .widget-social a,
             .widget-social a:visited {
             padding: 0 3px;
             color: #222222;
             color: rgba(34, 34, 34, 0.77); }

             ------- expanded:(classic css) -------

             .widget-social {
             text-align: right;
             }
             .widget-social a,
             .widget-social a:visited {
             padding: 0 3px;
             color: #222222;
             color: rgba(34, 34, 34, 0.77);
             }

             ------- compact -------

             .widget-social { text-align: right; }
             .widget-social a, .widget-social a:visited { padding: 0 3px; color: #222222; color: rgba(34, 34, 34, 0.77); }

             ------- compressed:(minified) -------

             .widget-social{text-align:right}.widget-social a,.widget-social a:visited{padding:0 3px;color:#222222;color:rgba(34,34,34,0.77)}
             */
        }
    }
};


gulp.task("serve", gulp.series(nm, bs, gulp.parallel(scripts, styles), watch));

function bs(cb) {
    browserSync({
        proxy: "http://localhost:" + options.app.port,
        port: options.app["bs-port"],
        notify: true
    });
    cb();
};
function nm(cb) {
    var called = false;
    var server = nodemon(options.app.nodemonOptions);
    server.on('start', function () {
        if (!called) {
            called = true;
            cb();
        }
    });
    server.on('restart', function () {
        console.log('restarted!');
        //TODO: is this delay needed?
        setTimeout(function () {
            reload({stream: false});
        }, 1000);
    });
    server.on('crash', function () {
        console.error('Application has crashed!\n');
        server.emit('restart', 5);  // restart the server in 5 seconds
    });
    //server.once('quit', function () {
    //    // handle ctrl+c without a big weep
    //    process.exit();
    //});
    return server;
};

function styles(cb) {
    gulp.src([path.join(options.styles.path.scss, '/**/*.scss')])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass(options.styles.sassOptions).on('error', sass.logError))
        .pipe(autoprefixer({browsers: options.styles.autoprefixerCompatibility}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(options.styles.path.css))
        //.pipe(browserSync.reload({stream:true})) --- ERR: reloads whole page because of the .map files
        .pipe(browserSync.stream({match: '**/*.css'}));
    cb();
};

function scripts(cb) {
    gulp.src([path.join(options.js.path, options.js.es6dir, options.js.entryFile)])
        .pipe(plumber())
        .pipe(webpack(require('./webpack.config.js'), require("webpack")))
        .pipe(gulp.dest(options.js.path));
    reload();
    cb();
};


gulp.task("default", gulp.parallel("serve"));

/**
 * HELPER TASKS
 **/

function watch(cb) {
    gulp.watch([path.join(options.styles.path.scss, '/**/*.scss')], gulp.parallel(styles));
    gulp.watch([path.join(options.html.path, '/**/*' + options.html.ext)], gulp.parallel(bsReload));
    gulp.watch([path.join(options.js.path, options.js.es6dir, '/**/*.js')], gulp.parallel(scripts));
    cb();
}

function bsReload(cb) {
    reload();
    cb();
};
