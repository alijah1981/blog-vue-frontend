<template>
  <form class="card" @submit.prevent="onSubmit">
    <h1>Блог - Регистрация</h1>

    <div :class="['form-control', {invalid: lError}]">
      <label for="login">Логин</label>
      <input type="text" id="login" v-model="login" @blur="lBlur">
      <small v-if="lError">{{ lError }}</small>
    </div>

    <div :class="['form-control', {invalid: pError}]">
      <label for="password">Пароль</label>
      <input type="text" id="password" v-model="password" @blur="pBlur">
      <small v-if="pError">{{ pError }}</small>
    </div>

    <button class="btn primary" type="submit" :disabled="isSubmitting">Зарегистрироваться</button>

    <router-link to="/auth">Войти</router-link>

  </form>
</template>

<script>
import {useRouter} from 'vue-router'
// import {useStore} from 'vuex'
import {error} from '../utils/error'
import {useRegisterForm} from '../use/register-form'

document.title = `Регистрация | Блог`

export default {
  setup() {
    /*
    const route = useRoute()
    const store = useStore()

    if (route.query.message) {
      store.dispatch('setMessage', {
        value: error(route.query.message),
        type: 'warning'
      })
    }
    */
    return {...useRegisterForm()}
  }
}
</script>
