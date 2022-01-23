<template>
  <div class="singer" ref="singer">
    <list-view :data="this.singers"></list-view>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import { getSingers } from 'service/singer'
import Singer from 'common/js/singer'
import listView from 'components/list-view/list-view'
const pinyin = require('pinyin')

const HOT_NAME = '热门'
const HOT_SINGERS = 10
export default {
  data () {
    return {
      singers: []
    }
  },
  created () {
    this._getSingers()
  },
  methods: {
    async _getSingers () {
      const res = await getSingers()
      const s = res.artists
      s.map((item) => {
        // console.log(pinyin("中心"));// [ [ 'zhōng' ], [ 'xīn' ] ]
        const py = pinyin(item.name[0], {
          style: pinyin.STYLE_FIRST_LETTER
        })
        item.initial = py[0][0].toUpperCase()
      })
      // console.log(s)
      this.singers = this._normalizeSinger(s)
    },
    _normalizeSinger (list) {
      const map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGERS) {
          map.hot.items.push(new Singer({
            id: item.id,
            name: item.name,
            avatar: item.img1v1Url,
            aliaName: item.alias.join('/')
          }))
        }
        // 将歌手分类排序
        const key = item.initial
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          id: item.id,
          name: item.name,
          avatar: item.img1v1Url,
          aliaName: item.alias[0]
        }))
      })
      const hot = []
      const ret = []
      for (const key in map) {
        const val = map[key]
        if (val.title.match(/[A-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    }
  },
  components: {
    listView
  }
}
</script>

<style lang="scss" scope>
  .singer {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
  }
</style>
