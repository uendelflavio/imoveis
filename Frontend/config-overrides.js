const rewireAliases = require('react-app-rewire-aliases');
const { paths } = require('react-app-rewired');
const path = require('path');

/* config-overrides.js */
module.exports = function override(config, env) {
    config = rewireAliases.aliasesOptions({
        '@components': path.resolve(__dirname, `${paths.appSrc}/components/`)
    })(config, env);
    return config;
}

module.exports = function override(webpackConfig) {
    webpackConfig.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto"
    });

    return webpackConfig;
}