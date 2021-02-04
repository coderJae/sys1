<template>
    <div class="login">
        <a-popover trigger="hover">
          <template slot="content">
            <div @click="changeLanguage('zh-CN')">CN 简体中文</div>
            <div class="l" @click="changeLanguage('en-US')">US English</div>
          </template>
          <a-icon type="global" class="icon"/>
        </a-popover>
        <div class="logo">
            <h1>{{ $t('sysname') }}</h1>
        </div>
        <a-form-model class="form" >
            <a-form-model-item>
               <a-input icon="search" size="large" placeholder="admin" v-model="form.name">
                    <a-icon slot="prefix" type="user" />
               </a-input>
            </a-form-model-item>
            <a-form-model-item>
               <a-input type="password" icon="search" size="large" placeholder="123456" v-model="form.password">
                   <a-icon slot="prefix" type="lock" />
               </a-input>
            </a-form-model-item>
            <a-form-model-item>
               <a-button size="large" :loading="loading" type="primary"  block @click="login">{{ $t('log') }}</a-button>
            </a-form-model-item>
            <div class="tips">
               <a href="">{{ $t('reg') }}</a>
               <a href="">{{ $t('fgt') }}</a>
            </div>
        </a-form-model>
    </div>
</template>
<script>
import { setToken } from '@/utils/util'
import Cookies from 'js-cookie'

export default {
    name:'Login',
    data(){
        return {
           loading:false,
           labelCol: { span: 4 },
           wrapperCol: { span: 20 },
           form:{
               name:'admin',
               password:'123456'
           }
        }
    },
    created(){
     if(Cookies.get('language') == 'en-US'){
         this.en = true
     }
   },
    methods:{
        login(){

           setToken('Authorization','admin')
           this.loading = true
           setTimeout(()=>{
               this.loading = false
               this.$router.push({
                    name:'uploadfile'
               })
           },1000)
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
    }
}
</script>
<style scoped lang="scss">
.login{
    height:100%;
    background:#f4f4f4;
    .icon{
        position:absolute;
        right:50px;
        top:30px;
    }
    .logo{
       padding:200px 0 30px 0;
       h1{
         font-size:50px;
         font-weight:bold;
         letter-spacing:1px;
         color:#4472c4;
       }
    }
    .form{
        width:360px;
        margin:0 auto;
    }
    .tips{
        display:flex;
        justify-content:space-between;
    }
}
</style>