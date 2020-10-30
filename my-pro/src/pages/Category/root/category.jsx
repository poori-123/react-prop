import React, { Component } from 'react'
import { connect } from 'react-redux';

import { getHomeDate } from '../../Home/store/actions';
import { getListData } from '../store/actions';
import Cates from '../component/cates';
import List from '../component/list';
import AppLoading from '../../../components/app-loading';

import './style.scss';

class category extends Component {
    constructor(props){
        super(props);
        this.state = {}
    };
    static getDerivedStateFromProps(props, state){
        var typeId = null;
        var showData = [];
        if(props.location.state && props.location.state.typeId){
            typeId = props.location.state.typeId;
        }else if(props.types.length !== 0){
            typeId = props.types[0].id;
        }
        if( typeId && props.dataList[typeId] ){
            showData = props.dataList[typeId];
        }
        return {
            typeId,
            showData
        };
    }
    render() {
        return (
            <div className="page category">
                <div className="top">
                    <h1>分类</h1>
                    <div className="search">
                        <span className="iconfont iconsearch"></span>
                        <input type="text" placeholder="搜索商品-好货等你" />
                    </div>
                </div>
                <div className="content">
                    {/* {
                        this.state.showData.length === 0 &&  <AppLoading/>
                    } */}
                    {
                        this.props.loadStatus && <AppLoading/>
                    }
                    <Cates data={this.props.types} typeId={this.state.typeId} changeType={ this.changeTypeAction } />
                    <List history={this.props.history} data={this.state.showData} />
                </div>
            </div>
        )
    };
    componentDidMount(){
        if(this.props.types.length === 0){
            this.props.getTypes();
        }
        if(this.state.typeId){
            this.props.getListData(this.state.typeId)
        }
    };
    componentDidUpdate(props,state){
        if(state.typeId !== this.state.typeId && !this.props.dataList[this.state.typeId] ){
            this.props.getListData(this.state.typeId)
        }
    }
    changeTypeAction = (id)=>{
        this.props.history.replace('/category', {typeId: id})
        
    }
}
export default connect(
    (state) => ({
        types: state.home.type,
        dataList: state.category.dataList,
        loadStatus: state.category.loadStatus
    }),
    (dispatch) => ({
        getTypes: ()=>{
            dispatch(getHomeDate())
        },
        getListData: (id) => {
            dispatch(getListData(id))
        }
    })
)(category)
