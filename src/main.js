import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import i18n from './i18n'

Vue.config.productionTip = false

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.use(Antd)


// import Button from 'ant-design-vue/lib/button';
// import 'ant-design-vue/lib/button/style/index.css'
// Vue.use(Button)


import AMap from 'vue-amap';
Vue.use(AMap);

// 初始化vue-amap
AMap.initAMapApiLoader({
  // 高德key
  key: 'c6fe8c8da8d36bf97b452d7add0a2141',
  // 插件集合 （插件按需引入）
  plugin: [
    'AMap.DrivingPolicy',
    'AMap.Autocomplete',
    'AMap.Driving',
    'AMap.ControlBar',
    'AMap.Geolocation',
    'AMap.CanvasLaye',
    'AMap.Bounds',
    'AMap.CustomLayer',
    'AMap.Browser',
    'AMap.InfoWindow',
    'AMap.Pixel',
    'AMap.Util',
    'AMap.Icon',
    'AMap.Marker',
    'AMap.Pixel',
    'AMap.Size',
    'AMap.MouseTool',
    'AMap.GeometryUtil'
  ],
  v: '1.4.4'
});

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
