'use strict'

const fs = require('fs')
const path = require('path')
const paths = require('./paths')

// Make sure that including paths.js after env.js will read .env variables.
delete require.cache[require.resolve('./paths')]

const NODE_ENV = process.env.NODE_ENV
const DEFAULT_DEV_PLATFORM = 'desktop'

const BRAND_CODE = process.argv[2]
let APP_PLATFORM = process.env.APP_PLATFORM

if (NODE_ENV === 'development' && !APP_PLATFORM) {
    APP_PLATFORM = process.env.APP_PLATFORM = DEFAULT_DEV_PLATFORM
}

if (!NODE_ENV) {
    throw new Error('The NODE_ENV environment variable is required but was not specified.')
}

if (!BRAND_CODE || !APP_PLATFORM) {
    throw new Error('Target BRAND_CODE or APP_PLATFORM is required but was not specified.')
}

process.env.CDN_DOMAIN = process.env.ENABLE_CDN === 'true' ? 'https://xxxxxxxx.cloudfront.net' : ''

if (process.env.CDN_DOMAIN) {
    console.log(`Building files with CDN domain: ${process.env.CDN_DOMAIN}`)
}

const dotenvFiles = [
    `${paths.dotenv}.${NODE_ENV}`,
    paths.dotenv,
    `${paths.brandDotenv}.${NODE_ENV}`,
    paths.brandDotenv,
].filter(Boolean)

dotenvFiles.forEach((dotenvFile) => {
    if (fs.existsSync(dotenvFile)) {
        require('dotenv-expand')(
            require('dotenv').config({
                path: dotenvFile,
            }),
        )
    }
})

// We support resolving modules according to `NODE_PATH`.
// This lets you use absolute paths in imports inside large monorepos:
// https://github.com/facebook/create-react-app/issues/253.
// It works similar to `NODE_PATH` in Node itself:
// https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders
// Note that unlike in Node, only *relative* paths from `NODE_PATH` are honored.
// Otherwise, we risk importing Node.js core modules into an app instead of webpack shims.
// https://github.com/facebook/create-react-app/issues/1023#issuecomment-265344421
// We also resolve them to make sure all tools using them work consistently.
const appDirectory = fs.realpathSync(process.cwd())
process.env.NODE_PATH = (process.env.NODE_PATH || '')
    .split(path.delimiter)
    .filter((folder) => folder && !path.isAbsolute(folder))
    .map((folder) => path.resolve(appDirectory, folder))
    .join(path.delimiter)

// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in webpack configuration.
const REACT_APP = /^REACT_APP_/i

function getClientEnvironment(publicUrl) {
    let raw = Object.keys(process.env)
        .filter((key) => REACT_APP.test(key))
        .reduce(
            (env, key) => {
                env[key] = process.env[key]
                return env
            },
            {
                WDS_SOCKET_HOST: process.env.WDS_SOCKET_HOST,
                WDS_SOCKET_PATH: process.env.WDS_SOCKET_PATH,
                WDS_SOCKET_PORT: process.env.WDS_SOCKET_PORT,
                NODE_ENV: process.env.NODE_ENV || 'development',
                PUBLIC_URL: publicUrl,
                BRAND_CODE,
                APP_PLATFORM,
                CDN_DOMAIN: process.env.CDN_DOMAIN,
                BASE_NAME: APP_PLATFORM === 'mobile' ? '/m20' : '/d20',
            },
        )
    // Stringify all values so we can feed into webpack DefinePlugin
    const stringified = {
        'process.env': Object.keys(raw).reduce((env, key) => {
            env[key] = JSON.stringify(raw[key])
            return env
        }, {}),
    }

    raw = {
        ...raw,
        DEFAULT_BRAND_NAME: process.env.DEFAULT_BRAND_NAME,
        WEB_TITLE: process.env.WEB_TITLE,
        SEO_DESCRIPTION: process.env.SEO_DESCRIPTION,
    }

    return { raw, stringified }
}

module.exports = getClientEnvironment
