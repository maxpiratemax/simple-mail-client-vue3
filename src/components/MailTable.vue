<template>
  {{filteredEmails}}
  <button @click="selectScreen('inbox')" :disabled="selectedScreen == 'inbox'"
    :class="selectedScreen == 'inbox' ? 'orange' : ''">Inbox</button>
  <button @click="selectScreen('archive')" :disabled="selectedScreen == 'archive'"
    :class="selectedScreen == 'archive' ? 'orange' : ''">Archived</button>

  <template v-if="filteredEmails.length > 0">
    <bulk-action-bar :emails="filteredEmails" :selectedScreen="selectedScreen" />
    <div>
      <table class="mail-table">
        <tbody>
          <tr v-for="email in filteredEmails" :key="email.id" :class="['clickable', !email.read ? 'read' : '']">
            <td>
              <input type="checkbox" @click="emailSelection.toggle(email)" :checked="emailSelection.emails.has(email)">
            </td>
            <td @click="openEmail(email)">{{email.from}}</td>
            <td @click="openEmail(email)">
              <p><span :class="[!email.read ? 'title' : '']"> {{email.subject}}</span> - {{email.body}}</p>
            </td>
            <td class="date" @click="openEmail(email)">{{format(new Date(email.sentAt), 'MMM do yyyy')}}</td>
            <td><button @click="archiveEmail(email)">{{selectedScreen == 'inbox' ? 'Archive' : 'Restore'}} </button>
            </td>
          </tr>
        </tbody>
      </table>
      <modal-view v-if="openedEmail" @closeModal="openedEmail = null">
        <mail-view :email="openedEmail" @changeEmail="changeEmail" />
      </modal-view>
    </div>
  </template>
  <template v-else>
    <h1>Писем нет</h1>
  </template>
</template>

<script>
import { format } from 'date-fns'
import axios from 'axios'
import MailView from '@/components/MailView.vue'
import ModalView from '@/components/ModalView.vue'
import BulkActionBar from '@/components/BulkActionBar.vue';
import useEmailSelection from '@/composables/use-email-selection'
import useUpdateEmail from '@/composables/use-update-email'
import { reactive, ref } from 'vue';
import supabase from '@/supabase/init'

export default {
  components: {
    MailView, ModalView, BulkActionBar
  },
  async setup() {
    // let { data: emails } = await axios.get('http://localhost:3000/emails')

    let { data: emails } = await axios.get(supabase.SUPABASE_URL, { headers: {apiKey: supabase.SUPABASE_ANON_KEY}})


    return {
      emailSelection: useEmailSelection(),
      format,
      emails: ref(emails),
      openedEmail: ref(null),
      selectedScreen: ref('inbox')
    }
  },
  computed: {
    sortedEmails() {
      return this.emails.sort((el1, el2) => {
        return el1.sentAt < el2.sentAt ? 1 : -1
      })
    },
    filteredEmails() {
      if (this.selectedScreen == 'inbox') {
        console.log(this.sortedEmails.filter(e => !e.archived))
        return this.sortedEmails.filter(e => !e.archived)
      } else {
        return this.sortedEmails.filter(e => e.archived)
      }
    }
  },
  methods: {
    changeEmail({ changeIndex }) {
      // let email = this.openedEmail
      if (changeIndex) {
        let emails = this.filteredEmails
        let currentIndex = emails.indexOf(this.openedEmail)
        let indexTest = currentIndex + changeIndex >= 0 && currentIndex + changeIndex != emails.length
        if (indexTest) {
          let newEmail = emails[currentIndex + changeIndex]
          this.openEmail(newEmail)
        }
      }
    },
    selectScreen(newScreen) {
      this.selectedScreen = newScreen
      this.emailSelection.clear()
    },
    openEmail(email) {
      email.read = true
      this.updateEmail(email)
      this.openedEmail = email
    },
    archiveEmail(email) {
      email.archived = !email.archived
      this.updateEmail(email)
    },
    updateEmail(email) {
      // axios.put(`http://localhost:3000/emails/${email.id}`, email)
    useUpdateEmail(email)
    }
  }
}
</script>

<style>

</style>