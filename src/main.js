import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import 'echarts/theme/macarons.js'
import store from './store'

//按需引入Muse-UI组件
import { Radio, Checkbox, TextField, Button, Icon } from 'muse-ui'
// import 'muse-ui/lib/styles/base.less';
Vue.use(Radio);
Vue.use(Checkbox);
Vue.use(TextField);
Vue.use(Button);
Vue.use(Icon);
import 'muse-ui/lib/styles/theme.less'


//引入过滤器
import './components/student/filters'

//引入图片查看器v-viewer
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
//Vue.use(Viewer) 默认配置写法
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999
  }
});

//全局引入基于VueJS的无缝滚动
import scroll from 'vue-seamless-scroll'
Vue.use(scroll)

//全局引入一个用于移动端的可触摸滑动具有回弹效果的可复用Vue组件
import LyTab from 'ly-tab'
Vue.use(LyTab)


//全局导入MintUI
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI);

Vue.use(ElementUI)
Vue.use(mavonEditor)

// 设置反向代理，前端请求默认发送到 http://localhost:8223/api
var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8223/api'
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  components: {App},
  template: '<App/>'
})
