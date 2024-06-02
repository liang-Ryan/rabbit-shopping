<script setup>
// 通用
import { useRoute } from 'vue-router'
import { onBeforeRouteUpdate } from 'vue-router' // 监听路由变化
import { useCategoryStore } from '@/stores'

// =============================
// 轮播图数据
// =============================

const categoryStore = useCategoryStore()
categoryStore.getCategoryBannerList()

// =============================
// 二级分类列表数据
// =============================

const route = useRoute()

categoryStore.getCategoryList(route.params.id)
onBeforeRouteUpdate((to) => {
  // to为目标路由对象
  categoryStore.getCategoryList(to.params.id)
})
</script>

<template>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 导航地址 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{
            categoryStore.categoryList.name
          }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <!-- 轮播图 -->
      <div class="home-banner">
        <el-carousel height="500px">
          <el-carousel-item
            v-for="item in categoryStore.categoryBannerList"
            :key="item.id"
          >
            <img :src="item.imgUrl" alt="" />
          </el-carousel-item>
        </el-carousel>
      </div>

      <!-- 全部分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li
            v-for="item in categoryStore.categoryList.children"
            :key="item.id"
          >
            <RouterLink :to="`/category/sub/${item.id}`">
              <img :src="item.picture" />
              <p>{{ item.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
      <!-- 商品内容 -->
      <div
        class="ref-goods"
        v-for="item in categoryStore.categoryList.children"
        :key="item.id"
      >
        <div class="head">
          <h3>- {{ item.name }}-</h3>
        </div>
        <div class="body">
          <goodsItem
            v-for="goods in item.goods"
            :goods="goods"
            :key="goods.id"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;

        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    .body {
      display: flex;
      justify-content: space-around;
      padding: 0 40px 30px;
    }
  }

  .bread-container {
    padding: 25px 0;
  }
}

.home-banner {
  width: 1240px;
  height: 500px;
  margin: 0 auto;

  img {
    width: 100%;
    height: 500px;
  }
}
</style>
