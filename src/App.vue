<template>
  <div id="app">
   hello world
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped lang="stylus">
  /* stylus 的引入,不用url  less 可用也可以不用   */
@import "./common/stylus/variable.styl";
#app
  color:red

</style>
