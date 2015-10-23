# Gulp-template

This is the new and improved gulpfile adjusted for use in assorted projects.
Local environment variables are set in the file `environment.json`, which by default is gitignored. An example configuration file is included as `environment-default.json`, remember to adjust and rename accordingly.

Browsersync is included. It is by default set to proxy a server at http://localhost:9999. The config for this is in `environment.json`, change this to match your local dev environment. If you want to use Browsersync's internal server and not proxy another server, just remove the `proxy` entry in environment.json.

This is a work in progress.

## Usage
    npm i -g gulp
    npm i
    gulp dev

### Wordpress/Umbraco

* Clone `gulp-template` to the site root. Copy all files/directories in it (except for `.git` and `.gitignore`) to the root folder, then delete the `gulp-template` folder.

* Rename `environment-default.json` to `environment.json`

* Adjust paths in `environment.json` to match your theme/site. `publicdirectory` should be set to the path to your theme in Wordpress and to `'.'` in Umbraco, you can leave `jsdirectory` and `cssdirectory` as they are.

* Change proxy address to match the address where you reach the Wordpress/Umbraco installation.

* Run `gulp vendors` - this will parse and concatenate the files referenced in `build/less/vendor.css`

* Run `gulp dev` - this will parse and concatenate the javascript files in `build/js`, as well as the dependencies these may have from installed modules. Common modules (i e vendors) will be separated into their own chunk and saved as `vendors.js`, whereas the app/site specific js will be saved into `bundle.js`. This task will also start the Browsersync service and open a web browser pointing to it.

## Configuration 

### environment.json

`environment`: unused, will be used later

`proxy`: What address to proxy against

`port`: What port to use on local server

### package.json

(in addition to standard dependency stuff)

#### JS
* `js_vendors`: Array of vendor names to include in solution
* `js_vendor_path`: Array of custom paths to vendor files
*(Default js_vendor_path values are web_components, node_modules and bower_components)*
* `js_build_path`: Paths to JS work files
* `js_main`:  Filename of main JS file
* `js_watch_path`: Path of JS files to watch

#### LESS
* `less_build_path`: Paths to LESS work files
* `less_vendor_file`: Path to main vendor import file
* `less_main_file`: Filename of main LESS file
* `less_watch_path`: Path of LESS files to watch

#### Export paths
* `publicdirectory`: Directory to export to
* `cssdirectory`: CSS Subdirectory to export to
* `jsdirectory`: JS Subdirectory to export to

## Gulp tasks
#### gulp dev
* Concatenates vendor LESS & JS files on startup.
* Watches dev LESS & JS at given paths (`package.json js_build_path` for JS files, `package.json less_dev_path` for LESS vendor files)
* Runs browsersync
* Outputs to `vendors.less`, `style.less`, `vendors.js` and `bundle.js`
If no `environment.json proxy` address is given, Browsersync will start it's own server.

#### gulp vendors
* Concatenates vendor LESS files
* Concatenates all JS files.
* Outputs to `vendors.less`, `vendors.js` and `bundle.js`

#### gulp dist
* Concatenates and minifies vendor LESS files
* Concatenates and minifies all JS files.
* Outputs to `vendors.less`, `style.less` and `bundle.js`

#### gulp template
* Generates an html files from the `.mustache`
 files in `templates`

#### gulp default or gulp help
Gives you some help

## Adding external JS dependencies
### NPM
1. npm i -D [Package name]
2. Add package name to `package.json js_vendors array`
3. Run gulp vendors
4. Rock'n'Roll

### Other
1. Import to any of the `package.json js_vendor_path's`
2. Run gulp vendors
3. Rock'n'Roll
