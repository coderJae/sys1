<template>
      <div class="siderBar">
            <div class="title">{{ $t('input') }}</div>
            <div class="uploadfile">
               <div class="img" :class="[uploaded?'on':'']">
                  <img  src="./../../assets/tssj.png"/>
               </div>
               <div class="file" v-if="!uploaded">
                  <input type="file" ref="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" @change="change"/>
                  <img src="./../../assets/add.png"/><br/>
                  {{ $t('tssjsj') }}
               </div>
               <div v-if="loading" class="loading">
                   <a-spin :tip="$t('loading')"/>
               </div>
            </div>
            <div class="title">{{ $t('ofsjyc') }}</div>
            <div id="line"></div>
            <div class="detail">
               <div v-for="item in [0,1,2,3]" :key="item" :class="[item === Ind ? 'on':'']" @click="detail(item)">{{ $t('detail') }}</div>
            </div>
      </div>
</template>

<script>

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
function  randomTime(){
      return Math.floor((Math.random()*5 + 5)*1000)
}
export default {
  name: 'AccidentalEventsPrediction',
  props:['kk','mp'],
  data(){
     return{
        on:0,
        uploaded:false,
        myChart:null,
        Ind:0,
        loading:false,
        echartsData:{
           '卡口数据_1.csv':[2, 1, 2, 4],
           '卡口数据_2.csv':[4, 5, 7, 3],
           '卡口数据_3.csv':[1, 2, 1, 0]
        }
     }
  },
  watch:{
     kk(n){
        console.log(n,'run')
     }
  },
  methods:{
    detail(item){
       if(item !== 0 && !this.uploaded){
           return
       }
       this.Ind = item
       this.$emit('lookDetail',item)
    },
    change(){       
       this.$message.success(this.$i18n.t('done'))
       this.uploaded = true
       this.loading = true
       setTimeout(()=>{
          this.loading = false
          this.initChart(this.echartsData[this.kk])
       },randomTime())
    },
    initChart(d){
        this.myChart.setOption({
            grid:{
            left:30,
            right:15,
            bottom:20
            },
            xAxis: {
                  type: 'category',
                  data: ['10:30', '10:45', '11:00', '11:15'],
                  axisLabel:{
                     color:'#00ffff'
                  }
            },
            yAxis: {
                  
                  type: 'value',
                  minInterval:1,
                  splitLine:{
                     show:true
                  },
                  axisTick:{
                     show:false
                  },
                  axisLabel:{
                     show:false
                  }
            },
            series: [{
                  data: d,
                  type: 'line',
                  itemStyle:{
                     normal:{
                        color:'#00ffff'
                     }
                  },
                  symbol:'circle',
                  symbolSize:8,
                  label: {
                     show: true,
                     position: 'top',
                     color:'#00ffff',
                     fontSize:16,
                     fontWeight:'bold'
                  },
                  smooth: true
            }]
         })
    }
  },
  mounted(){
    // 接下来的使用就跟之前一样，初始化图表，设置配置项
    this.myChart = echarts.init(document.getElementById('line'))

    this.initChart([this.echartsData[this.kk][0]])

    this.$emit('lookDetail',0)
    this.$emit('addCrossing')

  }
}
</script>
<style lang="scss" scoped>
.siderBar{
   width:425px;
   height:30px;
   position:absolute;
   right:17px;
   top:152px;
   z-index:999;
   font-family: txwhgzb;
   .title{
      height:34px;
      font-size:18px;
      font-weight:100;
      line-height:34px;
      color:#fff;
      text-align:left;
      text-indent:15px;
      background:#636363;
      letter-spacing:2px;
   }
   .uploadfile{
      display:flex;
      background:rgba(0,0,0,0.5);
      margin:5px 0;
      padding:10px;
      position: relative;
      .loading{
         position:absolute;
         top:0;
         left:0;
         right:0;
         bottom:0;
         background: rgba(0,0,0,0.7);
         z-index:999999;
         text-align: center;
         padding-top:20px;
      }
      .img{
         width:56px;
         height:59px;
         position:relative;
         img{
           width:100%;
           height:100%;
         }
         &.on::after{
            content: '';
            width:6px;
            height:6px;
            background:chartreuse;
            position: absolute;
            right:0;
            top:0;
            border-radius:50%;
            z-index:999;
         }
      }
      .file{
         border:1px dashed #f1f1f1;
         height:59px;
         flex:1;
         margin-left:15px;
         background:#636363;
         color:#fff;
         position: relative;
         img{
            width:15px;
            height:15px;
            margin:10px 0 5px 0;
         }
         input{
            position: absolute;
            left:0;
            opacity:0;
            width:100%;
            height:100%;
         }
      }
   }
}
#line{
   height:220px;
   background:rgba(0,0,0,0.5);
}
.detail{
   display:flex;
   background:rgba(0,0,0,0.5);
   padding:15px 0;
   user-select:none;
   div{
      width:70px;
      height:30px;
      line-height:30px;
      background:linear-gradient(to right, #00a1f7,#007cf2);
      color:#fff;
      border-radius:5px;
      text-align:center;
      cursor:pointer;
      &:nth-child(1){
         margin-left:44px;
      }
      &:nth-child(2){
         margin-left:25px;
      }
      &:nth-child(3){
         margin-left:25px;
      }
      &:nth-child(4){
         margin-left:25px;
      }
      &.on{
         background:linear-gradient(to right, #00ffff,#02a1a1);
      }
   }
}
</style>
