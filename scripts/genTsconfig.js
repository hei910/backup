const fs = require('fs')
const paths = require('../config/paths')

const BRAND = process.argv[2]

const baseTsconfig = JSON.parse(fs.readFileSync(paths.appProdTsConfig, 'utf8'))

const brand = [`src/brands/${BRAND}/*`, ...baseTsconfig.compilerOptions.paths['@brand/*']]
const tsPaths = {
    ...baseTsconfig.compilerOptions.paths,
    '@brand/*': brand,
}

const devTsconfig = {
    extends: paths.appProdTsConfig,
    compilerOptions: {
        paths: tsPaths,
    },
}

fs.writeFileSync(paths.appTsConfig, JSON.stringify(devTsconfig, null, 4), 'utf8', function (err, data) {
    if (err) return console.log(err)
})
