const path = require( 'path' );

// setup project root path
const projectRoot = path.dirname( path.dirname( __dirname ) );
const host = require( `${ projectRoot }/settings/server/config` ).host;
const browserlist = require( `${ projectRoot }/settings/browserlist/config` );

module.exports = {
    js: {
        frontend: {
            build: {
                src: [
                    `${ projectRoot }/static/src/js/**/*.js`,

                    // should use webpack to bundle
                    // `!${ projectRoot }/static/src/js/components/**/*.js`,
                ],
                dest: `${ projectRoot }/static/dist/js`,
            },
            lint: {
                rule: `${ projectRoot }/settings/lint/eslint/frontend.js`,
                src: [
                    `${ projectRoot }/static/src/js/**/*.js`,
                ],
                dest: `${ projectRoot }/static/src/js`,
            },
        },
        backend: {
            build: {
                src: [
                    `${ projectRoot }/**/*.js`,
                ],
                dest: `${ projectRoot }/build`,
            },
            lint: {
                rule: `${ projectRoot }/settings/lint/eslint/backend.js`,
                src: [
                    `${ projectRoot }/**/*.js`,
                    `!${ projectRoot }/node_modules/**/*.*`,
                    `!${ projectRoot }/static/**/*.js`,
                    `!${ projectRoot }/models/**/*.js`,
                ],
                dest: `${ projectRoot }`,
            },
        },
    },
    sass: {
        src: [
            `${ projectRoot }/static/src/sass/**/*.scss`,
            `!${ projectRoot }/static/src/sass/components/**/*.scss`,
        ],
        dest: `${ projectRoot }/static/dist/css`,
        static: {
            fileName: '_static.scss',
            data:
                '// this file is automatically generated\n' +
                '// don\'t change anthing because it will be overwrite next time\n' +
                `// change file content at ${ __dirname }/config.js\n` +
                `$staticRoot: '${ host }';\n` +
                `$projectRoot: '${ projectRoot }';\n` +
                '$font: \'#{ $staticRoot }/font\';\n' +
                '$image: \'#{ $staticRoot }/image\';\n' +
                '$sass: \'#{ $projectRoot }/static/src/sass\';',
            dest: `${ projectRoot }/static/src/sass/components/common`,
        },
    },
    pug: {
        src: [
            `${ projectRoot }/views/**/*.pug`,
        ],
    },
    browserlist,
    sourcemaps: {
        dest: '.',
    },
    projectRoot,
};
