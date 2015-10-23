# Gulp-template

This is the new and improved gulpfile adjusted for use in assorted projects.
Local environment variables are set in the file `environment.json`, which by default is gitignored. An example configuration file is included as `environment-default.json`, remember to adjust and rename accordingly.

Browsersync is included. It is by default set to proxy a server at http://localhost:9999. The config for this is in `environment.json`, change this to match your local dev environment. If you want to use Browsersync's internal server and not proxy another server, just remove the `proxy` entry in environment.json.

This is a work in progress.

## Setup

### Wordpress/Umbraco

* Clone `gulp-template` to the site root. Copy all files/directories in it (except for `.git` and `.gitignore`) to the root folder, then delete the `gulp-template` folder.

* Rename `environment-default.json` to `environment.json`


* Adjust paths in `environment.json` to match your theme/site. `publicdirectory` should be set to the path to your theme in Wordpress and to `'.'` in Umbraco, you can leave `jsdirectory` and `cssdirectory` as they are.

* Change proxy address to match the address where you reach the Wordpress/Umbraco installation.

* Run `gulp vendors` - this will parse and concatenate the files referenced in `build/less/vendor.css`

* Run `gulp dev` - this will parse and concatenate the javascript files in `build/js`, as well as the dependencies these may have from installed modules. Common modules (i e vendors) will be separated into their own chunk and saved as `vendors.js`, whereas the app/site specific js will be saved into `bundle.js`. This task will also start the Browsersync service and open a web browser pointing to it.

## Configuration
`TODO: Write stuff`

## Gulp tasks
### gulp dev
* Concatinates vendor LESS & JS files on startup.
* Watches dev LESS & JS at given paths (`environment.json js_build_path` for JS files, `environment.json less_dev_path` for LESS vendor files)
* Runs browsersync
* Outputs to `vendors.less`, `style.less`, `vendors.js` and `bundle.js`
If no `environment.json proxy` address is given, Browsersync will start it's own server.

### gulp vendors
* Concatinates vendor LESS files
* Concationates all JS files.
* Outputs to `vendors.less`, `vendors.js` and `bundle.js`

### gulp dist
* Concatinates and minifies vendor LESS files
* Concationates and minifies all JS files.
* Outputs to `vendors.less`, `style.less` and `bundle.js`

### gulp template
* Generates an index.html file from the `.mustache`
 file in `templates`

### gulp default or gulp help
Gives you some help