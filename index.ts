import * as find from 'find'
import * as fileinfo from 'filenameinfo'
import * as Promise from 'bluebird'
import * as async from 'async'
import { uniqueid } from 'unicoid'

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
  uid: string
}
interface IMediaFileMeta {

}
export function list(path: string, config?: IMediaFileInfoConf) {

  function createuid(array) {
    let exists = false
    const uid = uniqueid(8)
    for (let i = 0; i < array.length; i++) {
      if (array[i].uid === uid) {
        exists = true
      }
    }

    if (exists) {
      return createuid(array)
    } else {
      return uid
    }

  }

  return new Promise<IMediaFileResp[]>((resolve, reject) => {
    find.file(path, function (files) {


      const media: IMediaFileResp[] = []



      for (let i = 0; i < files.length; i++) {
        const m: any = fileinfo.filenameinfo(files[i])
        if (m.extensionFamily === 'video' || m.extensionFamily === 'audio') {


          m.uid = createuid(media)

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



    })
  })



}


