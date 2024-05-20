<script setup>
// 组件
import homeCategory from './components/homeCategory.vue'
import homeBanner from './components/homeBanner.vue'
import homeNew from './components/homeNew.vue'
import homeHot from './components/homeHot.vue'
import homeProduct from './components/homeProduct.vue'
</script>

<template>
  <div class="home-content">
    <homeCategory></homeCategory>
    <homeBanner></homeBanner>
  </div>
  <homeNew></homeNew>
  <homeHot></homeHot>
  <homeProduct></homeProduct>
</template>

<style scoped>
.home-content {
  position: relative;
}
</style>
