import { useIntersectionObserver } from '@vueuse/core' // 用于图片懒加载

// =============================
// 图片懒加载
// =============================

export const imgLazyPlugin = {
  install(app) {
    app.directive('img-lazy', {
      mounted(element, binding) {
        const { stop } = useIntersectionObserver(
          element,
          ([{ isIntersecting }]) => {
            // isIntersecting用于判断element是否进入视口
            if (isIntersecting) {
              element.src = binding.value
              stop() // 关闭监听，避免重复监听
            }
          }
        )
      }
    })
  }
}
