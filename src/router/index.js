import Vue from 'vue'
import Router from 'vue-router'
import Recomend from 'components/recommend/recommend'  //推荐
import Singer from 'components/singer/singer'  //歌手
import Rank from 'components/rank/rank'  //排行
import Search from 'components/search/search' //搜索

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/recommend'  //默认路由
    },
    {
      path: '/recommend',
      name: 'Recomend',
      component: Recomend
    },
    {
      path:'/singer',
      component: Singer
    },
    {
      path:'/rank',
      component: Rank
    },
    {
      path:'/search',
      component: Search
    }
  ]
})
