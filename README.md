项目介绍：



项目的优化：

- 使用路由懒加载是首屏的渲染速度加快，使用v-lazy图片懒加载优化用户体验

项目遇到的问题：

- better-scroll无法滚动，查了资料原来是是初始化时机不对， 只有content的高度大于wrapper高度时候，才可以滚动。 这里有两种解决方案，一是使用$nextTick(),还有一种是setTimeOut回调延迟20毫秒，浏览器刷新时间是17毫秒。

```js
this.$nextTick(() => {
    if (!this.scroll) {
		this._initScroll()
    }
 })
```

```js
setTimeout(() => {
   this._initScroll()
}, 20)
```

其他滚动无效的原因：https://blog.csdn.net/qiqi_77_/article/details/79361413 