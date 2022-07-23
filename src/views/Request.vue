<template>
  <app-loader v-if="loading" />
  <app-page back :title="'Запись id ' + request.id" v-else-if="request">

    <div class="form-control">
      <label for="title">Заголовок</label>
      <input type="text" id="title" v-model="title">
    </div>

    <div class="form-control">
      <label for="content">Содержание</label>
      <textarea id="content" rows="4" v-model="content">{{request.content}}</textarea>
    </div>

    <button class="btn danger" @click="remove">Удалить</button>
    <button class="btn" @click="update" v-if="hasChanges">Обновить</button>
  </app-page>

  <h3 v-else class="text-center text-white">
    Записи с ID = {{$route.params.id}} нет.
  </h3>

</template>

<script>
import {ref, onMounted, computed} from 'vue'
import {useStore} from 'vuex'
import {useRoute, useRouter} from 'vue-router'
import AppPage from '../components/ui/AppPage'
import AppLoader from '../components/ui/AppLoader'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const loading = ref(true)
    const request = ref({})

    const title = ref()
    const content = ref()

    // watch(title, val => {  console.log('title: ', val)  })
    // console.log(route.params.id)

    onMounted(async () => {
      loading.value = true

      request.value = await store.dispatch('request/loadOne', route.params.id)
      // request.value?.title - проверка,
      // выполняется только если такое значение есть
      title.value = request.value?.title
      content.value = request.value?.content

      loading.value = false
    })

    const hasChanges = computed(() => {
      return (request.value.title !== title.value || request.value.content !== content.value)
    })

    const remove = async () => {
      await store.dispatch('request/remove', route.params.id)
      router.push('/')
    }

    const update = async () => {
      const data = {
        ...request.value,
        title: title.value,
        content: content.value
      }
      await store.dispatch('request/update', data)
      request.value.title = title.value
      request.value.content = content.value
    }

    return {
      loading, request, remove, update, hasChanges,
      title,
      content
    }
  },
  components: {AppPage, AppLoader}
}
</script>
