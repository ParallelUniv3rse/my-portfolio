var path = require("path");
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var runSequence = require('run-sequence');
var nodemon = require("gulp-nodemon");
var babel = require("gulp-babel");

//TODO: implpenent concatination
//TODO: implement gulp-inspector with nodemon
var options = {
    app: {
        nodemonOptions: {
            script: 'app.js',
            ignore: ['public/**/*.js', 'gulpfile_production.js', 'gulpfile.js', 'node_modules/'],
            env: {
                'NODE_ENV': 'development',
                'DEBUG': 'appname:*'
            }
        },
        port: 3000, // local node app port
        "bs-port": 5000, // use *different* port than above
    },
    html: {
        path: "views",
        ext: ".hbs"
    },
    js:{
        path: "public/js",
        es6dir: "ES6"
    },
    styles: {
        //minify: true,
        //concat: false,
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


gulp.task("serve", function (callback) {
    console.log("Serving...");
    runSequence('browser-sync', ['scripts', 'styles'], ['sass:watch', 'html:watch', 'js:watch'],
        callback);
});

gulp.task('browser-sync', ['nodemon'], function (cb) {
    browserSync({
        proxy: "http://localhost:" + options.app.port,
        port: options.app["bs-port"],
        notify: true
    });
    cb();
});
gulp.task('nodemon', function (cb) {
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
            reload({ stream: false });
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
});

gulp.task('debug', function() {
    gulp.src([])
        .pipe(nodeInspector());
});

gulp.task('styles', function (cb) {
    gulp.src([path.join(options.styles.path.scss, '/**/*.scss')])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass(options.styles.sassOptions).on('error', sass.logError))
        .pipe(autoprefixer({ browsers: options.styles.autoprefixerCompatibility}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(options.styles.path.css))
        //.pipe(browserSync.reload({stream:true})) --- ERR: reloads whole page because of the .map files
        .pipe(browserSync.stream({match: '**/*.css'}));
    cb();
});

gulp.task('scripts', function (cb) {
    gulp.src([path.join(options.js.path, options.js.es6dir, '/**/*.js')])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(options.js.path));
    reload();
    cb();
});

gulp.task("default", ["serve"]);

/**
 * HELPER TASKS
 **/

gulp.task('sass:watch', function () {
    gulp.watch([path.join(options.styles.path.scss , '/**/*.scss')], ['styles']);
});

gulp.task("html:watch", function(){
    gulp.watch([path.join(options.html.path, '/**/*' + options.html.ext)], ['bs-reload']);
});

gulp.task("js:watch", function(){
    gulp.watch([path.join(options.js.path, options.js.es6dir, '/**/*.js')], ['bs-reload']);
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});
