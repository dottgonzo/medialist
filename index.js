"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dir = require("node-dir");
var fileinfo = require("filenameinfo");
var Promise = require("bluebird");
var async = require("async");
var getDuration = require('get-video-duration');
var ffmetadata = require("ffmetadata");
function list(path, config) {
    return new Promise(function (resolve, reject) {
        dir.readFiles(path, {}, function (err, content, next) {
            if (err) {
                reject(err);
            }
            else {
                next();
            }
        }, function (err, files) {
            if (err) {
                reject(err);
            }
            else {
                var media_1 = [];
                for (var i = 0; i < files.length; i++) {
                    var m = fileinfo.filenameinfo(files[i]);
                    if (m.extensionFamily === 'video' || m.extensionFamily === 'audio') {
                        media_1.push(m);
                    }
                }
                async.eachSeries(media_1, function (m, cb) {
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
                        resolve(media_1);
                    }
                });
            }
        });
    });
}
exports.list = list;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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c291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZGlyIGZyb20gJ25vZGUtZGlyJ1xuaW1wb3J0ICogYXMgZmlsZWluZm8gZnJvbSAnZmlsZW5hbWVpbmZvJ1xuaW1wb3J0ICogYXMgUHJvbWlzZSBmcm9tICdibHVlYmlyZCdcbmltcG9ydCAqIGFzIGFzeW5jIGZyb20gJ2FzeW5jJ1xuXG5jb25zdCBnZXREdXJhdGlvbiA9IHJlcXVpcmUoJ2dldC12aWRlby1kdXJhdGlvbicpO1xuY29uc3QgZmZtZXRhZGF0YSA9IHJlcXVpcmUoXCJmZm1ldGFkYXRhXCIpO1xuXG5cbmludGVyZmFjZSBJTWVkaWFGaWxlSW5mb0NvbmYge1xuICAgIGZvcm1hdHM/OiBzdHJpbmdbXVxuICAgIGV4Y2x1ZGU/OiBzdHJpbmdbXVxufVxuaW50ZXJmYWNlIElNZWRpYUZpbGVSZXNwIHtcbiAgICBtZXRhOiBJTWVkaWFGaWxlTWV0YVxuICAgIGR1cmF0aW9uOiBzdHJpbmdcbiAgICBwYXRoOiBzdHJpbmdcbiAgICBmdWxsbmFtZTogc3RyaW5nXG4gICAgbmFtZTogc3RyaW5nXG4gICAgZXh0ZW5zaW9uOiBzdHJpbmdcbiAgICBkaXI6IHN0cmluZ1xuICAgIGV4dGVuc2lvbkZhbWlseTogc3RyaW5nXG4gICAgZXh0ZW5zaW9uVHlwZTogc3RyaW5nXG59XG5pbnRlcmZhY2UgSU1lZGlhRmlsZU1ldGEge1xuXG59XG5leHBvcnQgZnVuY3Rpb24gbGlzdChwYXRoOiBzdHJpbmcsIGNvbmZpZz86IElNZWRpYUZpbGVJbmZvQ29uZikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxJTWVkaWFGaWxlUmVzcFtdPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICAgICAgZGlyLnJlYWRGaWxlcyhwYXRoLCB7fSwgZnVuY3Rpb24gKGVyciwgY29udGVudCwgbmV4dCkge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChlcnIsIGZpbGVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1lZGlhOiBJTWVkaWFGaWxlUmVzcFtdID0gW11cblxuXG5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbTogYW55ID0gZmlsZWluZm8uZmlsZW5hbWVpbmZvKGZpbGVzW2ldKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG0uZXh0ZW5zaW9uRmFtaWx5ID09PSAndmlkZW8nIHx8IG0uZXh0ZW5zaW9uRmFtaWx5ID09PSAnYXVkaW8nKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZWRpYS5wdXNoKG0pXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG5cblxuXG4gICAgICAgICAgICAgICAgICAgIGFzeW5jLmVhY2hTZXJpZXMobWVkaWEsIChtLCBjYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0RHVyYXRpb24obS5wYXRoKS50aGVuKChhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbS5kdXJhdGlvbiA9IGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZm1ldGFkYXRhLnJlYWQobS5wYXRoLCBmdW5jdGlvbiAoZXJyLCBkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNiKFwiRXJyb3IgcmVhZGluZyBtZXRhZGF0YVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbS5tZXRhID0gZGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2IoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2IoZXJyKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSwgKGVycikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUobWVkaWEpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG5cblxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cblxuXG4gICAgfSlcblxuXG59Il19