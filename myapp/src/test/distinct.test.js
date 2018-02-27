var distinct = require('./distinct.js');
var expect = require('chai').expect;

describe("去重测试",function(){

    it("返回值应该是Array",function(){
        expect(distinct([111,222,333,111])).to.be.a('Array')
    })
    it("返回值长度应该是3",function(){
        expect(distinct([111,222,333,111]).length).to.be.equal(3)
    })
    it.skip("应该等于 [111,222,333]",function(){
        expect(distinct([111,222,333,111])).to.be.deep.equal([111,222,333])
    })

})