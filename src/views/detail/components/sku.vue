<script setup>
import { useDetailStore } from '@/stores'

// =============================
// 获取商品详情
// =============================

const detailStore = useDetailStore()
</script>

<template>
  <div class="goods-sku">
    <dl v-for="item in detailStore.goodsDetail.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <!-- 图片类型规格 -->
          <img
            v-if="val.picture"
            :class="{
              active: val.name === detailStore.activeSku[item.name],
              disabled: val.disabled
            }"
            :src="val.picture"
            :title="val.name"
            @click="detailStore.switchSku(item.name, val)"
          />

          <!-- 文字类型规格 -->
          <span
            v-else
            :class="{
              active: val.name === detailStore.activeSku[item.name],
              disabled: val.disabled
            }"
            @click="detailStore.switchSku(item.name, val)"
            >{{ val.name }}</span
          >
        </template>
      </dd>
    </dl>
  </div>
</template>

<style scoped lang="scss">
@mixin sku-state-mixin {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;

  &.active {
    border-color: #27ba9b;
  }

  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}

.goods-sku {
  padding-left: 10px;
  padding-top: 20px;

  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;

    dt {
      width: 50px;
      color: #999;
    }

    dd {
      flex: 1;
      color: #666;

      > img {
        width: 50px;
        height: 50px;
        margin-bottom: 4px;
        @include sku-state-mixin;
      }

      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        margin-bottom: 4px;
        @include sku-state-mixin;
      }
    }
  }
}
</style>
