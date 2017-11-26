"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require("chai");
var expect = chai.expect;
var medialist = require("../index");
describe('Main Medialist Test', function () {
    this.timeout(20000);
    it('generate a file list', function (done) {
        medialist.list(__dirname, { exclude: ['node_modules'], serverUri: { path: __dirname, uri: 'http://localhost:3000' } }).then(function (list) {
            console.log(list);
            expect(list).to.be.ok;
            expect(list).to.be.an('Array');
            done();
        }).catch(function (err) {
            done(new Error(err));
        });
    });
    it('element of the list contains the path as string', function (done) {
        medialist.list(__dirname, { exclude: ['node_modules'] }).then(function (list) {
            expect(list[0]).have.property('path').that.is.a('string');
            done();
        }).catch(function (err) {
            done(new Error(err));
        });
    });
});
