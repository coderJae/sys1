<template>
      <div class="siderBar">
            <div class="title">{{ $t('input') }}</div>
            <div style="position:relative">
               <div class="uploadfile">
                  <div class="img" :class="[uploaded1?'on':'']">
                     <img  src="./../../assets/xhps.png"/>
                  </div>
                  <div class="file" v-if="!uploaded1">
                     <input type="file" @change="change1" accept=".csv"/>
                     <img src="./../../assets/add.png"/><br/>
                     {{ $t('xhpssj') }}
                  </div>
               </div>
               <div class="uploadfile">
                  <div class="img" :class="[uploaded2?'on':'']">
                     <img  src="./../../assets/gjgj.png"/>
                  </div>
                  <div class="file" v-if="!uploaded2">
                     <input type="file" @change="change2" accept=".csv"/>
                     <img src="./../../assets/add.png"/><br/>
                     {{ $t('gjgjsj') }}
                  </div>
               </div>
               <div v-if="loading" class="loading">
                   <a-spin :tip="$t('loading')"/>
               </div>
            </div>
            <div class="title">{{ $t('gjgk') }}</div>
            <div style="padding:10px;margin:10px 0;background:rgba(0,0,0,0.5)">
               <div class="crossing">
                  <div class="select" @click="showOption">
                     <span>{{ $t('gjbh') }}</span><div>{{current}}</div>
                  </div>
                  <div class="options" v-if="showOp">
                    <div v-for="(item,index) in road" :key="index" :class="[ current == item ? 'on' : '']" @click="pickThis(item)">{{item}}</div>
                  </div>
                  <div class="name">
                     <span>{{ $t('cycle') }}</span><div>{{min}} {{ $t('min') }}</div>
                  </div>
               </div>
            </div>
            <div class="title">{{ $t('xljck') }}</div>
            <div style="padding:10px;margin:10px 0;background:rgba(0,0,0,0.5)">
               <div class="ticks-wrap">
                  <span v-for="(item,index) in ['jckbh','xzxwc','yhxwc']" :key="index">{{ $t(item) }}</span>
               </div>
               <div class="xw-wrap">
                  <div v-for="(item,index) in list" :key="index">
                      <span>{{item.cId}}</span>
                      <span style="color:#32c5ff">{{item.n}}</span>
                      <span style="color:#32c5ff">{{item.m}}</span>
                  </div>
               </div>
            </div>
      </div>
</template>

<script>
function  randomTime(){
      return Math.floor((Math.random()*5 + 5)*1000)
}
export default {
  name: 'ArterialPublicTransitSignalCoordination',
  props:['kk','mp'],
  data(){
     return{
        loading:false,
        showOp:false,
        road:[],
        current:null,
        min:null,
        list:[],
        xwc:{
           '历史轨迹数据_1.csv':{
                  road:20,
                  min:15,
                  cross:[{
                        cId:2,
                        n:0,
                        m:0
                     },{
                        cId:1,
                        n:4,
                        m:8
                     },{
                        cId:3,
                        n:6,
                        m:20
                     },{
                        cId:6,
                        n:20,
                        m:24
                     }]
           },
           '历史轨迹数据_2.csv':{
                  road:18,
                  min:9.3,
                  cross:[{
                        cId:1,
                        n:0,
                        m:0
                     },{
                        cId:3,
                        n:8,
                        m:14
                     },{
                        cId:4,
                        n:16,
                        m:20
                     },{
                        cId:6,
                        n:35,
                        m:24
                     }]
           },
           '历史轨迹数据_3.csv':{
                  road:4,
                  min:10.6,
                  cross:[{
                        cId:2,
                        n:0,
                        m:0
                     },{
                        cId:4,
                        n:16,
                        m:7
                     },{
                        cId:3,
                        n:21,
                        m:16
                     }]
           }
        },
        uploaded1:false,
        uploaded2:false
     }
  },
  watch:{
    uploaded1(n,o){
      if(n && this.uploaded2){
          this.loading = true
          setTimeout(()=>{
            this.loading = false
            this.match()
          },randomTime())
      }
    },
    uploaded2(n,o){
       if(n && this.uploaded1){
          this.loading = true
          setTimeout(()=>{
            this.loading = false
            this.match()
          },randomTime())
       }
    }
  },
  methods:{
     pickThis(n){
        this.current = n
        this.showOp = false
     },
     showOption(){
       if(!this.uploaded1 || !this.uploaded2){
          return
       }
       this.showOp = !this.showOp
     },
     change1(){
       this.$message.success(this.$i18n.t('done'))
       this.uploaded1 = true
     },
     change2(){
       this.$message.success(this.$i18n.t('done'))
       this.uploaded2 = true
     },
     match(){
      let data = this.xwc[this.kk]
      
      this.road = [data.road]
      this.current = data.road
      this.min = data.min
      this.list = data.cross

      this.$emit('addCrossing',data.cross.map(d=>{ return d.cId }))

     }
  },
  mounted(){
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
   .loading{
      position:absolute;
      top:0;
      left:0;
      right:0;
      bottom:0;
      background: rgba(0,0,0,0.7);
      z-index:999999;
      text-align: center;
      padding-top:50px;
   }
   .uploadfile{
      display:flex;
      background:rgba(0,0,0,0.5);
      margin:5px 0;
      padding:10px;
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
.crossing{
  border:1px solid #32c5ff;
  padding:10px;
  color:#fff;
  position: relative;
  letter-spacing:2px;
  user-select: none;
  .select,.name{
     height:65px;
     line-height:65px;
     display:flex;
     justify-content:space-between;
     span{
        width:166px;
        text-align:left;
     }
     div{
        flex:1;
     }
     &:first-child{
        border-bottom:1px dashed #636363;
     }
  }
  .select{
     background:url(./../../assets/down.png) no-repeat  360px center;
     background-size:10px 10px;
  }
  .options{
    position:absolute;
    left:80px;
    width:300px;
    padding:0 15px;
    background:rgba(0,0,0,0.8);
    div{
       height:50px;
       line-height:50px;
       text-align: center;
       z-index:999;
       letter-spacing:2px;
       cursor:pointer;
       border-bottom:1px dashed #636363;
       &:last-child{
          border:none;
       }
       &.on{
          color:#32c5ff;
       }
    }
  }
}
.ticks-wrap{
   display:flex;
   height:32px;
   line-height:32px;
   background:#293036;
   justify-content:space-around;
   span{
      color:#fff;
      flex:1;
      text-align: center;
   }
}
.xw-wrap{
   div{
       display:flex;
       justify-content:space-around;
       color:#fff;
       line-height:32px;
       letter-spacing:2px;
       background:#313638;
       margin:5px 0;
       span{
          flex:1;
          text-align: center;
       }
   }
}
</style>