const validateOptions = require('schema-utils')
const fs = require('fs')
const path = require('path')
const paths = require('../paths')

const PLUGIN_NAME = 'FallbackPathPlugin'

const BRAND = process.argv[2]

const schema = {
    type: 'object',
    properties: {
        fallbackDir: {
            type: 'string',
        },
    },
}

function isFallbackDirectory(requestPath) {
    const regex = /brands\/\w+\/(pages|assets|components)/gm
    return regex.test(requestPath)
}

function fallbackToTargetFile(absPath, fileType) {
    return fileType === 'module'
        ? !fs.existsSync(absPath + '.tsx') && !fs.existsSync(absPath + '.ts') && !fs.existsSync(absPath + '/index.tsx')
        : !fs.existsSync(absPath)
}

module.exports = class FallbackPathPlugin {
    constructor(options = {}) {
        validateOptions(schema, options, PLUGIN_NAME)
        this.options = options
    }

    apply(resolver) {
        resolver.hooks.resolve.tapAsync(PLUGIN_NAME, (request, resolveContext, callback) => {
            // check is related to brand path

            if (isFallbackDirectory(request.request)) {
                const targetHook = resolver.ensureHook('resolve')
                const absPath = request.request.replace('@brand', paths.appBrand)
                let targetRequest = request

                const fileType = /\.\w+$/gm.test(absPath) ? 'assets' : 'module'

                // if not found the target file, fallback to page folder
                if (fallbackToTargetFile(absPath, fileType)) {
                    // let modulePath = absPath.substring(absPath.indexOf(fileType) + 5)
                    let modulePath = absPath.split(`/brands/${BRAND}`)[1]

                    if (modulePath.charAt(0) !== '/' && modulePath.charAt(0) !== '\\') {
                        modulePath = '/' + modulePath
                    }

                    let targetPath = modulePath

                    if (fileType === 'module') {
                        if (fs.existsSync(path.join(this.options.fallbackDir, `.${modulePath}.tsx`))) {
                            targetPath = `.${modulePath}.tsx`
                        } else if (fs.existsSync(path.join(this.options.fallbackDir, `.${modulePath}.ts`))) {
                            targetPath = `.${modulePath}.ts`
                        } else {
                            targetPath = `.${modulePath}/index.tsx`
                        }
                    }

                    // let targetPath = `.${modulePath}.tsx`
                    // if (!fs.existsSync(path.join(this.options.fallbackDir, targetPath))) {
                    //     targetPath = `.${modulePath}/index.tsx`
                    // }

                    targetRequest = {
                        ...request,
                        request: path.join(this.options.fallbackDir, targetPath),
                    }

                    return resolver.doResolve(targetHook, targetRequest, null, resolveContext, callback)
                }
            }

            callback()
        })
    }
}
