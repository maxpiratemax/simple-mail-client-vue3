<template>
  <div class="email-display">
    <div>
      <button :class="btnArchive ? 'btn-animation' : ''" @click="toggleArchive">{{email.archived ? 'Move to Inbox (e)' : 'Archive (e)'}}</button>
      <button :class="btnRead ? 'btn-animation' : ''" @click="toggleRead">{{email.read ? 'Mark Unread (r)' : 'Mark Read (r)'}}</button>
      <button :class="btnPrev ? 'btn-animation' : ''" @click="togglePrev">Prev (j)</button>
      <button :class="btnNext ? 'btn-animation' : ''" @click="toggleNext">Next (k)</button>
    </div>
    <h2 class="mb-0">Subject: <strong>{{email.subject}}</strong></h2>
    <div><em>From {{email.from}} on {{format(new Date(email.sentAt), 'MMM do yyyy')}}</em></div>
    <div class="mail-body" v-html="email.body"></div>
  </div>
</template>

<script>
import { format } from 'date-fns'
import { marked } from 'marked'
import useKeyDown from '../composables/use-keydown'
import {supabase} from '@/supabase/init'
import {ref} from 'vue'

export default {
  setup(props, { emit }) {
    let btnRead = ref(true)
    let btnArchive = ref(true)
    let btnNext = ref(true)
    let btnPrev = ref(true)
    let email = props.email
    email.body = email.body.replaceAll('\\n', '\n')

    function toggleAnimation(btn){
      btn.value = !btn.value
      setTimeout(() => {btn.value = !btn.value}, 0)
    }

    let toggleNext = () => { 
      toggleAnimation(btnNext)
      return emit('changeEmail', { changeIndex: 1 }) 
    }
    let togglePrev = () => { 
      toggleAnimation(btnPrev)
      emit('changeEmail', { changeIndex: -1 }) }

    let toggleRead = async () => {
      email.read = !email.read
      // axios.put(`http://localhost:3000/emails/${email.id}`, email)
      toggleAnimation(btnRead)
      const { error } = await supabase
        .from('emails')
        .update(email)
        .eq('id', email.id)
    }

    let toggleArchive = async () => {
      email.archived = !email.archived
      // axios.put(`http://localhost:3000/emails/${email.id}`, email)
      toggleAnimation(btnArchive)
      const { error } = await supabase
        .from('emails')
        .update(email)
        .eq('id', email.id)
    }

    useKeyDown([
      { key: 'r', fn: toggleRead },
      { key: 'к', fn: toggleRead },
      { key: 'e', fn: toggleArchive },
      { key: 'k', fn: toggleNext },
      { key: 'j', fn: togglePrev },
    ])
    return {
      btnRead,
      btnArchive,
      btnPrev,
      btnNext,
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
.mail-body {
  margin-top: 120px;
  overflow-x: hidden;
}
@keyframes blink {
      0% { background-color: #87898f}
      50% { background-color: #ebc6a4}
      100% { background-color: #ebc6a4}
      }
.btn-animation{
  animation: blink 300ms ease;
}

/* .blink-enter-from,
.blink-leave-to {
  opacity: 0;
} */
</style>