//地图遮罩
//遮罩层
function renderMask(map) {
    var canvas = document.createElement('canvas');
    canvas.style.borderRadius = '5px'
    var ctx = canvas.getContext("2d");

    var retina = AMap.Browser.retina;

    var oDiv = document.getElementById(map)
    var width = oDiv.offsetWidth;
    var height = oDiv.offsetHeight;

    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'
    if (retina) {//高清适配
        width *= 2;
        height *= 2;
    }
    canvas.width = width;
    canvas.height = height;//清除画布

    var linearGradient = ctx.createLinearGradient(0, 0, 0, height / 6);
    //添加颜色段
    linearGradient.addColorStop(0, 'rgba(0,0,0,1)');
    linearGradient.addColorStop(1, 'rgba(0,0,0,0.01)');
    //改变填充的样式并绘画填充矩形
    ctx.fillStyle = linearGradient;
    ctx.fillRect(0, 0, width, height);
    ctx.fill();

    return canvas
}

//添加marker
function addMarker(map,list){
    let markers = []
    let normal = new AMap.Icon({            
        image: require('../assets/b.png'),
        size: new AMap.Size(55, 72),
        imageSize: new AMap.Size(55, 72)
    })
    
    let fault = new AMap.Icon({            
        image: require('../assets/y.png'),
        size: new AMap.Size(55, 72),
        imageSize: new AMap.Size(55, 72)
    })

    list.forEach( (d) =>{
        var marker = new AMap.Marker({
            position: new AMap.LngLat(d.lnglat[0], d.lnglat[1]),
            icon:d.status ===0  ? normal : fault,
            offset: new AMap.Pixel(-30, -62),
            extData: {
                lnglat: [d.lnglat[0], d.lnglat[1]]
            }
        })

        var marker2 = new AMap.Text({
            text:d.name,
            position: new AMap.LngLat(d.lnglat[0], d.lnglat[1]),
            offset: new AMap.Pixel(0, -62)
        })

        marker2.setStyle({'color':'#7ec2ff','background-color':'rgba(0,0,0,0)','border':'none','font-size':'20px','font-weight':'bold'})

        markers.push(marker);
        markers.push(marker2);

    })

    return markers
}

function addIcon(map,p,l){

    const Icon = new AMap.Icon({            
        image: require('../assets/congestion.png'),
        size: new AMap.Size(193, 96),
        imageSize: new AMap.Size(193, 96)
    })
    const Icon2 = new AMap.Icon({            
        image: require('../assets/congestion2.png'),
        size: new AMap.Size(193, 96),
        imageSize: new AMap.Size(193, 96)
    })

    var marker = new AMap.Marker({
        position: new AMap.LngLat(p.lng, p.lat),
        icon:l ? Icon2 : Icon ,
        offset: new AMap.Pixel(-193, -96),
    })

    map.add(marker);

}



//路线查询
function searchRoad(road){
    const drivingOption = {
          policy: AMap.DrivingPolicy.LEAST_DISTANCE,
          ferry: 1, // 是否可以使用轮渡
          province: '沪', // 车牌省份的汉字缩写  
          hideMarkers:true,
      }
      
    var driving = new AMap.Driving(drivingOption) // 构造路线导航类

    return new Promise((resolve,reject)=>{
        driving.search(road.start,road.end, function(status, result) {
              if (status === 'complete') {
                  if (result.routes && result.routes.length) {
                      road.path = parseRouteToPath(result.routes[0])
                      resolve(road)
                  }
              } else {
                      reject('fail')
              }
        })
    })
 }

// 解析DrivingRoute对象，构造成AMap.Polyline的path参数需要的格式
function parseRouteToPath(route) {
    var path = []

    for (var i = 0, l = route.steps.length; i < l; i++) {
        var step = route.steps[i]

        for (var j = 0, n = step.path.length; j < n; j++) {
            path.push(step.path[j])
        }
    }
    return path
}

//绘制路线
function drawRoad(map,road){
    var routeLine = new AMap.Polyline({
        path: road.path,
        borderWeight: 0,
        strokeWeight: 8,
        strokeColor: ['#03e479','#ffc000','#b90404'][road.status],
        lineJoin: 'round',
        zIndex:999,
        extData:road.name,
        cursor:'pointer'
    })

    routeLine.setMap(map)

    routeLine.on('click',(e)=>{
      // this.showRoadList([e.lnglat.lng,e.lnglat.lat],road)
      console.log(e.target.getExtData())
    })

    // 调整视野达到最佳显示区域
    map.setFitView()
 }

const roadData = [{
       name:1,
       status:0,
       start:[121.39453,31.159526],
       end:[121.396869,31.152631]
    },{
       name:2,
       status:0,
       start:[121.396941,31.152546],
       end:[121.399838,31.143901]
    },{
        name:3,
        status:0,
        start:[121.394652,31.159655],
        end:[121.387302,31.157227]
    },{
        name:4,
        status:0,
        start:[121.39688,31.152631],
        end:[121.388933,31.150551]
    },{
        name:5,
        status:2,
        start:[121.387233,31.157181],
        end:[121.388933,31.150551]
    },{
        name:6,
        status:0,
        start:[121.388859,31.15045],
        end:[121.391406,31.140377]
    },{
        name:7,
        status:0,
        start:[121.377185,31.157723],
        end:[121.387233,31.157181]
    },{
        name:8,
        status:0,
        start:[121.388827,31.150542],
        end:[121.380474,31.147462]
    },{
        name:9,
        status:0,
        start:[121.391352,31.1404],
        end:[121.381423,31.137593]
    },{
        name:10,
        status:0,
        start:[121.377185,31.157723],
        end:[121.380474,31.147462]
    },{
        name:11,
        status:2,
        start:[121.380474,31.147462],
        end:[121.381359,31.137564]
    },{
        name:'a',
        status:0,
        start:[121.398084,31.160531],
        end:[121.394661,31.159604]
    },{
        name:'b',
        status:0,
        start:[121.397052,31.152553],
        end:[121.402408,31.153965]
    },{
        name:'c',
        status:0,
        start:[121.392958,31.164247],
        end:[121.394501,31.159619]
    },{
        name:'d',
        status:0,
        start:[121.385881,31.162614],
        end:[121.387233,31.157181]
}]

const crossing = [{
    name:1,
    lnglat:[121.394661,31.159604],
    status:0
},{
    name:2,
    lnglat:[121.396941,31.152546],
    status:0
 },{
    name:3,
    lnglat:[121.387233,31.157181],
    status:0
 },{
    name:4,
    lnglat:[121.388933,31.150551],
    status:0
 },{
    name:6,
    lnglat:[121.380474,31.147462],
    status:0
 }]

export {
    renderMask,
    addMarker,
    addIcon,
    searchRoad,
    parseRouteToPath,
    drawRoad,
    roadData,
    crossing
}
