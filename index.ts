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
  serverUri?: { path: string, uri: string }
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
    try {
      find.file(path, function (files) {


        const media: IMediaFileResp[] = []



        for (let i = 0; i < files.length; i++) {
          const m: any = fileinfo.filenameinfo(files[i])
          if (m.extensionFamily === 'video' || m.extensionFamily === 'audio') {


            m.uid = createuid(media)

            if (config && config.serverUri && config.serverUri.path && config.serverUri.uri && m.path.split(config.serverUri.path).length > 1 && m.path.split(config.serverUri.path)[0] === '') {
              m.uri = config.serverUri.uri + m.path.split(config.serverUri.path)[1]
            }


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

    } catch (err) {

      reject(err)

    }

  })



}


