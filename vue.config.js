module.exports = {
    chainWebpack:config => {
        config.optimization.minimize(true);
        config.optimization.splitChunks({
            chunks:'all'
        })
    },
    configureWebpack:{
        externals:{
            'axios':'axios',
        }
    },
    productionSourceMap:false,
}