"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require("chai");
var expect = chai.expect;
var medialist = require("../index");
describe('Main Medialist Test', function () {
    this.timeout(20000);
    it('generate a file list', function (done) {
        medialist.list(__dirname, { exclude: ['node_modules'] }).then(function (list) {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJCQUE0QjtBQUM1QixJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFBO0FBRTFCLG9DQUFxQztBQUlyQyxRQUFRLENBQUMscUJBQXFCLEVBQUU7SUFFNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNuQixFQUFFLENBQUMsc0JBQXNCLEVBQUUsVUFBVSxJQUFJO1FBQ3JDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLElBQUk7WUFDL0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUE7WUFDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQzlCLElBQUksRUFBRSxDQUFBO1FBQ1YsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUMsR0FBRztZQUNULElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1FBQ3hCLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQyxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMsaURBQWlELEVBQUUsVUFBVSxJQUFJO1FBRWhFLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLElBQUk7WUFDL0QsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUE7WUFDekQsSUFBSSxFQUFFLENBQUE7UUFDVixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQyxHQUFHO1lBQ1QsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDeEIsQ0FBQyxDQUFDLENBQUE7SUFHTixDQUFDLENBQUMsQ0FBQztBQUVQLENBQUMsQ0FBQyxDQUFBIiwiZmlsZSI6InRlc3QvbWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNoYWkgZnJvbSAnY2hhaSdcbmNvbnN0IGV4cGVjdCA9IGNoYWkuZXhwZWN0XG5cbmltcG9ydCAqIGFzIG1lZGlhbGlzdCBmcm9tICcuLi9pbmRleCdcblxuXG5cbmRlc2NyaWJlKCdNYWluIE1lZGlhbGlzdCBUZXN0JywgZnVuY3Rpb24gKCkge1xuXG4gICAgdGhpcy50aW1lb3V0KDIwMDAwKVxuICAgIGl0KCdnZW5lcmF0ZSBhIGZpbGUgbGlzdCcsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgIG1lZGlhbGlzdC5saXN0KF9fZGlybmFtZSwgeyBleGNsdWRlOiBbJ25vZGVfbW9kdWxlcyddIH0pLnRoZW4oKGxpc3QpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGxpc3QpXG4gICAgICAgICAgICBleHBlY3QobGlzdCkudG8uYmUub2tcbiAgICAgICAgICAgIGV4cGVjdChsaXN0KS50by5iZS5hbignQXJyYXknKVxuICAgICAgICAgICAgZG9uZSgpXG4gICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIGRvbmUobmV3IEVycm9yKGVycikpXG4gICAgICAgIH0pXG4gICAgfSk7XG4gICAgaXQoJ2VsZW1lbnQgb2YgdGhlIGxpc3QgY29udGFpbnMgdGhlIHBhdGggYXMgc3RyaW5nJywgZnVuY3Rpb24gKGRvbmUpIHtcblxuICAgICAgICBtZWRpYWxpc3QubGlzdChfX2Rpcm5hbWUsIHsgZXhjbHVkZTogWydub2RlX21vZHVsZXMnXSB9KS50aGVuKChsaXN0KSA9PiB7XG4gICAgICAgICAgICBleHBlY3QobGlzdFswXSkuaGF2ZS5wcm9wZXJ0eSgncGF0aCcpLnRoYXQuaXMuYSgnc3RyaW5nJylcbiAgICAgICAgICAgIGRvbmUoKVxuICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICBkb25lKG5ldyBFcnJvcihlcnIpKVxuICAgICAgICB9KVxuXG5cbiAgICB9KTtcblxufSkiXX0=