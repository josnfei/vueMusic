// 封装jsonp 方法
// 思路:
  /* 
    1. jsonp库的使用是jsonp(url,option,fn)  url是需要带参数过去的, option 是前端传给后台的东西 ,fn 是回调函数 https://github.com/webmodules/jsonp
    2. 封装思路: 正常jsonp地址  www.baidu.com?key=name&key2=name2
    3. url.indexof('?')<0?'?':'' 应该这样url.indexof('?')<0?'?':'&' 如果有问号了, 要返回& ,因为本来url有可能是之前有参数了,如果返回空字符串,会直接 ?key=name key2=name2这种情况出现了,所以自己想的思路不合理
    4. 利用es6 new Promise方法, promise((resolve,reject)) 有两个参数,成功是返回resolve 失败是返回reject
    */
// 引入 jsonp库
import originJSONP from 'jsonp';

// 暴露这个方法
export default function jsonp(url,data,option){
  url+=(url.indexOf('?')<0?'?':'&')+param(data);
  // console.log(url);
  return new Promise((resolve,reject)=>{
    originJSONP(url,option,(err,data)=>{
      if(!err){
        resolve(data);
      }else{
        reject(err);
      }
    })
  })

}
// 处理url所需要带参数过去的对象
function param(data){
   let dataValue='';
   for(var key in data){
     var value=data[key]!== undefined ? data[key] : '';
     dataValue+=`&${key}=${encodeURIComponent(value)}`; //es6字符串模板   encodeURIComponent  作用：可把字符串作为URI 组件进行编码。 返回值URIstring 的副本，其中的某些字符将被十六进制的转义序列进行替换。
   }
   return dataValue ? dataValue.substring(1) :'';  //如果data有值,切掉第一个& 
}