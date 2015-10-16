
// Först hämtar vi in gulp självt IN TRUE NODE STYLEE
var gulp = require("gulp"),

	// Sedan hämtar vi in alla nödvändiga plugins
	gutil 		= require("gulp-util"),
	uglify 		= require("gulp-uglify"),
	browserify 	= require('browserify'),
	source 		= require('vinyl-source-stream'),
	buffer 		= require('vinyl-buffer');
/*
	jshint = require("gulp-jshint"),
	stylish = require("jshint-stylish"),
	concat = require("gulp-concat"),
	rename = require("gulp-rename"),
	header = require("gulp-header"),
	phplint = require("./gulp-phplint"),
	less = require("gulp-less"),
	minifyCss = require("gulp-minify-css"),
	es = require("event-stream"),
*/

	/*
	* Vi hämtar också in package.json-filen. Notera att vi
	* *inte* behöver jiddra med någon json-reader som i
	* grunt!
	*/
	pkg = require("./package.json"),

	/*
	* Vi behöver inte sätta upp någon lokal variabel
	* för var javascriptfilerna ligger, eftersom
	* samma source skickas genom hela pipe-kedjan.
	* Vi sätter däremot upp en Banner-variabel eftersom
	* vi vill ha samma banner på minifierad CSS och JS,
	* och de får olika pipe-kedjor.
	*/

	banner = ["/**",
		"* <%= pkg.name %>",
		"* <%= pkg.description %>",
		"* Version: v<%= pkg.version %>",
		"* Last modified: <%= formatteddate %>",
		"*/",
		""].join("\n");

/*
* Här sätter vi upp en gulp-task. På samma sätt som i
* grunt kan man skapa flera tasks och sedan välja
* vilken man vill köra när man kallar på gulp.
* Default är den som körs om man inte specificerar
* någon task.
*/
gulp.task("js", function() {
	
	var b = browserify({
		entries: './build/js/index.js',
		debug: true
	});

	return b.bundle()
		.pipe(source('script.js'))
		.pipe(buffer())
		// .pipe(sourcemaps.init({loadMaps: true}))
		// 	.pipe(uglify())
		// 	.on('error', gutil.log)
		// .pipe(sourcemaps.write('./build/js'))
		.pipe(gulp.dest('./js/'));
		/*
		// Dessa pipas in i jshint...
		.pipe(jshint())
		// ...som pipar js-filerna, och resultatet av
		// hintningen vidare till jshint.reporter som 
		// skriver ut felen (om det finns några)
		// snyggt och prydligt.
		.pipe(jshint.reporter("jshint-stylish"))
		// js-filerna pipas sedan vidare till concat,
		// som sätter ihop dem till en enda.
		.pipe(concat("script.js"))
		// Denna hopsatta textsträng pipas till
		// gulp.dest som sparar den till disk.
		.pipe(gulp.dest("./js/"))
		// Streamen finns dock fortfarande kvar,
		// nästa steg är att uglify:a den
		.pipe(uglify({ mangle: false }))
		// Vi vill lägga till en banner till filen,
		// och den ska vara först, därför använder
		// vi header (footer finns också om man vill
		// lägga bannern sist)
		.pipe(header(banner, { pkg: pkg, formatteddate: new Date().toISOString() }))
		// Nu vill vi spara streamen under annat
		// namn, så vi måste döpa om den,
		// därför pipar vi den till rename
		.pipe(rename("script.min.js"))
		// och pipar den till gulp.dest igen,
		// som sparar ner den under nya namnet
		.pipe(gulp.dest("./js/"));
		*/
});

//gulp.task("css", function() {
	/*
	* Eftersom Gulp hela tiden jobbar med streams måste vi
	* hitta ett sätt att kombinera flera streams. Detta kan vi
	* göra med event-stream.merge.
	*/
//	return es.merge(
		/*
		* I detta fall blir det en tvåstegsraket, eftersom vi
		* först vill köra LESS på våra less-filer och sedan
		* kombinera dessa med redan befintliga css-filer i
		* build/css. Kanske är detta ett fullständigt onödigt
		* steg, men vafan.
		*/ 
		// Börja med att köra LESS på de olika less-filerna...
//		gulp.src(["./libs/bootstrap/less/bootstrap.less",
//			"./libs/bootstrap/less/theme.less",
//			"./build/less/style.less"])
//		.pipe(less()),
		// ...och lägg ihop dessa med de redan befintliga css-filerna
//		gulp.src("./build/css/**/*.css")
//	)
	// Nu har vi en samling css-filer i streamen, vi börjar med att
	// lägga ihop dem till en enda
//	.pipe(concat("style.css"))
	// Vi sparar den fysiskt i ./css
//	.pipe(gulp.dest("./css/"))
	// ...sedan tar vi streamen och minifierar den
//	.pipe(minifyCss())
	// ...och lägger till samma banner som tidigare
//	.pipe(header(banner, { pkg: pkg, formatteddate: new Date().toISOString() }))
	// ...döper om den till style.min.css
//	.pipe(rename("style.min.css"))
	// ...och sparar den minifierade, headers-tillagda filen i ./css/
//	.pipe(gulp.dest("./css/"))
//});
gulp.task("default", ["js"]);
