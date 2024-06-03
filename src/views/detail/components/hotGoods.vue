<script setup>
// 通用
import { ref } from 'vue'

// API
import { detailGetHotGoodsAPI } from '@/api/detail'

// =============================
// 父组件传入参数
// =============================

const props = defineProps({
  id: {
    type: [Number, String]
  },
  type: {
    type: [Number, String]
  },
  title: {
    type: String
  }
})

// =============================
// 获取热榜商品
// =============================

const hotGoodsList = ref([])
const gethotGoodsList = async ({ id, type }) => {
  const {
    data: { result }
  } = await detailGetHotGoodsAPI({ id, type })
  hotGoodsList.value = result
}
gethotGoodsList({
  id: props.id,
  type: props.type
})
</script>

<template>
  <div class="goods-hot">
    <h3>{{ title }}</h3>
    <!-- 商品区块 -->
    <RouterLink
      :to="`/detail/${item.id}`"
      class="goods-item"
      v-for="item in hotGoodsList"
      :key="item.id"
    >
      <img :src="item.picture" alt="" />
      <p class="name ellipsis">{{ item.name }}</p>
      <p class="desc ellipsis">{{ item.desc }}</p>
      <p class="price">&yen;{{ item.price }}</p>
    </RouterLink>
  </div>
</template>

<style scoped lang="scss">
.goods-hot {
  h3 {
    height: 70px;
    background: $helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }

  .goods-item {
    display: block;
    padding: 20px 30px;
    text-align: center;
    background: #fff;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }
}
</style>
