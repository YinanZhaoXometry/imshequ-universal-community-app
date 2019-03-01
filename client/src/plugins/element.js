import Vue from 'vue'
import { Button, Message, Card, Input } from 'element-ui'

Vue.use(Button);
Vue.use(Card);
Vue.use(Input)
Vue.prototype.$message = Message;
