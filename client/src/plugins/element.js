import Vue from 'vue'
import { Button, Message, Card, Input, Carousel, CarouselItem, Pagination } from 'element-ui'

Vue.use(Button);
Vue.use(Card);
Vue.use(Input);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Pagination);
Vue.prototype.$message = Message;
