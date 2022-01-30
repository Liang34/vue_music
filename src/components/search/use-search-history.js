// 用户搜索历史记录hook
// import { saveSearch, deleteSearch, clearSearch } from 'common/js/cache'
import { useStore } from 'vuex'

export default function useSearchHistory () {
  const store = useStore()

  function save (query) {
    store.dispatch('saveSearchHistory', query)
  }
  function deleteSearch (query) {
    store.dispatch('deleteSearchHistory', query)
  }

  function remove () {
    store.dispatch('clearSearchHistory')
  }
  return {
    save,
    deleteSearch,
    remove
  }
}
