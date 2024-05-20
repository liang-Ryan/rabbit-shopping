<script setup>
// 组件
import LayoutFixed from './components/LayoutFixed.vue'
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'

// =============================
// 商品分类
// =============================

import { useLayoutStore } from '@/stores'
const layoutStore = useLayoutStore()
layoutStore.getCategoryList()

// =============================
</script>

<template>
  <LayoutFixed></LayoutFixed>
  <LayoutNav></LayoutNav>
  <LayoutHeader></LayoutHeader>
  <RouterView></RouterView>
  <LayoutFooter></LayoutFooter>
</template>

<style scoped lang="scss"></style>
