<template>
  <nav class="navbar">
    <h3>{{cuser}}</h3>

    <ul class="navbar-menu">
      <li>
        <a href="#" @click.prevent="logout">Выход</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import {computed} from 'vue'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'

export default {
  setup() {
    const router = useRouter()
    const store = useStore()

    const cuser = computed(() => {
      return store.getters['auth/cuser']
    })

    return {
      logout: () => {
        store.commit('auth/logout')
        document.title = `Войти | Блог`
        router.push('/auth')
      },
      cuser
    }
  }
}
</script>
