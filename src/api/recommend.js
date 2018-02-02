import jsonp from 'common/js/jsonp.js';  //引入jsonp方法
import {commonParams,options} from './config'  //引入常用传参参数

// 请求推荐轮播图
export default function getRecommend(){
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