/**
 * 页面使用(1.要把CSS引入2.在main.js注册3.就可以全局使用了)
 * this.$showToast.loading('正在加载')
 * this.$showToast.success('加载成功')
 * this.$showToast.fail('加载失败')
 * this.$showToast.hideShowToast()
 */
const showToast = {
    /**
     * @param {*} content 文字内容
     * @param {*} show 是否显示
     * @param {*} type 展示相应图标，支持 load / success / fail
     * @param {*} duration 显示时长，单位为 ms，默认 2800
     */
    // 弱提示(加载)
    loading(content = '正在加载') {
        let type = 'load'
        this.hint(content, type)
    },
    // 弱提示(成功)
    success(content = '操作成功', duration = 2800) {
        let type = 'success'
        this.hint(content, type, duration)
    },
    // 弱提示(失败)
    fail(content = '操作失败', duration = 2800) {
        let type = 'fail'
        this.hint(content, type, duration)
    },
    // 隐藏弱提示(加载、成功、失败)
    hideShowToast() {
        if (document.getElementById('toastLoaderFullScreen')) {
            document.body.removeChild(document.getElementById('toastLoaderFullScreen'))
        }
    },
    // 显示弱提示(成功、失败)
    hint(content = '', type = '', duration = '') {
        if (document.getElementById('toastLoaderFullScreen')) {
            document.body.removeChild(document.getElementById('toastLoaderFullScreen'))
        }
        // 容器
        let toastLoaderFullScreen = document.createElement('div')
        toastLoaderFullScreen.id = 'toastLoaderFullScreen'
        document.body.appendChild(toastLoaderFullScreen)

        // 遮罩
        let toastLoaderContent = document.createElement('div')
        toastLoaderContent.id = 'toastLoader_content'
        toastLoaderContent.className = 'toastLoader_toast_show'
        toastLoaderFullScreen.appendChild(toastLoaderContent)

        // 创建图片
        let img = document.createElement('img')
        switch (type) {
            case 'load':
                img.className = 'toastLoader_loadImg_content'
                img.src = './static/img/public/loading1.png'
                break
            case 'success':
                img.src = './static/img/public/success.png'
                break
            case 'fail':
                img.src = './static/img/public/fail.png'
                break
        }
        toastLoaderContent.appendChild(img)

        // 创建提示内容
        let toastLoaderText = document.createElement('div')
        toastLoaderText.id = 'toastLoaderText'
        toastLoaderText.innerHTML = content
        toastLoaderContent.appendChild(toastLoaderText)

        if (type !== 'load') { // 不是加载效果才会定时隐藏
            // 定时隐藏
            let timerDuration = setTimeout(() => {
                if (document.getElementById('toastLoader_content')) {
                    document.getElementById('toastLoader_content').className = 'toastLoader_toast_hide'
                }
                clearTimeout(timerDuration)
                let timerDuration1 = setTimeout(() => {
                    if (document.getElementById('toastLoaderFullScreen')) {
                        document.body.removeChild(document.getElementById('toastLoaderFullScreen'))
                    }
                    clearTimeout(timerDuration1)
                }, 200)
            }, duration)
        }
    }
}
export default {
    install(vue) {
        if (!vue.$showToast) {
            vue.$showToast = showToast
        }

        vue.mixin({
            created: function() {
                this.$showToast = vue.$showToast
            }
        })
    }
}
