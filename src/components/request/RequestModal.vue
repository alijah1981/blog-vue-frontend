<template>
  <div class="modal-inner">
    <form @submit.prevents="onSubmit">

      <div :class="['form-control', {invalid: tError}]">
        <label for="title">Заголовок</label>
        <input id="title" type="text" v-model="title" @blur="tBlur">
        <small v-if="tError">{{tError}}</small>
      </div>

      <div class="form-control" :class="{invalid: cError}">
        <label for="content">{{ptype}}</label>
        <textarea id="content" rows="3" v-model="content" @blur="cBlur"/>
        <small v-if="cError">{{cError}}</small>
      </div>

      <button class="btn primary" :disabled="isSubmitting">Создать</button>
    </form>
  </div>
</template>

<script>
import {useRequestForm} from '../../use/request-form'
import {useStore} from 'vuex'

export default {
    emits: ['created'],
    props: ['ptype', 'ptypeValue'],
    setup(_, {emit}) {
      const store = useStore()

      // submit передаем в request-form как параметр
      // там он будет использоваться в handleSubmit(fn)
      const submit = async values => {
        const values1 = {
          ...values,
          postType: _.ptypeValue
        }
        await store.dispatch('request/create', values1)
        emit('created')
      }

      return {
        ...useRequestForm(submit)
      }
    }
}
</script>
