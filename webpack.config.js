const path = require('path');

const config = {
    mode:'none',
    entry: './index.ts',
    devtool: 'source-map',
    resolve: {
        extensions: [
            '.js',
            '.jsx',
            '.json',
            '.ts',
            '.tsx'
        ]
    },
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, 'dist'),
        filename: 'index.js',
    },
    target: 'node',
     module: {
         rules: [
             {
                 test: /\.ts$/,
                 use: 'ts-loader'
             }
         ]
     }
};


module.exports = config;