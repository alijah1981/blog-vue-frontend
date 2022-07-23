<template>
  <app-loader v-if="loading" />
  <app-page title="Блог" v-else>
    <template #header />

    <div class="head-btns">
      <button class="btn primary" @click="modal = true; ptype = 'Текст'; ptypeValue = 'text'">Создать запись текст</button>
      <button class="btn primary" @click="modal = true; ptype = 'Ссылка на изображение'; ptypeValue = 'image'" >Создать запись картинка</button>
      <button class="btn primary" @click="modal = true; ptype = 'Ссылка на видео youtube embed'; ptypeValue = 'video'" >Создать запись видео</button>
    </div>

    <request-table :requests="requests" :cuser="cuser"></request-table>

    <teleport to="body">
      <app-modal v-if="modal" title="Создать запись" @close="modal = false">
        <request-modal @created="modal = false" :ptype="ptype" :ptypeValue="ptypeValue" />
      </app-modal>
    </teleport>
  </app-page>
</template>

<script>
import {ref, computed, onMounted, watch} from 'vue'
import {useStore} from 'vuex'
import AppPage from '../components/ui/AppPage'
import RequestTable from '../components/request/RequestTable'
import RequestModal from '../components/request/RequestModal'
import AppModal from '../components/ui/AppModal'
import AppLoader from '../components/ui/AppLoader'

export default {
  setup() {
    const store = useStore()
    const loading = ref(false)

    const modal = ref(false)

    const ptype = ref()
    const ptypeValue = ref()

    const cuser = ref()

    onMounted(async () => {
      loading.value = true
      await store.dispatch('request/load')

      cuser.value = store.getters['auth/cuser']

      loading.value = false
    })

    const requests = computed(() => store.getters['request/requests'])

    return {
      modal,
      ptype,
      ptypeValue,
      requests,
      loading,
      cuser
    }
  },
  components: {
    AppPage, RequestTable, AppModal, RequestModal, AppLoader
  }
}
</script>
