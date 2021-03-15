'use strict'

const path = require('path')
const fs = require('fs')
const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)

const BRAND = process.argv[2]

const publicUrlOrPath = getPublicUrlOrPath(
    process.env.NODE_ENV === 'development',
    require(resolveApp('package.json')).homepage,
    `${process.env.CDN_DOMAIN || ''}/${process.env.APP_PLATFORM === 'desktop' ? 'd20' : 'm20'}`,
)

const moduleFileExtensions = [
    'web.mjs',
    'mjs',
    'web.js',
    'js',
    'web.ts',
    'ts',
    'web.tsx',
    'tsx',
    'json',
    'web.jsx',
    'jsx',
]

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
    const extension = moduleFileExtensions.find((extension) => fs.existsSync(resolveFn(`${filePath}.${extension}`)))

    if (extension) {
        return resolveFn(`${filePath}.${extension}`)
    }

    return resolveFn(`${filePath}.js`)
}

// config after eject: we're in ./config/
module.exports = {
    dotenv: resolveApp('.env'),
    brandDotenv: resolveApp(`src/brands/${BRAND}/.env`),
    appPath: resolveApp('.'),
    appBuild: resolveApp('build'),
    appPublic: resolveApp('public'),
    appHtml: resolveApp('public/index.html'),
    appIndexJs: resolveModule(resolveApp, 'src/index'),
    appPackageJson: resolveApp('package.json'),
    appSrc: resolveApp('src'),
    appTsConfig: resolveApp('tsconfig.json'),
    appJsConfig: resolveApp('jsconfig.json'),
    appProdTsConfig: resolveApp('tsconfig.prod.json'),
    yarnLockFile: resolveApp('yarn.lock'),
    testsSetup: resolveModule(resolveApp, 'src/setupTests'),
    proxySetup: resolveApp('src/setupProxy.js'),
    appNodeModules: resolveApp('node_modules'),
    brandPublic: resolveApp(`src/brands/${BRAND}/public`),
    appManifest: resolveApp(`public/manifest.json`),
    publicUrlOrPath,
}

module.exports.moduleFileExtensions = moduleFileExtensions
