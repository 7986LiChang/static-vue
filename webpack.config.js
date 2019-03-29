const path = require('path');
module.exports = {
    entry: './src/main.js', // 入口文件的配置项
    output:{ // 出口文件的配置项
        path: path.resolve(__dirname, './dist'), // 打包的路径文件
        publicPath: "/dist",
        filename: 'bundle.js' // 打包的文件名称
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader','css-loader', 'sass-loader']
            },
            {
                test: /\.sass$/,
                use: ['style-loader','css-loader', 'sass-loader?indentedSyntax']
            }
        ]
    }
};