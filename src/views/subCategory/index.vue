<script setup>
// 通用
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCategoryStore } from '@/stores'

// =============================
// 二级分类地址
// =============================

const route = useRoute()

const categoryStore = useCategoryStore()
categoryStore.getSubCategoryList(route.params.id)

// =============================
// 二级分类地址
// =============================

const reqData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime'
})
categoryStore.getGoodsTemporary(reqData)

// =============================
// tabChange回调
// =============================

const tabChange = () => {
  reqData.value.page = 1
  categoryStore.getGoodsTemporary(reqData)
}

// =============================
// 加载更多
// =============================

const scrollDisabled = ref(false)
const load = async () => {
  reqData.value.page++
  scrollDisabled.value = await categoryStore.loadMore(reqData)
}

// =============================
</script>

<template>
  <div class="container">
    <!-- 导航地址 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item
          :to="{ path: `/category/${categoryStore.subCategoryList.parentId}` }"
          >{{ categoryStore.subCategoryList.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          {{ categoryStore.subCategoryList.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div
        class="body"
        v-infinite-scroll="load"
        :infinite-scroll-disabled="scrollDisabled"
      >
        <!-- 商品列表-->
        <goodsItem
          v-for="item in categoryStore.goodsList"
          :key="item.id"
          :goods="item"
        ></goodsItem>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

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

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
