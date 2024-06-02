<script setup>
// 通用
import { ref, watch } from 'vue'

// 组件
import { useMouseInElement } from '@vueuse/core'

// =============================
// 图片列表
// =============================

defineProps({
  imageList: {
    type: Array,
    default: () => []
  }
})

// =============================
// 切换大图
// =============================

const activeIndex = ref(0)
const imageAcitve = (index) => {
  activeIndex.value = index
}

// =============================
// 蒙层移动
// =============================

const largeRef = ref(null)
const { elementX, elementY, isOutside } = useMouseInElement(largeRef)
const layerLeft = ref(0)
const layerTop = ref(0)
watch([elementX, elementY, isOutside], () => {
  if (isOutside.value) return

  // 横向
  if (elementX.value > 100 && elementX.value < 300) {
    layerLeft.value = elementX.value - 100
  } else if (elementX.value < 100) {
    layerLeft.value = 0
  } else {
    layerLeft.value = 200
  }

  //纵向
  if (elementY.value > 100 && elementY.value < 300) {
    layerTop.value = elementY.value - 100
  } else if (elementY.value < 100) {
    layerTop.value = 0
  } else {
    layerTop.value = 200
  }
})
</script>

<template>
  <div class="goods-image">
    <!-- 大图-->
    <div class="large" ref="largeRef">
      <img :src="imageList[activeIndex]" alt="" />
      <!-- 鼠标蒙层 -->
      <div
        class="layer"
        :style="{ left: `${layerLeft}px`, top: `${layerTop}px` }"
        v-show="!isOutside"
      ></div>
    </div>

    <!-- 小图 -->
    <ul class="small">
      <li
        v-for="(item, index) in imageList"
        :key="index"
        :class="{ active: index === activeIndex }"
        @mouseenter="imageAcitve(index)"
      >
        <img :src="item" alt="" />
      </li>
    </ul>

    <!-- 放大镜大图 -->
    <div
      class="magnifying"
      :style="[
        {
          backgroundImage: `url(${imageList[activeIndex]})`,
          backgroundPositionX: `${-layerLeft * 2}px`,
          backgroundPositionY: `${-layerTop * 2}px`
        }
      ]"
      v-show="!isOutside"
    ></div>
  </div>
</template>

<style scoped lang="scss">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;

  .large {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
  }

  .magnifying {
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    // 背景图:盒子的大小 = 2:1
    background-size: 800px 800px;
    background-color: #f8f8f8;
    background-repeat: no-repeat;
    position: absolute;
    left: 412px;
    top: 0;
    z-index: 500;
  }

  .layer {
    width: 200px;
    height: 200px;
    background: rgba(0, 0, 0, 0.2);
    position: absolute;
    left: 0;
    top: 0;
  }

  .small {
    width: 80px;

    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;

      // &:hover,
      &.active {
        border: 2px solid $xtxColor;
      }
    }
  }
}
</style>
