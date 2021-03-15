const glob = require('glob')
// const compress_images = require("compress-images");
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const path = require('path')
const fs = require('fs')

const isMobileImage = (filename) => filename.indexOf('/mobile') >= 0

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
                compression(file);
                errorImagesInfo.push(info)
            } else if (filesize > 300) {
                compression(file);
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
        console.log(`counter: `, errorImagesInfo.length);
        console.log(`The following images' size is too large:`)
        // errorImagesInfo.forEach(info => console.log(`${info.path} ${info.size.toFixed(0)}KB`))
        //process.exit(1)
    }
}

glob(`**/*.{jpg,png,gif,svg,jpeg,ico}`, {
    cwd: path.join(__dirname, '../'),
    ignore: ['**/build/**', '**/node_modules/**']
}, (err, files) => sizeChecking(files))

 const compression = async(imageFile) =>{
     let compressedImagePath = imageFile.split('/');
     compressedImagePath.pop();
     compressedImagePath = compressedImagePath.join('/');

    try {
        let list = [];
        list.push(imageFile)
        const oldSize = fs.statSync(imageFile).size / 1024;
        const compressedFile = await imagemin(list, {
            destination: `compressed/${compressedImagePath}`,
            plugins: [
                imageminJpegtran(),
                imageminPngquant({
                    quality: [0.3, 0.5]
                })
            ]
        });
        const newSize = fs.statSync(compressedFile[0].destinationPath).size / 1024;
        console.log(`${imageFile}: Reduced from ${oldSize} KB to ${newSize} KB`);

      } catch (error) {

        console.log(error);
        process.exit(1)
    }
 }
