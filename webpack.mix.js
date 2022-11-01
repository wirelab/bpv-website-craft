const mix = require('laravel-mix');
require('dotenv').config();

const browserSyncProxy = process.env.MIX_BROWSERSYNC_PROXY === undefined ? 'http://localhost:1422/' : process.env.MIX_BROWSERSYNC_PROXY;
const useHTTPS = process.env.MIX_HTTPS === 'enabled';

// ============================================================= //
// Browsersync settings for both regular and HTTPS
// ============================================================= //
const browserSyncConfigGeneral = {
    injectChanges: false,
    notify: false,
    files: ['web/assets/css/{*,**/*}.css', 'web/assets/js/{*,**/*}.js', 'templates/{*,**/*}.twig']
}

const browserSyncConfig = {
    ...browserSyncConfigGeneral,
    proxy: browserSyncProxy,
    port: 1423,
    https: false,
    open: 'local',
};

const browserSyncConfigHTTPS = {
    ...browserSyncConfigGeneral,
    host: process.env.MIX_HTTPS_HOST,
    proxy: browserSyncProxy,
    https: {
        key: process.env.MIX_HTTPS_PATH_KEY,
        cert: process.env.MIX_HTTPS_PATH_CERT,
    },
    open: 'external'
};

// ============================================================= //
// Main mix setup
// ============================================================= //
mix.setPublicPath(path.normalize('./web'))
    .js('src/js/app.js', 'assets/js')
    .sass('src/scss/app.scss', 'assets/css')

    // Configure typescript
    .webpackConfig({
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "ts-loader",
                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            modules: [
                "node_modules",
                path.resolve(__dirname, 'src/ts')
            ],
            alias: {
                "@": path.resolve(__dirname, 'src/ts/'),
            },
            extensions: ["*", ".js", ".jsx", ".vue", ".ts", ".tsx"]
        }
    })

    // Copy folders
    .copy('src/favicon', 'web/assets/favicon')
    .copy('src/fonts', 'web/assets/fonts')
    .copy('src/icons', 'web/assets/icons')
    .copy('src/img', 'web/assets/img')
    .copy('src/logos', 'web/assets/logos')
    .copy('src/videos', 'web/assets/videos')

    // Add browsersync here
    .browserSync(useHTTPS ? browserSyncConfigHTTPS : browserSyncConfig)
    .version();

// Run a dev server if we run the serve command
if (process.env.SERVE === "true") {
    const Connect = require('gulp-connect-php');

    Connect.server({
        base: './web',
        port: 1422,
        keepalive: true
    });
}
