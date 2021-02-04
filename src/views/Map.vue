<template>
  <div class="map-wrap">
    <div class="bannar" :class="[en?'en':'']"><span>{{ $t('sysname') }}</span></div>
    <div class="user">
       <a-popover trigger="hover">
          <template slot="content">
            <div @click="changeLanguage('zh-CN')">CN 简体中文</div>
            <div class="l" @click="changeLanguage('en-US')">US English</div>
          </template>
          <a-icon type="global" style="margin-right:20px"/>
        </a-popover>
        <span style="margin-right:30px;">admin {{ $t('hi') }}</span> 
        <span style="cursor:pointer" @click="logout"><a-icon type="logout" style="margin-right:5px;" />{{ $t('logout') }}</span>
    </div>
    <div class="legend">
        <div>
          <span class="color" style="background:#03e479"></span>{{ $t('status.s1') }}
        </div>
        <div>
          <span class="color" style="background:#0091ff"></span>{{ $t('status.s2') }}
        </div>
        <div>
          <span class="color" style="background:#fa4300"></span>{{ $t('status.s3') }}
        </div>
    </div>
    <router-view/>
  </div>
</template>
<script>
import { removeToken } from '@/utils/util'
import Cookies from 'js-cookie'
import i18n from './../i18n'
export default {
   data(){
     return {
         en:false
     }
   },
   methods:{
     logout(){
         const self = this;
         this.$confirm({
            content: i18n.tc('ask'),
            onOk() {
                removeToken('Authorization')
                self.$router.push({
                  path:'./login'
                })
            },
            okText: i18n.tc('okText'),
            cancelText: i18n.tc('cancelText'),
            onCancel() {
              self.$destroyAll();
            }
          })
       
     },
     changeLanguage(l){
        this.$i18n.locale = l
        Cookies.set('language',l,30)
        if(l == 'en-US'){
           this.en = true
        }else{
           this.en = false
        }
     }
   },
   created(){
     if(Cookies.get('language') == 'en-US'){
         this.en = true
     }
   },
   mounted(){

   }
}
</script>
<style lang="scss">
.map-wrap{
  height:100%;
  background: url(../assets/bg.png) no-repeat center center;
  background-size:100% 100%;
  .bannar{
    height:61px;
    line-height:56px;
    color:#fff;
    font-size:30px;
    background: url(../assets/bannar.png) no-repeat center center;
    background-size:100% 100%;
    position: relative;
    z-index:999;
    letter-spacing:2px;
    font-family:txwhgzb;
    &.en{
      font-size:26px;
      letter-spacing: 0;
    }
    span{
      background-image:-webkit-linear-gradient(bottom,#B1CCE8,#fff);
      background-clip:text;
      -webkit-text-fill-color:transparent;
    }
  }
  .user{
    position: absolute;
    right:30px;
    top:30px;
    color:#fff;
    z-index:999999;
    div{
      cursor:pointer;
    }
    .l{
      margin-top:15px;
    }
  }
  .legend{
    position: absolute;
    z-index:999;
    left:15px;
    bottom:15px;
    width:165px;
    height:175px;
    text-align:left;
    background:rgba(0,0,0,.6);
    color:#fff;
    display:flex;
    flex-direction: column;
    justify-content:center;
    div{
      margin:15px 0 15px 30px;
    }
    span{
      display:inline-block;
      width:40px;
      height:10px;
      margin-right:5px;
    }
  }
}
</style>
