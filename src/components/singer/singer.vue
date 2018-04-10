<template>
    <div class="singer" ref="singer">
     歌手
    </div>
  </template>
  
  <script>
    import {getSingerList} from 'api/singer'
    import {ERR_OK} from 'api/config'
    import Singer from 'common/js/singer'  //导入类，因为是default暴露的，所以不用{}

    const HOT_NAME='热门';
    const HOT_SINGER_LEN=10;

    export default {
    data() {
      return {
        singers: []
      }
    },
    created() {
      this._getSingerList()
    },
    methods: {
      // 获取歌手列表
      _getSingerList() {
        getSingerList().then((res) => {
          if (res.code === ERR_OK) {
            this.singers = this._normalizeSinger(res.data.list)
            console.log(this.singers);
          }
        })
      },
      // 处理歌手列表数组
      _normalizeSinger(list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        list.forEach((item, index) => {
          // 热门数组
          if (index < HOT_SINGER_LEN) {
            map.hot.items.push(new Singer({
              name: item.Fsinger_name,
              id: item.Fsinger_mid
            }))
          }
          const key = item.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          // ES6的类的使用
          map[key].items.push(new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
          }))
        })
        // 为了得到有序列表，我们需要处理 map
        let ret = []
        let hot = []
        for (let key in map) {
          let val = map[key]
          // 字符串match方法正则匹配，找到则返回匹配的数组，找不到返回null
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }
        ret.sort((a, b) => {
          // 根据字符串的第一个字符的编码 排序
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      },
    },
  }
  </script>
  
  <style scoped lang="stylus" rel="stylesheet/stylus">
    .singer
      position: fixed
      top: 88px
      bottom: 0
      width: 100%
  </style>
  