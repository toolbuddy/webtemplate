const path = require( 'path' );

const projectRoot = path.dirname( path.dirname( __dirname ) );
const jsSrcRoot = path.resolve( projectRoot, 'static/src/js' );
const jsDistRoot = path.resolve( projectRoot, 'static/dist/js' );
const staticRoot = path.resolve( projectRoot, 'static' );
const devMode = true;

/* Process.env.NODE_ENV !== 'production'*/

module.exports = {
    devtool: devMode ? 'inline-sourcemap' : null,
    mode:    devMode ? 'development' : 'production',
    entry:   {
        // Route `about`
        'about/honor':    path.resolve( jsSrcRoot, 'about/honor.js' ),
        'about/intro':    path.resolve( jsSrcRoot, 'about/intro.js' ),
        'about/location': path.resolve( jsSrcRoot, 'about/location.js' ),
        'about/members':  path.resolve( jsSrcRoot, 'about/members.js' ),
        'about/teacher':  path.resolve( jsSrcRoot, 'about/teacher.js' ),
        'about/teachers': path.resolve( jsSrcRoot, 'about/teachers.js' ),

        // Route `announcement`
        'announcement/activity':      path.resolve( jsSrcRoot, 'announcement/activity.js' ),
        'announcement/administrator': path.resolve( jsSrcRoot, 'announcement/administrator.js' ),
        'announcement/all':           path.resolve( jsSrcRoot, 'announcement/all.js' ),
        'announcement/announcement':  path.resolve( jsSrcRoot, 'announcement/announcement.js' ),
        'announcement/recruitment':   path.resolve( jsSrcRoot, 'announcement/recruitment.js' ),
        'announcement/speech':        path.resolve( jsSrcRoot, 'announcement/speech.js' ),

        // Route `home`
        'home/index': path.resolve( jsSrcRoot, 'home/index.js' ),

        // Route `research`
        'research/awards':       path.resolve( jsSrcRoot, 'research/awards.js' ),
        'research/conferences':  path.resolve( jsSrcRoot, 'research/conferences.js' ),
        'research/groups':       path.resolve( jsSrcRoot, 'research/groups.js' ),
        'research/labs':         path.resolve( jsSrcRoot, 'research/labs.js' ),
        'research/publications': path.resolve( jsSrcRoot, 'research/publications.js' ),

        // Route `resource`
        'resource/fix':       path.resolve( jsSrcRoot, 'resource/fix.js' ),
        'resource/ieet':      path.resolve( jsSrcRoot, 'resource/ieet.js' ),
        'resource/law':       path.resolve( jsSrcRoot, 'resource/law.js' ),
        'resource/rent':      path.resolve( jsSrcRoot, 'resource/rent.js' ),
        'resource/resources': path.resolve( jsSrcRoot, 'resource/resources.js' ),

        // Route `student`
        'student/college':       path.resolve( jsSrcRoot, 'student/college.js' ),
        'student/course':        path.resolve( jsSrcRoot, 'student/course.js' ),
        'student/international': path.resolve( jsSrcRoot, 'student/international.js' ),
        'student/master':        path.resolve( jsSrcRoot, 'student/master.js' ),
        'student/phd':           path.resolve( jsSrcRoot, 'student/phd.js' ),
        'student/scholarship':   path.resolve( jsSrcRoot, 'student/scholarship.js' ),
    },
    output: {
        path:     jsDistRoot,
        filename: '[name].min.js',
    },
    context: staticRoot,
    target:  'web',
    resolve: {
        alias: {
            pugComponent:   path.resolve( staticRoot, 'src/pug/components' ),
            cssComponent:   path.resolve( staticRoot, 'dist/css' ),
            jsComponent:    path.resolve( staticRoot, 'src/js/components' ),
            imageComponent: path.resolve( staticRoot, 'src/image' ),
        },
    },
    module:  {
        rules: [
            {
                test: /\.css$/,
                use:  [
                    // Extract CSS file.
                    {
                        loader:    'style-loader',
                        options: {
                            sourceMap: true,
                        },
                    },

                    // The `css-loader` interprets `@import` and `url()` like `import/require()` and will resolve them.
                    {
                        loader:  'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.pug$/,
                use:  [
                    // Extract CSS file.
                    {
                        loader:  'pug-loader',
                    },
                ],
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/,
                use:  [
                    'url-loader',
                ],
            },
        ],
    },
};
