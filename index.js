"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var find = require("find");
var fileinfo = require("filenameinfo");
var Promise = require("bluebird");
var async = require("async");
var unicoid_1 = require("unicoid");
var getFileSize = require('getfilesize');
var getDuration = require('get-video-duration');
var ffmetadata = require("ffmetadata");
function list(path, config) {
    function createuid(array) {
        var exists = false;
        var uid = unicoid_1.uniqueid(8);
        for (var i = 0; i < array.length; i++) {
            if (array[i].uid === uid) {
                exists = true;
            }
        }
        if (exists) {
            return createuid(array);
        }
        else {
            return uid;
        }
    }
    return new Promise(function (resolve, reject) {
        find.file(path, function (files) {
            var media = [];
            for (var i = 0; i < files.length; i++) {
                if (parseInt(getFileSize(files[i])) && parseInt(getFileSize(files[i])) > 0) {
                    var m = fileinfo.filenameinfo(files[i]);
                    if (m.extensionFamily === 'video' || m.extensionFamily === 'audio') {
                        m.uid = createuid(media);
                        if (config && config.serverUri && config.serverUri.path && config.serverUri.uri && m.path.split(config.serverUri.path).length > 1 && m.path.split(config.serverUri.path)[0] === '') {
                            m.uri = config.serverUri.uri + m.path.split(config.serverUri.path)[1];
                        }
                        media.push(m);
                    }
                }
            }
            async.eachSeries(media, function (m, cb) {
                getDuration(m.path).then(function (a) {
                    m.duration = a;
                    ffmetadata.read(m.path, function (err, data) {
                        if (err) {
                            cb("Error reading metadata");
                        }
                        else {
                            m.meta = data;
                            cb();
                        }
                        ;
                    });
                }).catch(function (err) {
                    cb(err);
                });
            }, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(media);
                }
            });
        }).error(function (err) {
            if (err) {
                reject(err);
            }
            else {
                reject('find error');
            }
        });
    });
}
exports.list = list;
