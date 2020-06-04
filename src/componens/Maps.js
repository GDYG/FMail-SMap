import React, {Component} from 'react';
import { notification, Input } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
const AMap = window.AMap;
const AMapUI = window.AMapUI;
class Maps extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    componentDidMount() {
        var map = new AMap.Map('container', { 
            // resizeEnable: true,
            zoom:10//级别 
        })
        map.on("complete", function(){
            console.log("地图加载完成！");  
        });
        let infoWindow = new AMap.InfoWindow({
            anchor: 'top-left',
            content: '崔园子海尔专卖店快递站',
        });
        AMap.plugin(['AMap.Geolocation', 'AMap.Autocomplete', 'AMap.PlaceSearch'], ()=> {
           let geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,
                timeout: 1000*10,
                noIpLocate: 0,
                noGeoLocation: 0,
                GeoLocationFirst: true,
                convert: true,
                showButton: true,
                buttonPosition: 'LT',
                showMarker: true,
                showCircle: true,
                panToLocation: true,
                zoomToAccuracy: true,
                useNative: true,
                extensions: 'all'
            })
            map.addControl(geolocation);
            geolocation.getCurrentPosition((status, result)=> {
                if(status === "complete") {
                    console.log(result)
                    let placeSearch = new AMap.PlaceSearch({
                        map: map,
                        city: result.addressComponent.city,
                        type: '生活服务|快递'
                    });
                    placeSearch.searchNearBy('快递', [result.position.lng, result.position.lat], 10000, (status, result)=> {
                        if(status === 'complete'){
                            console.log('1111111', result)
                        }else if(status === 'error'){
                            notification.info({
                                message: '获取位置失败！',
                                description: result.message,
                                duration: 2,
                            });
                        }else {
                            notification.info({
                                message: '结果信息',
                                description: '获取结果为空',
                                duration: 2,
                            });
                        }
                    })
                    let maker = new AMap.Marker({
                        position: new AMap.LngLat(115.224025, 34.838375),
                        title: '崔园子海尔专卖店快递站',
                    })
                    map.add(maker);
                    maker.on('click', (e)=> {
                        infoWindow.open(map,[e.lnglat.lng, e.lnglat.lat]);
                    })
                    AMapUI.loadUI(['misc/PoiPicker'], function(PoiPicker) {
                        var poiPicker = new PoiPicker({
                            input: 'searchInput',
                            placeSearchOptions: {
                                map: map,
                                pageSize: 10,
                                city: result.addressComponent.city
                            },
                            // autocompleteOptions: {
                            //     type: '生活服务|快递',
                            //     city: result.addressComponent.city,
                            //     citylimit: true
                            // },
                            searchResultsContainer: 'searchResults'
                        });
                        poiPicker.on('poiPicked', function(poiResult) {
                            poiPicker.hideSearchResults();
                            var source = poiResult.source,
                                poi = poiResult.item;
                            if (source !== 'search') {
                                //suggest来源的，同样调用搜索
                                poiPicker.searchByKeyword(poi.name);
                            } else {
                                console.log(poi);
                                placeSearch.searchNearBy('快递', [poi.location.lng, poi.location.lat], 10000, (status, result)=> {
                                    if(status === 'complete'){
                                        console.log('222222', result)
                                    }else if(status === 'error'){
                                        notification.info({
                                            message: '获取位置失败！',
                                            description: result.message,
                                            duration: 2,
                                        });
                                    }else {
                                        notification.info({
                                            message: '结果信息',
                                            description: '获取结果为空',
                                            duration: 2,
                                        });
                                    }
                                })
                                poiPicker.clearSearchResults()
                            }
                        });
                        // let infoWindows = new AMap.InfoWindow({
                        //     autoMove: true,
                        //     offset: {x: 0, y: -30}
                        // })
                        // AMap.event.addListener(placeSearch, 'markerClick', (e)=> {
                        //         console.log(e)
                        //         // 回调函数
                        //         // infoWindow.setContent(createContent(e.data));
                        //         // infoWindow.open(map, e.data.location);
                        //         // function createContent(poi) {  //信息窗体内容
                        //         //     var s = [];
                        //         //     s.push("<b>名称：" + poi.name+"</b>");
                        //         //     s.push("地址：" + poi.address);
                        //         //     s.push("电话：" + poi.tel);
                        //         //     s.push("类型：" + poi.type);
                        //         //     return s.join("<br>");
                        //         // }
                        // })
                        // poiPicker.onCityReady(function() {
                        //     poiPicker.searchByKeyword('快递');
                        // });
                    });
                }else if(status === "error") {
                    const args = {
                        message: '定位失败',
                        description: result.message,
                        duration: 3,
                        icon: <SmileOutlined style={{ color: '#108ee9' }} />
                      };
                    notification.info(args);
                }
            })
        })
    }
    render() {
        return (
            <div id='maps'>
                <div id='showMap'>
                    <div id="container"></div>
                    <Input placeholder="输入地点" style={{width: '20%'}} id='searchInput' onPressEnter={(e)=> {
                        e.stopPropagation()
                        e.preventDefault()
                        alert('请选择地点！')
                    }} />
                    <div id="searchResults"></div>
                </div>
            </div>
        );
    }
}

export default Maps;