module.exports = {

    /*
        Do not edit here, edit in package.json instead.
        Paths resoled on runtime.
    */
    vendors: [],
    app_path: [],
    vendor_path: ['web_modules', 'node_modules', 'bower_components'], // Resolved on runtime. Added default bower_component
    vendors_unresolved: null,
    provided_plugins: null,

    // Internal vars
    node_modules: null,
    webpack: require('webpack'),
    app_watchpath: null,
    publicdirectory: null,
    mainfile: null,

    jscs_options: {
        emitErrors: true, // Make it beep!
        failOnHint: false, // Abort on error?
        requireCurlyBraces: [
            "if",
            "else",
            "for",
            "while",
            "do",
            "try",
            "catch"
        ],
        requireOperatorBeforeLineBreak: true,
        requireCamelCaseOrUpperCaseIdentifiers: true,
        maximumLineLength: {
            value: 80,
            allExcept: ["comments", "regex"]
        },
        validateIndentation: 4,
        validateQuoteMarks: "'",

        disallowMultipleLineStrings: true,
        disallowMixedSpacesAndTabs: true,
        disallowTrailingWhitespace: true,
        disallowSpaceAfterPrefixUnaryOperators: true,
        disallowMultipleVarDecl: true,
        disallowKeywordsOnNewLine: ["else"],

        requireSpaceAfterKeywords: [
          "if",
          "else",
          "for",
          "while",
          "do",
          "switch",
          "return",
          "try",
          "catch"
        ],
        requireSpaceBeforeBinaryOperators: [
            "=", "+=", "-=", "*=", "/=", "%=", "<<=", ">>=", ">>>=",
            "&=", "|=", "^=", "+=",

            "+", "-", "*", "/", "%", "<<", ">>", ">>>", "&",
            "|", "^", "&&", "||", "===", "==", ">=",
            "<=", "<", ">", "!=", "!=="
        ],
        requireSpaceAfterBinaryOperators: true,
        requireSpacesInConditionalExpression: true,
        requireSpaceBeforeBlockStatements: true,
        requireSpacesInForStatement: true,
        requireLineFeedAtFileEnd: true,
        requireSpacesInFunctionExpression: {
            beforeOpeningCurlyBrace: true
        },
        disallowSpacesInAnonymousFunctionExpression: {
            beforeOpeningRoundBrace: true
        },
        disallowSpacesInsideObjectBrackets: "all",
        disallowSpacesInsideArrayBrackets: "all",
        disallowSpacesInsideParentheses: true,

        disallowMultipleLineBreaks: true,
        disallowNewlineBeforeBlockStatements: true,
        disallowKeywords: ["with"],
        disallowSpacesInFunctionExpression: {
            beforeOpeningRoundBrace: true
        },
        disallowSpacesInFunctionDeclaration: {
            beforeOpeningRoundBrace: true
        },
        disallowSpacesInCallExpression: true,
        disallowSpaceAfterObjectKeys: true,
        requireSpaceBeforeObjectValues: true,
        requireCapitalizedConstructors: true,
        requireDotNotation: true,
        requireSemicolons: true,
        validateParameterSeparator: ", "
    },

    init: function() {

        var gutil = require('gulp-util'),
            path = require('path'),
            pkg = require('../environment.json');

        // Concat path to files
        this.vendor_path = this.vendor_path.concat(pkg.js_vendor_path);
        this.app_path = this.app_path.concat(pkg.js_build_path);
        this.vendors = this.vendors.concat(pkg.js_vendors);
        this.publicdirectory = pkg.publicdirectory;
        this.jsdirectory = pkg.jsdirectory;
        this.mainfile = '.' + pkg.js_build_path + pkg.js_main;
        this.provided_plugins = pkg.js_provided_plugins;
        return this;
    }
}.init();