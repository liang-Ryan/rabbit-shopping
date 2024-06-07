import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// API
import { detailGetGoodsAPI } from '@/api/detail'

export const useDetailStore = defineStore('detailStore', () => {
  // =============================
  // 获取商品详情
  // =============================

  const goodsDetail = ref({})
  const getGoodsDetail = async (id) => {
    const {
      data: { result }
    } = await detailGetGoodsAPI(id)
    goodsDetail.value = result
    getSkuMap()
    inventoryEqualZero(goodsDetail.value.specs)
    getActiveSku(goodsDetail.value.specs)
  }

  // =============================
  // sku数据
  // =============================

  const activeSku = ref({})

  // 初始化sku
  const getActiveSku = (specs) => {
    specs.forEach((item) => {
      activeSku.value[item.name] = ''
    })
  }

  // 生成sku组合
  const activeSkuArr = computed(() => {
    const tempArr = []
    for (let key in activeSku.value) {
      tempArr.push(activeSku.value[key])
    }

    return tempArr
  })

  // =============================
  // 切换sku
  // =============================

  // 选中的sku对象
  let skuSelected = {}

  const switchSku = (type, sku) => {
    // 禁选无库存sku
    if (sku.disabled) {
      return
    }

    if (activeSku.value[type] !== sku.name) {
      // 获取选中sku
      activeSku.value[type] = sku.name
    } else {
      // 反选选中的sku
      activeSku.value[type] = ''
    }

    // 匹配sku对象
    if (
      activeSkuArr.value.findIndex((value) => {
        return value === ''
      }) === -1
    ) {
      const skuObject = goodsDetail.value.skus.find((item) => {
        return item.id === skuMap.value[activeSkuArr.value.join('-')][0]
      })
      skuSelected.skuId = skuObject.id
      skuSelected.price = skuObject.price
      skuSelected.oldPrice = skuObject.oldPrice
      skuSelected.inventory = skuObject.inventory
      skuSelected.specsText = skuObject.specs
        .reduce((p, n) => `${p} ${n.name}：${n.valueName}`, '')
        .trim()
    }

    // 无库存检测
    inventoryEqualZero(goodsDetail.value.specs, activeSkuArr.value)
  }

  // =============================
  // 缺货判断
  // =============================

  // 整理数据
  const skuMap = ref({})
  const getSkuMap = async () => {
    if (goodsDetail.value.skus) {
      // 筛选有货的sku
      const inventorySku = goodsDetail.value.skus.filter((item) => {
        return item.inventory > 0
      })

      if (inventorySku.length > 0) {
        // 获取有货的sku组合
        inventorySku.forEach((item) => {
          const valNameArr = item.specs.map((item) => {
            return item.valueName
          })

          // 获取幂集，并写入skuMap
          setSkuMap(valNameArr).forEach((array) => {
            const key = array.join('-')
            if (skuMap[key]) {
              skuMap[key].push(item.id)
            } else {
              skuMap.value[key] = [item.id]
            }
          })
        })
      }
    }
  }

  // 对比数据
  const inventoryEqualZero = (specs, selected) => {
    specs.forEach((spec, index) => {
      let acitve = [] // sku组合无货
      if (selected) {
        acitve = [...selected] // sku组合无货
      }
      spec.values.forEach((sku) => {
        if (selected && activeSku.value[spec.name] !== sku.name) {
          // sku组合无货
          acitve[index] = sku.name
          const key = acitve?.filter((value) => value).join('-')
          sku.disabled = !skuMap.value[key]
        } else {
          // 单个sku无货
          sku.disabled = !skuMap.value[sku.name]
        }
      })
    })
  }

  // =============================
  // 获取幂集
  // =============================

  const setSkuMap = (array) => {
    const skuMapPath = []
    for (let multiSku = 0; multiSku < 2 ** array.length; multiSku++) {
      const tempArr = []
      for (let singleSku = 0; singleSku < array.length; singleSku++) {
        if (multiSku & (1 << singleSku)) {
          tempArr.push(array[singleSku])
        }
      }

      if (tempArr.length > 0) {
        skuMapPath.push(tempArr)
      }
    }
    return skuMapPath
  }

  // =============================

  return {
    // 获取商品详情
    goodsDetail,
    getGoodsDetail,
    // sku数据
    activeSku,
    activeSkuArr,
    // 切换sku
    switchSku,
    skuSelected,
    // 缺货判断
    inventoryEqualZero
  }
})
