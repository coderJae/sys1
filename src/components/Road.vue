<template>
  <div>
      <div class="menu">
         <div :class="[ on === 0 ? 'on' : '']" @click="menuTo('AccidentalEventsPrediction',0)">{{ $t('menu.m1') }}</div>
         <div :class="[ on === 1 ? 'on' : '']" @click="menuTo('IsolatedIntersectionSignalOptimization',1)">{{ $t('menu.m2') }}</div>
         <div :class="[ on === 2 ? 'on' : '']" @click="menuTo('ArterialPublicTransitSignalCoordination',2)">{{ $t('menu.m3') }}</div>
      </div>
      
      <component :is="siderBar" @lookDetail="lookDetail" @addCrossing="addCrossing"></component>
      
      <div id="map"></div>
  </div>
</template>

<script>

import { lazyAMapApiLoaderInstance } from 'vue-amap';
import { renderMask, addMarker, addIcon, searchRoad, drawRoad, roadData, crossing } from '../data/road'
import Cookies from 'js-cookie'

// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import {
    LineChart
} from 'echarts/charts';
// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import {
    TitleComponent,
    TooltipComponent,
    GridComponent
} from 'echarts/components';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import {
    CanvasRenderer
} from 'echarts/renderers';
import { color } from 'echarts/core';

// 注册必须的组件
echarts.use(
    [ TitleComponent, TooltipComponent, GridComponent, LineChart, CanvasRenderer]
);

export default {
  name: 'Road',
  components:{
     AccidentalEventsPrediction: () => import('./SiderBar/AccidentalEventsPrediction'),
     ArterialPublicTransitSignalCoordination: () => import('./SiderBar/ArterialPublicTransitSignalCoordination'),
     IsolatedIntersectionSignalOptimization: () => import('./SiderBar/IsolatedIntersectionSignalOptimization'),
  },
  data(){
     return{
        map:null,
        on:0,
        siderBar:'AccidentalEventsPrediction',
        details:[
           [
              { r:5,s:2 },
              { r:11,s:2}
           ],
           [
              { r:2,s:1 },
              { r:5,s:2 },
              { r:8,s:1 },
              { r:11,s:1}
           ],
           [
              { r:2,s:1 },
              { r:5,s:2 },
              { r:8,s:1 },
              { r:10,s:2},
              { r:11,s:1}
           ],
           [
              { r:1,s:1 },
              { r:2,s:2 },
              { r:5,s:2 },
              { r:6,s:1 },
              { r:8,s:2 },
              { r:9,s:1 },
              { r:10,s:2},
              { r:11,s:1}
           ]
        ],
        overlayGroups:null
     }
  },
  methods:{
     initMap(){
        var map = new AMap.Map("map", {
            center: [121.473658,31.230378],
            zooms:[10,15],
            pitch: 50,
            viewMode:'3D',
            mapStyle: "amap://styles/cbd2e1aed1ade67712e722499e6fc503"
        });

        map.addControl(new AMap.ControlBar({
            showZoomBar:false,
            showControlButton:true,
            position:{
               left:'-50px',
               top:'150px'
            }
        }))
        this.map = map

        var customLayer = new AMap.CustomLayer(renderMask('map'), {
              zooms: [3, 18],
              zIndex: 0
        });

        customLayer.setMap(map);
     },
     menuTo(c,i){
        this.siderBar = c
        this.on = i
     },
     lookDetail(e){

        if(!this.map) return
        
        this.map.clearMap();
        const road = JSON.parse(JSON.stringify(roadData))
        const l = Cookies.get('language') == 'en-US'? true : false
        
        const detail = this.details[e]

        road.forEach(r=>{
            detail.forEach(d=>{
               if(r.name == d.r){
                  r.status = d.s
               }
            })
        })
        
        road.forEach(r => {
            searchRoad(r).then(res=>{
                  drawRoad(this.map,res)
                  if(res.status == 2){
                    addIcon(this.map,res.path[Math.ceil(res.path.length/2)],l)
                  }
            }).catch(err=>{
                  console.log(err)
            })
        })

        this.addCrossing()
       

     },
     addCrossing(e){

         if(!this.map) return

         if(this.overlayGroups){
            this.map.remove(this.overlayGroups)
         }

         if(e){
            var  cs = JSON.parse(JSON.stringify(crossing))
            
            cs.forEach(c=>{
               e.forEach((item)=>{
                  if(c.name == item){
                     c.status = 1
                  }
               })
            })
         }

         this.overlayGroups = new AMap.OverlayGroup(addMarker(this.map,cs || crossing));
         this.map.add(this.overlayGroups);
     }
  },
  mounted(){
      let _this = this
      lazyAMapApiLoaderInstance.load().then(() => {
         _this.initMap()
         
         const l = Cookies.get('language') == 'en-US'? true : false

         this.addCrossing()
         
         roadData.forEach(r => {
            searchRoad(r).then(res=>{
                drawRoad(this.map,res)
                if(res.status == 2){
                  addIcon(this.map,res.path[Math.ceil(res.path.length/2)],l)
                }
            }).catch(err=>{
                console.log(err)
            })
         })
         
      })

  }
}
</script>
<style lang="scss" scoped>
#map{
  position: absolute;
  z-index:9;
  top:0;
  left:0;
  bottom:0;
  right:0;
}
.menu{
  display:flex;
  color:#fff;
  position: absolute;
  z-index:999;
  left:15px;
  top:70px;
  font-size:18px;
  font-family: txwhgzb;
  div{
     margin:0 10px;
     padding-bottom:3px;
     position: relative;
     letter-spacing:1px;
     cursor:pointer;
     &.on{
        border-bottom:3px solid;
        border-radius:3px;
        border-image:linear-gradient(to right, #539AED,#3FD5C4) 30 30;
     }
     &::after{
        content:'';
        width:1px;
        height:15px;
        background:#fff;
        position:absolute;
        right:-10px;
        top:8px;
     }
     &:last-child{
        &::after{
           display:none;
        }
     }
  }
}
</style>
