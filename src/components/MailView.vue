<template>
  <div class="email-display">
    <div>
      <button @click="toggleArchive">{{email.archived ? 'Move to Inbox (e)' : 'Archive (e)'}}</button>
      <button @click="toggleRead">{{email.read ? 'Mark Unread (r)' : 'Mark Read (r)'}}</button>
      <button @click="togglePrev">Prev (j)</button>
      <button @click="toggleNext">Next (k)</button>
    </div>
    <h2 class="mb-0">Subject: <strong>{{email.subject}}</strong></h2>
    <div><em>From {{email.from}} on {{format(new Date(email.sentAt), 'MMM do yyyy')}}</em></div>
    <div v-html="marked(email.body)"></div>
  </div>
</template>

<script>
import { format } from 'date-fns'
import marked from 'marked'
import axios from 'axios'
import useKeyDown from '../composables/use-keydown'

export default {
  setup(props, {emit}) {
    let email = props.email
    let toggleNext = () => {emit('changeEmail', {changeIndex: 1})}
    let togglePrev = () => {emit('changeEmail', {changeIndex: -1})}

    let toggleRead = () => {
      email.read = !email.read
      axios.put(`http://localhost:3000/emails/${email.id}`, email)
    }

    let toggleArchive = () => {
      email.archived = !email.archived
      axios.put(`http://localhost:3000/emails/${email.id}`, email)
    }

    useKeyDown([
      { key: 'r', fn: toggleRead },
      { key: 'к', fn: toggleRead },
      { key: 'e', fn: toggleArchive },
      { key: 'k', fn: toggleNext },
      { key: 'j', fn: togglePrev },
    ])
    return {
      format,
      marked,
      toggleRead,
      toggleArchive,
      toggleNext,
      togglePrev
    }
  },
  props: {
    email: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>