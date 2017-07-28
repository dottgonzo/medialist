import * as chai from 'chai'
const expect = chai.expect

import * as medialist from '../index'



describe('Main Medialist Test', function () {

    this.timeout(20000)
    it('generate a file list', function (done) {
        medialist.list(__dirname, { exclude: ['node_modules'],serverUri:{path:__dirname,uri:'http://localhost:3000'} }).then((list) => {
            console.log(list)
            expect(list).to.be.ok
            expect(list).to.be.an('Array')
            done()
        }).catch((err) => {
            done(new Error(err))
        })
    });
    it('element of the list contains the path as string', function (done) {

        medialist.list(__dirname, { exclude: ['node_modules'] }).then((list) => {
            expect(list[0]).have.property('path').that.is.a('string')
            done()
        }).catch((err) => {
            done(new Error(err))
        })


    });

})