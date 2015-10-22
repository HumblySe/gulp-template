'use strict';
var config = require('./config'),
    exclude_paths = new RegExp(config.vendors.concat('webpack').join("|")); // Paths pointing to libraries. Added webpack for cache folder

module.exports = {

    context: __dirname,

    entry: {
        main: '../build/js/main.js',
        vendors: config.vendors
    },

    output: {
        path: config.publicdirectory + config.jsdirectory,
        filename: "bundle.js"
    },

    resolve: {
        modulesDirectories: config.vendor_path
    },

    jscs: {
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

    module: {
        preLoaders: [{
            test:    /\.js$/,
            exclude: exclude_paths,
            loader: 'jscs-loader'
        }],

        loaders: [
            {
                test: /\.js$/,
                exclude: exclude_paths, // Exclude all vendors
                loaders: ['babel-loader']
            }
        ]
    },

    plugins: [
        new config.webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new config.webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
    ]
};