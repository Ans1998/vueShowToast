<style>
    #toastLoaderFullScreen {
        font-size: 62.5%;
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0px;
        bottom: 0px;
        z-index: 99999;
        overflow: hidden;
        word-break: break-all;
        background-color: transparent;
    }
    /* 遮罩 */
    #toastLoader_content {
        width: 8rem;
        text-align: center;
        border-radius: 0.5rem;
        position: fixed;
        top: 40%;
        left: 50%;
        margin-left: -4rem;
        z-index: 99999;
        /* background:hsla(0, 40%, 100%, 0.5); */
        /* background: hsl(0, 20%, 90%); */
        background: rgba(0, 0, 0, 0.7);
    }
    /* 图片 */
    #toastLoader_content img {
        width: 3.3rem;
        height: 3.3rem;
        margin-top: 0.5rem;
    }
    /* 加载图片 */
    .toastLoader_loadImg_content {
        width: 2rem !important; 
        height: 2rem !important; 
        margin: 1.1rem 0 0.6rem 0 !important;
        animation: loadImg 3.5s infinite;
    }
    /* 加载动画 */
     @keyframes loadImg {
        0% {
            transform: rotate(0);
            animation-timing-function: linear;
        }
        50% {
            transform: rotate(900deg);
            animation-timing-function: linear;
        }
        100% {
            transform: rotate(1800deg);
            animation-timing-function: linear;
        }
    }
    /* 图标 */
    #toastLoader_content .material-icons {
        /* margin-top: 1rem; */
        animation: oastLoaderIconsShow ease 800ms;
    }
    /* 图标显示动画 */
    @keyframes oastLoaderIconsShow {
        0% {
            opacity: 0;
            transform: translate3d(0, 10, 0) scale(0);
        }
        100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
        }
    }

    /*提示框显示动画*/
    .toastLoader_toast_show {
        animation: oastLoaderToastShow ease 800ms;
    }
    @keyframes oastLoaderToastShow {
        0% {
            opacity: 0;
            transform: translate3d(0, 10, 0) scale(0);
        }
        100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
        }
    }
    /*提示框隐藏动画  暂时用不到*/
    .toastLoader_toast_hide {
        animation: oastLoaderToastHide ease 800ms;
    }
    @keyframes oastLoaderToastHide {
        0% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate3d(0, 0, 0) scale(0);
        }
    }
    /* 提示文字 */
    #toastLoaderText {
        margin: 0 0.5rem 0.5rem 0.5rem;
        word-wrap: break-word; /*自动换行*/
        text-align: center;
        font-size: 0.8rem;
        color: #fff;
        /* background-color: red; */
    }
</style>
<template>
    <div id="toastLoaderFullScreen" v-show="childToastLoader" @click="closeDialog">
        <div id="toastLoader_content"  :class="childToastLoader ? 'toastLoader_toast_show' : 'toastLoader_toast_hide'">
            <img class="toastLoader_loadImg_content" v-if="isToastLoaderStyle === 'load'" :src="imagesUrl.loading"/>
            <img v-if="isToastLoaderStyle === 'success'" :src="imagesUrl.success"/>
            <img v-if="isToastLoaderStyle === 'fail'" :src="imagesUrl.fail"/>

            <div id="toastLoaderText">
                {{loaderTitle}}
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'lickLoading',
        props: {
            loaderTitle: { // 文字
                type: String,
                default: '正在加载'
            },
            isToastLoader: { // 遮罩是否显示
                type: Boolean,
                default: true
            },
            isToastLoaderStyle: { // 加载动画(加载load、成功success、失败fail)
                type: String,
                default: 'load'
                // default: 'success'
            },
            isToastLoaderClose: { // 默认是不可以点击屏幕关闭的
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                imagesUrl: { // 排版图片使用懒加载
                    loading: './static/img/public/loading1.png', // 加载图标
                    success: './static/img/public/success.png', // 成功图标
                    fail: './static/img/public/fail.png' // 失败图标
                },
                childToastLoader: this.isToastLoader // 遮罩是否显示(需要监听值变化)
            }
        },
        // 监听父组件传过来的值(遮罩框是否显示)
        watch: {
            isToastLoader() {
                // console.log(this.isToastLoader)
                this.childToastLoader = this.isToastLoader
            }
        },
        created() {
        },
        methods: {
            closeDialog() {
                // 判断是否可以关闭遮罩
                console.log('点击弹框' + this.isToastLoaderClose)
            }
        }
    }
</script>