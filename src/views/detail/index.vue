<script setup>
import { ref, computed, watch } from 'vue'
import { useDetailStore } from '@/stores'
import { useCartStore } from '@/stores/modules/cart'
import { useRoute } from 'vue-router'

// 组件
import hotGoods from './components/hotGoods.vue'
import imageView from './components/imageView.vue'
import sku from './components/sku.vue'
import { ElMessage } from 'element-plus'

// =============================
// computed
// =============================

const detailStore = useDetailStore()
const goods = computed(() => {
  return detailStore.goodsDetail
})

// =============================
// 获取商品详情
// =============================

const route = useRoute()

detailStore.getGoodsDetail(route.params.id)

watch(
  () => route.path,
  () => {
    detailStore.getGoodsDetail(route.path.match(/\d+$/)[0])
  }
)

// =============================
// 加入购物车
// =============================

const cartStore = useCartStore()

// 购买数量
const count = ref(1)

const addToCart = () => {
  if (detailStore.skuSelected.skuId) {
    cartStore.addCart({
      id: goods.value.id,
      name: goods.value.name,
      picture: goods.value.mainPictures[0],
      price: goods.value.price,
      count: count.value,
      skuId: detailStore.skuSelected.skuId,
      attrsText: detailStore.skuSelected.specsText,
      selected: true
    })
    ElMessage.success('成功添加到购物车')
  } else {
    ElMessage.warning('请先选择商品规格')
  }
}
</script>

<template>
  <div class="xtx-goods-page">
    <div class="container">
      <!-- 导航地址 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item
            :to="{
              path: `/category/${goods.categories?.[1].id}`
            }"
            >{{ goods.categories?.[1].name }}</el-breadcrumb-item
          >
          <el-breadcrumb-item
            :to="{
              path: `/category/sub/${goods.categories?.[0].id}`
            }"
            >{{ goods.categories?.[0].name }}</el-breadcrumb-item
          >
          <el-breadcrumb-item>{{ goods.desc }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <!-- 商品信息 -->
      <div class="info-container">
        <div>
          <div class="goods-info">
            <div class="media">
              <!-- 图片预览区 -->
              <imageView :imageList="goods.mainPictures"></imageView>

              <!-- 统计数量 -->
              <ul class="goods-sales">
                <li>
                  <p>销量人气</p>
                  <p>{{ goods.salesCount }}</p>
                  <p><i class="iconfont icon-task-filling"></i>销量人气</p>
                </li>
                <li>
                  <p>商品评价</p>
                  <p>{{ goods.commentCount }}</p>
                  <p><i class="iconfont icon-comment-filling"></i>查看评价</p>
                </li>
                <li>
                  <p>收藏人气</p>
                  <p>{{ goods.collectCount }}</p>
                  <p><i class="iconfont icon-favorite-filling"></i>收藏商品</p>
                </li>
                <li>
                  <p>品牌信息</p>
                  <p>{{ goods.brand?.name }}</p>
                  <p><i class="iconfont icon-dynamic-filling"></i>品牌主页</p>
                </li>
              </ul>
            </div>

            <!-- 商品信息区 -->
            <div class="spec">
              <p class="g-name">{{ goods.name }}</p>
              <p class="g-desc">{{ goods.desc }}</p>
              <p class="g-price">
                <span>{{ goods.price }}</span>
                <span>{{ goods.oldPrice }}</span>
              </p>
              <div class="g-service">
                <dl>
                  <dt>促销</dt>
                  <dd>12月好物放送，App领券购买直降120元</dd>
                </dl>
                <dl>
                  <dt>服务</dt>
                  <dd>
                    <span>无忧退货</span>
                    <span>快速退款</span>
                    <span>免费包邮</span>
                    <a href="javascript:;">了解详情</a>
                  </dd>
                </dl>
              </div>

              <!-- sku -->
              <sku></sku>

              <!-- 数据组件 -->
              <el-input-number v-model="count" :min="1" />

              <!-- 按钮组件 -->
              <div>
                <el-button size="large" class="btn" @click="addToCart">
                  加入购物车
                </el-button>
              </div>
            </div>
          </div>
          <div class="goods-footer">
            <!-- 商品详情 -->
            <div class="goods-article">
              <div class="goods-tabs">
                <nav>
                  <a>商品详情</a>
                </nav>
                <div class="goods-detail">
                  <!-- 文字详情 -->
                  <ul class="attrs">
                    <li
                      v-for="item in goods.details?.properties"
                      :key="item.name"
                    >
                      <span class="dt">{{ item.name }}</span>
                      <span class="dd">{{ item.value }}</span>
                    </li>
                  </ul>

                  <!-- 图片详情 -->
                  <img
                    v-for="image in goods.details?.pictures"
                    :src="image"
                    alt=""
                    :key="image"
                  />
                </div>
              </div>
            </div>

            <!-- 热榜+专题推荐 -->
            <div class="goods-aside">
              <!-- 24小时热榜 -->
              <hotGoods
                :id="route.params.id"
                type="1"
                title="24小时热榜"
              ></hotGoods>
              <!-- 周热榜 -->
              <hotGoods
                :id="route.params.id"
                type="2"
                title="周热榜"
              ></hotGoods>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.xtx-goods-page {
  .goods-info {
    min-height: 600px;
    background: #fff;
    display: flex;

    .media {
      width: 580px;
      height: 600px;
      padding: 30px 50px;
    }

    .spec {
      flex: 1;
      padding: 30px 30px 30px 0;
    }
  }

  .goods-footer {
    display: flex;
    margin-top: 20px;

    .goods-article {
      width: 940px;
      margin-right: 20px;
    }

    .goods-aside {
      width: 280px;
      min-height: 1000px;
    }
  }

  .goods-tabs {
    min-height: 600px;
    background: #fff;
  }

  .goods-warn {
    min-height: 600px;
    background: #fff;
    margin-top: 20px;
  }

  .number-box {
    display: flex;
    align-items: center;

    .label {
      width: 60px;
      color: #999;
      padding-left: 10px;
    }
  }

  .g-name {
    font-size: 22px;
  }

  .g-desc {
    color: #999;
    margin-top: 10px;
  }

  .g-price {
    margin-top: 10px;

    span {
      &::before {
        content: '¥';
        font-size: 14px;
      }

      &:first-child {
        color: $priceColor;
        margin-right: 10px;
        font-size: 22px;
      }

      &:last-child {
        color: #999;
        text-decoration: line-through;
        font-size: 16px;
      }
    }
  }

  .g-service {
    background: #f5f5f5;
    width: 500px;
    padding: 20px 10px 0 10px;
    margin-top: 10px;

    dl {
      padding-bottom: 20px;
      display: flex;
      align-items: center;

      dt {
        width: 50px;
        color: #999;
      }

      dd {
        color: #666;

        &:last-child {
          span {
            margin-right: 10px;

            &::before {
              content: '•';
              color: $xtxColor;
              margin-right: 2px;
            }
          }

          a {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .goods-sales {
    display: flex;
    width: 400px;
    align-items: center;
    text-align: center;
    height: 140px;

    li {
      flex: 1;
      position: relative;

      ~ li::after {
        position: absolute;
        top: 10px;
        left: 0;
        height: 60px;
        border-left: 1px solid #e4e4e4;
        content: '';
      }

      p {
        &:first-child {
          color: #999;
        }

        &:nth-child(2) {
          color: $priceColor;
          margin-top: 10px;
        }

        &:last-child {
          color: #666;
          margin-top: 10px;

          i {
            color: $xtxColor;
            font-size: 14px;
            margin-right: 2px;
          }

          &:hover {
            color: $xtxColor;
            cursor: pointer;
          }
        }
      }
    }
  }
}

.goods-tabs {
  min-height: 600px;
  background: #fff;

  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;

    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;

      > span {
        color: $priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
    }
  }
}

.goods-detail {
  padding: 40px;

  .attrs {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;

    li {
      display: flex;
      margin-bottom: 10px;
      width: 50%;

      .dt {
        width: 100px;
        color: #999;
      }

      .dd {
        flex: 1;
        color: #666;
      }
    }
  }

  > img {
    width: 100%;
  }
}

.btn {
  margin-top: 20px;
}

.bread-container {
  padding: 25px 0;
}
</style>
