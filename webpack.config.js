const path = require('path');

const libraryName = 'angular-test-helpers';

module.exports = {
    entry: [
        path.resolve(__dirname, 'src/angular.ts'),
        path.resolve(__dirname, 'src/dom.ts'),
        path.resolve(__dirname, 'src/ngrx.ts')
    ],
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: `${libraryName}.js`,
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }
        ],
        // rules: [
        //     {
        //         test: /\.ts$/,
        //         enforce: 'pre',
        //         loader: 'tslint-loader',
        //         exclude: /node_modules/,
        //         options: {
        //             tslint: {
        //                 // emitErrors: true,
        //                 // failOnHint: true
        //             }
        //         }
        //     }
        // ]
    },
    resolve: {
        modules: [
            path.resolve(__dirname, 'src')
        ],
        extensions: ['.js', '.ts', '.jsx', '.tsx']
    },
    externals: [
        /@angular\/.+$/,
        /@ngrx\/.+$/,
        /rxjs\/.+$/,
        'lodash'
    ],
    plugins: []
};
