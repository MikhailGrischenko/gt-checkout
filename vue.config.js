const PrettierPlugin = require("prettier-webpack-plugin");
const path = require('path');
// const postcssPresetEnv = require("postcss-preset-env");

module.exports = {
    filenameHashing: false,
    configureWebpack: {
        output: {
            filename: "js/checkout.js",
        },
        optimization: {
            splitChunks: false,
        },
        plugins: [
            new PrettierPlugin({
                printWidth: 120,
                tabWidth: 4,
                useTabs: false,
                semi: true,
                trailingComma: "all",
                bracketSpacing: false,
                arrowParens: "avoid",
                htmlWhitespaceSensitivity: "ignore",
            }),
        ],
    },
    css: {
        loaderOptions: {
            // less: {
            //     globalVars: {
            //         "screen__gta-phone-s": "240px",
            //         "screen__gta-phone-m": "360px",
            //         "screen__gta-tablet-s": "460px",
            //         "screen__gta-tablet-m": "768px",
            //
            //         "screen__gta-desktop-xs": "1056px",
            //         "screen__gta-desktop-s": "1152px",
            //         "screen__gta-desktop-m": "1248px",
            //         "screen__gta-desktop-l": "1344px",
            //         "screen__gta-desktop-xl": "1440px",
            //     },
            // },
            // postcss: {
            //     plugins: {
            //         postcssPresetEnv: {
            //             stage: 2,
            //             browserslist: {
            //                 production: [
            //                     "> 1%",
            //                     "last 2 versions",
            //                     "not ie <= 8",
            //                 ],
            //                 development: [
            //                     "> 1%",
            //                     "last 2 versions",
            //                     "not ie <= 8",
            //                 ],
            //             },
            //             autoprefixer: {
            //                 grid: true,
            //             },
            //             // importFrom: [
            //             //     "./variables/variables.pcss",
            //             //     "./variables/variables-screen.pcss",
            //             //     "./variables/variables-color.pcss",
            //             //     "./variables/variables-grid.pcss",
            //             // ],
            //             exportTo: [
            //                 "css/checkout.css",
            //                 "js/checkout.js",
            //             ],
            //             features: {
            //                 'nesting-rules': true,
            //                 'custom-media-queries': true,
            //                 'color-mod-function': true,
            //                 'color-functional-notation': true,
            //                 'font-variant-property': true,
            //                 'all-property': true,
            //                 'any-link-pseudo-class': true,
            //                 'matches-pseudo-class': true,
            //                 'not-pseudo-class': true,
            //                 'overflow-wrap': true,
            //                 'attribute case insensitive': true,
            //                 'system-ui': true
            //             }
            //         },
            //     },
            // },
        },
    },
    chainWebpack: config => {
        config.plugin("extract-css")
            .tap(_ => [
                {
                    filename: "css/checkout.css",
                },
            ]);
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
        types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)));
    },
};


function addStyleResource (rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(__dirname, './variables/variables.less'),
            ],
        })
}