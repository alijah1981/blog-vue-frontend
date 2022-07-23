<template>
  <h4 v-if="requests.length === 0" class="text-center">Записей пока нет</h4>

  <div v-else class="posts-div">
    <div class="post" v-for="(r, idx) in requests" :key="r.id">
      <p class="post-title">{{ r.title }}</p>

      <p class="post-text" v-if="r.postType == 'text'">{{ r.content }}</p>

      <img class="post-image" v-if="r.postType == 'image'" :src="r.content">

      <iframe class="post-video" v-if="r.postType == 'video'" :src="r.content"/>

      <div class="post-fb">
        <p>{{ toDate(r.updatedAt) }}</p>
        <p>{{ r.userId }}</p>
      </div>

      <router-link v-if="cuser === r.userId" v-slot="{navigate}" custom :to="{name: 'Request', params: {id: r.id}}">
        <button class="btn-mini" @click="navigate">Изменить</button>
      </router-link>
    </div>
  </div>

</template>

<script>

import {toDate} from '../../utils/toDate'

export default {
  props: ['requests', 'cuser'],
  setup() {
    return {toDate}
  },
}
</script>
