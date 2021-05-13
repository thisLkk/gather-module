'use strict'
const path = require('path');
const webpack = require('webpack');
// 压缩插件（Content-Encoding编码的压缩版的资源）
const CompressionWebpackPlugin = require('compression-webpack-plugin');
// proxy 方式的mock请求
let apiRewrite = require('./src/apiRewrite.js');
// 检测环境
const isProd = () => {
    return process.env.NODE_ENV === 'production';
}
// 处理路径
const resolve = (dir) => {
    return path.join(__dirname, './', dir);
}
const pluginsModule = () => {
    const plugins = [];
    // 若是不需要可以去掉，增加打包速度
    // if (isProd()) {
    //     plugins.push(
    //         new CompressionWebpackPlugin({
    //             filename: '[path].gz[query]',
    //             algorithm: 'gzip',
    //             test: new RegExp(
    //                 '\\.(' +
    //                 ['js', 'css'].join('|') +
    //                 ')$',
    //             ),
    //             threshold: 1024,
    //             minRatio: 0.8,
    //             cache: true
    //         })
    //     )
    // }

    return plugins;
}






module.exports = {
    assetsDir: 'static',
    publicPath: process.env.NODE_ENV === 'production'
    ? '/gather-module/'
    : '/',
    configureWebpack: () => ({
        resolve: {
            alias: {
                'variable': resolve('src/assets/css/variable.sass')
            }
        },
        plugins: pluginsModule()
    }),
    lintOnSave: false, // 关闭代码检查
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-plugin-px2rem')({
                        rootValue: 32,      // 新版本的是这个值
                        exclude: /node_modules/i // 解决mint-ui 样式变小问题
                    }),
                ]
            }
        }
    },
    pluginOptions: {
        mock: {
            entry: './mock/mock.js',
            debug: true
        }
    },
    devServer: {
        proxy: {
            '/proxy': {
                // 此处的本地端口可以通过portfinder模块做动态的
                target: 'http://localhost:8080',
                changeOrigin: true,
                pathRewrite: apiRewrite
            }
        }
    },
    pages: {
        index: {
            // page 的入口
            entry: 'src/main.js',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: '个人主页',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
    }
}