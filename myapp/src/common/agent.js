import React, { Component } from 'react';
import { Row, Col,   Media, Popover, OverlayTrigger} from 'react-bootstrap'
import _ from 'lodash'
var FA = require('react-fontawesome')


class Agent extends Component{
    static defaultProps={
    }
    constructor(props){
        super(props)
        this.state = {
            datas:false,
            summary:false,
            history:false,
            //agent top button
            type:{
                datas: [
                    {
                        name:'All',
                        act:true
                    },
                    {
                        name:'Physical',
                        act:false
                    },
                    {
                        name:'Virtual',
                        act:false
                    },
                ],
                act:0
            }           
        }
    }
    componentWillMount(){
        this.getDatas(0);
    }
    //数组去重
    distinct(obj){
        var arr = obj,
        result = [],
        i,
        j,
        len = arr.length;
        for(i = 0; i < len; i++){
            for(j = i + 1; j < len; j++){
                if(arr[i] === arr[j]){
                    j = ++i;
                }
            }
            result.push(arr[i]);
        }
        return result;
    }
    addResources(index,data){
        if(data.trim() == '')return false;                
        var _datas = _.cloneDeep(this.state.datas);
        var _resources = _datas[index].resources;
        var _resources_add = data.split(',');
        _resources = _resources.concat(_resources_add);
        _resources = this.distinct(_resources);
        _datas[index].resources = _resources;
        this.setState({
            datas:_datas
        })
    }
    deletResources(index1,index2){
        var _datas = _.cloneDeep(this.state.datas)
        var _resources = [];
        _datas[index1].resources.map((obj,index)=>{
            if(index2 !== index){
                _resources.push(obj)
            }
            return false
        })
        _datas[index1].resources = _resources;
        //更新state.datas
        this.setState({
            datas:_datas
        })
    }
    //get agent datas
    getDatas(type){
        var data = {}
        var _type = _.cloneDeep(this.state.type);
        switch(type){
            case 0: data = require('../data/all.json');break;
            case 1: data = require('../data/physical.json');break;
            case 2: data = require('../data/virtual.json');break;
            default:break;
        }        
        if(data){
            _type.datas[_type.act].act = false;
            _type.datas[type].act = true;            
            _type.act = type;
            this.setState({
                datas:data.datas,
                summary:data.summary,
                history:data.history,
                type:_type
            })
        }
    }
    render(){
        return (<div className="tab-content-in">
        <div className="tab-content-nav">
          <span>Agents</span>
          {
              this.state.type&&this.state.type.datas.map((obj,index)=>{
                  return (<button className={obj.act?'act':''} key={index} onClick={()=>{this.getDatas(index)}}>{obj.name}</button>)
              })
          }
        </div>
        <div>
          <Row>
            <Col className="tab-content-left" md={9}>
                <AgentItem addResources={(index,data)=>{this.addResources(index,data)}} deleteResources={(index1,index2)=>{this.deletResources(index1,index2)}} datas={this.state.datas} />
            </Col>
            <Col className="tab-content-right" md={3}>
                <div className="tab-content-right-item">
                    <h5>Summary</h5>
                    <div>
                      <Row>
                        <Col className="tab-content-right-item-col" sm={6} md={6}>building</Col>
                        <Col className="tab-content-right-item-col" sm={6} md={6}>{this.state.summary&&this.state.summary.building}</Col>
                      </Row>
                      <Row>
                        <Col className="tab-content-right-item-col" sm={6} md={6}>idel</Col>
                        <Col className="tab-content-right-item-col" sm={6} md={6}>{this.state.summary&&this.state.summary.idle}</Col>
                      </Row>
                    </div>
                </div>
                <div className="tab-content-right-item">
                    <h5>History</h5>
                    <div className="history-div">
                        {this.state.history&&this.state.history.map((obj,index)=>{
                            return (<Row key={index}>
                                <Col className="tab-content-right-item-col" md={12}>{obj}</Col>
                              </Row>)
                        })}
                    </div>
                </div>
            </Col>
          </Row>
        </div>        
    </div>)
    }

}
//Strip-component
class AgentItem extends Component{
    static defaultProps={       
    }
    constructor(props){
        super(props)
        this.state = {
            value:''
        }
    }
    handleAdd(index){
        this.props.addResources(index,this.state.value);
        this.closePop()
    }
    closePop(){
        document.getElementById('root').click()
        this.celarVal()
    }
    celarVal(){
        this.setState({
            value:''
        })
    }
    render(){
        return(<div>
            {this.props.datas&&this.props.datas.map((obj,index)=>{
                return (<Media key={index} className={obj.building?'building':''}>
                    <Media.Left>
                      <img src={obj.img} width={40} height={40} alt=""/>
                    </Media.Left>
                    <Media.Body>
                        <div className="media-body-top"><b>{obj.title}</b><span>|<font>{obj.building?'building':'idle'}</font>|<font>{obj.ip}</font>|<font>{obj.path}</font></span></div>
                        <div className="media-body-bottom">
                        <OverlayTrigger                            
                            container={this}
                            trigger="click"
                            rootClose
                            placement="bottom"
                            overlay={<Popover id="add-resources" className="add-pop" title="(separate multiple resources name with commas)">
                            <div className="add-pop-input">
                                <input onChange={(e)=>{this.setState({value:e.target.value})}} value={this.state.value} type="text"/>
                            </div>
                            <div className="add-pop-button">
                                <button onClick={()=>{this.handleAdd(index)}}>Add resources</button>
                                <button onClick={()=>{this.closePop()}}>Close</button>
                            </div>
                          </Popover>}
                            >
                            <span onClick={()=>{this.celarVal()}} className="media-body-bottom-add"><b>+</b><font>Specify Resources</font></span>
                            </OverlayTrigger>                          
                          <span className="media-body-bottom-hr">|</span>
                          <span className="media-body-bottom-items">Resources:&nbsp;
                            {obj.resources&&obj.resources.map((obj2,index2)=>{
                                return (<font key={index+'-'+index2}>{obj2}<FA onClick={()=>{this.props.deleteResources(index,index2)}} name="close" /></font>)
                            })}
                          </span>  
                        </div>
                    </Media.Body>
                    {obj.building||<Media.Right>
                      <span>
                        <FA name="ban" />
                        <font>Deny</font>
                      </span>                          
                    </Media.Right>}
                  </Media>)
            })}
        </div>)
    }
}

export default Agent