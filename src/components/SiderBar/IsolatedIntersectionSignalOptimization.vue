<template>
      <div class="siderBar">
            <div class="title">{{ $t('input') }}</div>
            <div class="uploadfile">
               <div class="img" :class="[uploaded?'on':'']">
                  <img  src="./../../assets/xhxw.png"/>
               </div>
               <div class="file" v-if="!uploaded">
                  <input type="file" @change="change" accept=".csv"/>
                  <img src="./../../assets/add.png"/><br/>
                  {{ $t('xhxwsj') }}
               </div>
               <div v-if="loading" class="loading">
                   <a-spin :tip="$t('loading')"/>
               </div>
            </div>
            <div class="title">{{ $t('jckgk') }}</div>
            <div style="padding:10px;margin:10px 0;background:rgba(0,0,0,0.5);font-size:16px">
               <div class="crossing">
                  <div class="select" @click="showOption">
                     <span>{{ $t('no') }}</span><div>{{id}}</div>
                  </div>
                  <div class="options" v-if="showOp">
                     <div v-for="(item,index) in roads" :key="index" :class="[ current == item.t ? 'on' : '']"  @click="pickThis(item)">{{ $t(item.t) }}</div>
                  </div>
                  <div class="name">
                     <span>{{ $t('name') }}</span><div>{{ $t(current) }}</div>
                  </div>
               </div>
            </div>
          
            <div class="title">{{ $t('yhqxhxw') }}</div>
            <div style="padding:10px;margin:10px 0;background:rgba(0,0,0,0.5)">
               <div class="ticks-wrap">
                  <span v-for="(item,index) in beforeTick" :key="index">{{item}}</span>
                  <span></span>
               </div>
               <div class="xw-wrap">
                   <img v-for="(item,index) in beforeXw" :key="index" :src="require(`./../../assets/xw${item}.png`)"/>
                   <img v-if="beforeXw.length" src="./../../assets/zb.png"/>
               </div>
            </div>

            <div class="title">{{ $t('yhhxhxw') }}</div>
            <div style="padding:10px;margin:10px 0;background:rgba(0,0,0,0.5)">
               <div class="ticks-wrap">
                  <span v-for="(item,index) in currentTick" :key="index">{{item}}</span>
                  <span></span>
               </div>
               <div class="xw-wrap">
                   <img v-for="(item,index) in currentXw" :key="index" :src="require(`./../../assets/xw${item}.png`)"/>
                   <img v-if="currentXw.length" src="./../../assets/zb.png"/>
               </div>
            </div>
      </div>
</template>

<script>
function  randomTime(){
      return Math.floor((Math.random()*5 + 5)*1000)
}
export default {
  name: 'IsolatedIntersectionSignalOptimization', //单点信号优化
  props:['kk','mp'],
  data(){
     return{
        loading:false,
        uploaded:false,
        showOp:false,
        current:'',
        currentTick:[],
        currentXw:[],
        beforeTick:[],
        beforeXw:[],
        id:null,
        roads:[
           {
              id:1,
              t:'road.r1'
           },
           {
              id:2,
              t:'road.r2'
           },
           {
              id:3,
              t:'road.r3'
           },
           {
              id:4,
              t:'road.r4'
           },
           {
              id:6,
              t:'road.r6'
           }
        ],
        xws:{
         '历史轨迹数据_1.csv':[{
                  id:1,
                  b_ticks:[0,18,28,44,60],
                  ticks:[0,25,40,50,60],
                  xw:[2,3,4,1]
               },{
                  id:2,
                  b_ticks:[0,27,45,53,60],
                  ticks:[0,30,47,55,60],
                  xw:[2,3,4,1]
               },{
                  id:3,
                  b_ticks:[0,24,33,52,60],
                  ticks:[0,20,33,53,60],
                  xw:[2,3,4,1]
               },{
                  id:4,
                  b_ticks:[0,18,30,48,60],
                  ticks:[0,21,35,54,60],
                  xw:[2,3,4,1]
               },{
                  id:6,
                  b_ticks:[0,30,45,'',''],
                  ticks:[0,28,45,'',''],
                  xw:[5,6]
               }],
         '历史轨迹数据_2.csv':[{
               id:1,
               b_ticks:[0,21,30,42,60],
               ticks:[0,22,40,52,60],
               xw:[2,3,4,1]
            },{
               id:2,
               b_ticks:[0,23,44,53,60],
               ticks:[0,15,30,43,60],
               xw:[2,3,4,1]
            },{
               id:3,
               b_ticks:[0,17,26,46,60],
               ticks:[0,18,25,53,60],
               xw:[2,3,4,1]
            },{
               id:4,
               b_ticks:[0,22,43,54,60],
               ticks:[0,21,35,54,60],
               xw:[2,3,4,1]
            },{
               id:6,
               b_ticks:[0,34,45,'',''],
               ticks:[0,40,45,'',''],
               xw:[5,6]
            }],
            '历史轨迹数据_3.csv':[{
               id:1,
               b_ticks:[0,26,40,50,60],
               ticks:[0,21,42,52,60],
               xw:[2,3,4,1]
            },{
               id:2,
               b_ticks:[0,25,41,51,60],
               ticks:[0,18,40,50,60],
               xw:[2,3,4,1]
            },{
               id:3,
               b_ticks:[0,17,26,46,60],
               ticks:[0,19,30,53,60],
               xw:[2,3,4,1]
            },{
               id:4,
               b_ticks:[0,24,46,54,60],
               ticks:[0,25,37,54,60],
               xw:[2,3,4,1]
            },{
               id:6,
               b_ticks:[0,21,45,'',''],
               ticks:[0,15,45,'',''],
               xw:[5,6]
            }]
        }
     }
  },
  watch:{
     id(n,o){
       this.match(n)
       this.$emit('addCrossing',[n])
     },
     uploaded(){
       this.current = 'road.r4'
       this.id = 4
       this.match(4)
     }
  },
  methods:{
    pickThis(item){
       this.current = item.t
       this.id = item.id
       this.showOp = false
    },
    match(id){
        this.xws[this.kk].forEach(r => {
         if(id == r.id){
            this.currentTick = r.ticks
            this.currentXw = r.xw
            this.beforeTick = r.b_ticks
            this.beforeXw = r.xw
         }
       })
    },
    change(){
       this.$message.success(this.$i18n.t('done'))
       this.loading = true
       setTimeout(()=>{
          this.loading = false
          this.uploaded = true
       },randomTime())
    },
    showOption(){
       if(!this.uploaded){
          return
       }
       this.showOp = !this.showOp
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
      font-size:16px;
      font-weight:100;
      line-height:34px;
      color:#fff;
      text-align:left;
      text-indent:10px;
      letter-spacing:1px;
      background:#636363;
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
.crossing{
  border:1px solid #32c5ff;
  padding:10px;
  color:#fff;
  position: relative;
  user-select: none;
  .select,.name{
     height:65px;
     line-height:65px;
     display:flex;
     justify-content:space-between;
     span{
        width:42px;
        letter-spacing:5px;
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
    left:70px;
    width:320px;
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
   justify-content:space-between;
   span{
      font-size:16px;
      color:yellow;
   }
}
.xw-wrap{
   display:flex;
   margin-top:10px;
   img{
      display:block;
      width:83px;
   }
}
</style>
