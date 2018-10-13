var nextIndex = function(slide, offset) {
    // 得到图片总数和当前图片下标
    var numberOfImgs = Number(slide.dataset.imgs)
    var activeIndex = Number(slide.dataset.active)
    // 求出下一张图片的 id
    var index = (activeIndex + offset + numberOfImgs) % numberOfImgs
    return index
}

var bindEventSlide = function() {
    var selector = '.aka-slide-button'
    bindAll(selector, 'click', function(event) {
        log('click next')
        var self = event.target
        // 找到 slide div
        var slide = self.parentElement
        var offset = Number(self.dataset.offset)
        // 计算出下一张图片的 index
        var index = nextIndex(slide, offset)
        // 显示下一张图片
        showImageAtIndex(slide, index)
    })
}

var showImageAtIndex = function(slide, index) {
    // 防止耦合过深
    var nextIndex = index
    // 切换图片
    // 设置父节点的 data-active
    slide.dataset.active = nextIndex
    // 删除当前图片的 class 给下一张图片加上 class
    var className = 'aka-active'
    removeClassAll(className)
    // 得到下一张图片的选择器
    var nextSelector = '#id-akaimage-' + String(nextIndex)
    var img = e(nextSelector)
    img.classList.add(className)

    // 切换小圆点
    // 删除当前小圆点的 class
    var indicatorClassName = 'aka-white'
    removeClassAll(indicatorClassName)
    // 得到下一个小圆点的选择器
    var indicatorSelector = '#id-indicator-' + String(nextIndex)
    var indicator = e(indicatorSelector)
    indicator.classList.add(indicatorClassName)
}

var bindEventIndicator = function() {
    var selector = '.aka-slide-indi'
    bindAll(selector, 'mouseover', function(event) {
        log('indicator in mouseover')
        var self = event.target
        var index = Number(self.dataset.index)
        log('index', index, typeof index)
        // 直接播放第 n 张图片
        var slide = self.closest('.aka-slide')
        showImageAtIndex(slide, index)
    })
}

var playNextImage = function() {
    var slide = e('.aka-slide')
    // 求出下一张图片的 index
    var offset = 1
    var index = nextIndex(slide, offset)
    showImageAtIndex(slide, index)
}

var autoPlay = function() {
    var interval = 2000
    setInterval(function() {
        playNextImage()
    }, interval)
}

var __main = function() {
    bindEventSlide()
    bindEventIndicator()
    autoPlay()
}

__main()
