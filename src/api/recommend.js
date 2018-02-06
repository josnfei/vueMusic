import jsonp from 'common/js/jsonp.js';  //引入jsonp方法
import {commonParams,options} from './config'  //引入常用传参参数
import axios from 'axios';

// 请求推荐轮播图
export function getRecommend(){
  var url='https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';

  //Object.assign(  )合并对象
  let data=Object.assign({},commonParams,{ 
    platform: 'h5',  //来源H5
    uin: 0,
    needNewCode: 1
  }); 
  // console.log(data);

  return jsonp(url,data,options);
}
// 请求推荐歌曲列表,使用node代理
export function getDiscList() {
  const url = '/api/getDiscList'

  const data = Object.assign( commonParams, {  //qq必传的参数
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'  //返回json数据
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}