<template>
  <form class="card" @submit.prevent="onSubmit">
    <h1>Блог - Войти</h1>

    <div :class="['form-control', {invalid: lError}]">
      <label for="login">Логин</label>
      <input type="login" id="login" v-model="login" @blur="lBlur">
      <small v-if="lError">{{ lError }}</small>
    </div>

    <div :class="['form-control', {invalid: pError}]">
      <label for="password">Пароль</label>
      <input type="password" id="password" v-model="password" @blur="pBlur" autocomplete="on">
      <small v-if="pError">{{ pError }}</small>
    </div>

    <button class="btn primary" type="submit" :disabled="isSubmitting || isTooManyAttempts">Войти</button>
    <div class="text-danger" v-if="isTooManyAttempts">
      Вы слишком часто пытаетесь войти в систему. Попробуйте позже.
    </div>

    <router-link to="/register">Регистрация</router-link>

  </form>
</template>

<script>
import {useRoute, useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {error} from '../utils/error'
import {useLoginForm} from '../use/login-form'

document.title = `Войти | Блог`

export default {
  setup() {
    const route = useRoute()
    const store = useStore()

    if (route.query.message) {
      store.dispatch('setMessage', {
        value: error(route.query.message),
        type: 'warning'
      })
    }
    return {...useLoginForm()}
  }
}
</script>
