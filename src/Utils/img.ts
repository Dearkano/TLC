const ExifImage = require('exif').ExifImage;
export async function needConvertImage(url: string): Promise<number> {
    return new Promise(resolve => {
        try {
            new ExifImage({ image: url }, function (error: any, exifData: any) {
                if (error) {
                    console.log('Error: ' + error.message);
                    resolve(0)
                } else {

                    console.log(exifData)
                    switch (exifData.image.Orientation) {
                        case 6:
                            resolve(1)
                        case 8:
                            resolve(2)
                            break;
                        default:
                            resolve(0)
                    }
                }
            });
        } catch (error) {
            console.log('Error: ' + error.message); resolve(0)
        }
    })
}
