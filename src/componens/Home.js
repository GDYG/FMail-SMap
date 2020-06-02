import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'antd';
import '../accets/css/home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            show: false
        };
    }
    componentDidMount() {
        this.setState({
            show: true
        })
    }
    render() {
        return (
            <div id='main'>
                {
                    this.state.show && this.state.show === true ? <Link to='/map'><Button type="primary">开始搜索</Button></Link> : ''
                }
            </div>
        );
    }
}

export default Home;