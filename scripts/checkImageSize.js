const glob = require('glob')
const path = require('path')
const fs = require('fs')
// const { exec } = require('child_process');

const isMobileImage = (filename) => filename.indexOf('/mobile') >= 0

// const checkAll = process.env.CHECK_ALL === 'true'

const sizeChecking = (files) => {
    const errorImagesInfo = []

    files.forEach(file => {
        const stat = fs.statSync(file)
        const filesize = stat.size / 1024
        const info = {
            path: file,
            size: filesize
        }

        if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')) {

            if (isMobileImage(file) && filesize > 150) {
                errorImagesInfo.push(info)
            } else if (filesize > 300) {
                errorImagesInfo.push(info)
            }
        }

        if (file.endsWith('.svg') && filesize > 40) {
            errorImagesInfo.push(info)
        }

        if (file.endsWith('.ico') && filesize > 20) {
            errorImagesInfo.push(info)
        }
    })

    if (errorImagesInfo.length > 0) {
        console.log(`The following images' size is too large:`)
        errorImagesInfo.forEach(info => console.log(`${info.path} ${info.size.toFixed(0)}KB`))
        process.exit(1)
    }
}

// if (checkAll) {
glob(`**/*.{jpg,png,gif,svg,jpeg,ico}`, {
    cwd: path.join(__dirname, '../'),
    ignore: ['**/build/**', '**/node_modules/**']
}, (err, files) => sizeChecking(files))
// } else {
//     exec('git status -s', (err, stdout, stderr) => {
//         const files = stdout.split('\n').map(fileEntry => fileEntry.replace(' M', '').replace('??', '').replace(/ /g, '')).filter(Boolean).map(entry => path.join(__dirname, '../', entry))
//         sizeChecking(files)
//     })
// }
