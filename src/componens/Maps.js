import React, {Component} from 'react';

class Maps extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    componentDidMount() {
        var map = new AMap.Map('container', { 
            zoom:11,//级别 
            center: [116.397428, 39.90923],//中心点坐标 
            viewMode:'3D'//使用3D视图 });
        })
    }
    render() {
        return (
            <div id='maps'>
                <div id='showMap'>
                    <div id="container"></div>
                </div>
            </div>
        );
    }
}

export default Maps;