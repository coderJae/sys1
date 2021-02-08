<template>
   <div class="modal" v-if="showModal">
        <div class="body">
           <div class="title">{{ $t('wel') }}</div>
           <div class="tip">
             <p class="p1">{{ $t('tip') }}</p>
             <p class="p2">①{{ $t('s1') }} ②{{ $t('s2') }}</p>
           </div>
           <div class="upload">
              <div class="file file1" :class="[ file1 ? 'on' : '' ]">
                <input type="file" @change="change1" accept=".csv"/>
                <img v-if="!file1" src="../assets/lssj.png"/>
                <img v-else src="../assets/lssj_act.png"/>
                {{ $t('f1') }}
               </div>
              <div class="file file2" :class="[ file2 ? 'on' : '' ]">
                 <input type="file" @change="change2" accept=".shp"/>
                 <img v-if="!file2" src="../assets/dtsj.png"/>
                 <img v-else src="../assets/dtsj_act.png"/>
                 {{ $t('f2') }}
              </div>
           </div>
           <div class="submit" @click="submit" :class="[!file1 || !file2 ?'not':'']">
             <span>{{ $t('btn') }}</span>
             <div class="light"></div>
           </div>
        </div>
        <a-spin v-if="loading" class="loading" :tip="$t('loading')">
          <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
        </a-spin>
    </div>
</template>

<script>
export default {
  name: 'UploadFile',
  data(){
     return{
       showModal:true,
       file1:false,
       file2:false,
       loading:false
     }
  },
  methods:{
    submit(){
        if(!this.file1 || !this.file2 || this.loading){
          return
        }
        this.loading  = true

        setTimeout(()=>{
          this.loading = false
          this.$router.push({
            path:'./road'
          })
        },3000)
       
     },
     change1(){
        this.$message.success('successs')
        this.file1 = true
     },
     change2(){
       this.$message.success('successs')
       this.file2 = true
     },
  },
  mounted(){
    
  }
}
</script>
<style lang="scss" scoped>
.modal{
    position: fixed;
    z-index:999;
    top:0;
    bottom:0;
    left:0;
    right:0;
    .loading{
      margin-top:353px;
      position:relative;
      z-index:999999;
      letter-spacing:2px;
      font-size:16px;
    }
    .body{
        width:1269px;
        height:688px;
        background: url(../assets/file_bg.png) no-repeat center center;
        background-size:100% 100%;
        position:absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-40%);
        .title{
          position: inherit;
          font-size:22px;
          color:#fff;
          top:90px;
          left:136px;
        }
        .tip{
           color:#fff;
           text-align:left;
           margin:160px 0 0 97px;
           letter-spacing:1px;
           .p1{
             font-size:24px;
           }
           .p2{
             font-size:20px;
           }
        }
        .upload{
            display:flex;
            line-height:102px;
            color:#ababab;
            justify-content:center;
            margin-top:60px;
            font-size:30px;
            .file{
              width:374px;
              height:102px;
              background:url(../assets/file_btn.png) no-repeat center center;
              background-size:100% 100%;
              position: relative;
              &.file1{
                margin-right:100px;
              }
              &.on{
                  background:url(../assets/file_btn_on.png) no-repeat center center;
                  background-size:100% 100%;
                  color:#32c5ff;
              }
              input{
                position: absolute;
                left:0;
                opacity:0;
                width:100%;
              }
            }
            img{
              height:48px;
              width:48px;
              margin-top:-3px;
              margin-right:10px;
            }
        }
        .submit{
           width:397px;
           height:78px;
           position:relative;
           background: url(../assets/submit_bg.png) no-repeat center center;
           background-size:100% 100%;
           margin:80px auto 0 auto;
           line-height:78px;
           color:#fff;
           font-size:30px;
           font-family:txwhgzb;
           &.not{
             cursor: not-allowed;
           }
           span{
              background-image:-webkit-linear-gradient(bottom,#B1CCE8,#fff);
              background-clip:text;
              -webkit-text-fill-color:transparent;
           }
           .light{
             width:290px;
             height:88px;
             background:url(../assets/light.png) no-repeat center center;
             background-size:100% 100%;
             position:absolute;
             top:30px;
             left:50px;
           }
        }
    }
  }
</style>
