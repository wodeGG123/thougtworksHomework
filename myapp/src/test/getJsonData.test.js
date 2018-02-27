var getData = require('./getJsonData.js');
var expect = require('chai').expect;

describe("获取json数据测试",function(){

    it("返回值应该是object",function(){
        expect(getData(0)).to.be.a('object')
    })
    it("返回值datas属性长度应该为4",function(){
        expect(getData(0).datas.length).to.be.equal(4)
    })
    it("返回值datas属性长度应该为2",function(){
        expect(getData(1).datas.length).to.be.equal(2)
    })
    it("返回值datas属性长度应该为2",function(){
        expect(getData(2).datas.length).to.be.equal(2)
    })
    
})