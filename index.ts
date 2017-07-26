import * as dir from 'node-dir'
import * as fileinfo from 'filenameinfo'
import * as Promise from 'bluebird'
import * as async from 'async'

const getDuration = require('get-video-duration');
const ffmetadata = require("ffmetadata");


interface IMediaFileInfoConf {
    formats?: string[]
    exclude?: string[]
}
interface IMediaFileResp {
    meta: IMediaFileMeta
    duration: string
    path: string
    fullname: string
    name: string
    extension: string
    dir: string
    extensionFamily: string
    extensionType: string
}
interface IMediaFileMeta {

}
export function list(path: string, config?: IMediaFileInfoConf) {
    return new Promise<IMediaFileResp[]>((resolve, reject) => {

        dir.readFiles(__dirname, {}, function (err, content, next) {
            if (err) {
                reject(err)
            } else {
                next();
            }
        },
            function (err, files) {
                if (err) {
                    reject(err)
                } else {
                    const media: IMediaFileResp[] = []



                    for (let i = 0; i < files.length; i++) {
                        const m: any = fileinfo.filenameinfo(files[i])
                        if (m.extensionFamily === 'video' || m.extensionFamily === 'audio') {

                            media.push(m)

                        }

                    }



                    async.eachSeries(media, (m, cb) => {
                        getDuration(m.path).then((a) => {
                            m.duration = a
                            ffmetadata.read(m.path, function (err, data) {
                                if (err) {
                                    cb("Error reading metadata")
                                } else {
                                    m.meta = data
                                    cb()
                                };
                            });

                        }).catch((err) => {
                            cb(err)
                        })
                    }, (err) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(media)
                        }
                    })



                }
            });



    })


}