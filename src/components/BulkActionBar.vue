<template>
  <div class="bulk-action-bar">
    <span class="ckeckbox">
      <input type="checkbox" @click="bulkSelect" :checked="allEmailsSelected"
        :class="[someEmailsSelected ? 'partial-check' : '']">
      <span class="checkbox_count" v-if="emailSelection.emails.size"
        @click="bulkSelect">{{emailSelection.emails.size}}</span>
      <span class="buttons">
        <button @click="emailSelection.markRead()" :disabled="[...emailSelection.emails].every(e=>e.read)">Mark
          Read</button>
        <button @click="emailSelection.markUnread()" :disabled="[...emailSelection.emails].every(e=>!e.read)">Mark
          Unread</button>
        <button @click="emailSelection.archive()" :disabled="numberSelected == 0">{{selectedScreen == 'inbox' ? 'Archive' : 'Restore'}} </button>
      </span>
    </span>
  </div>
</template>
 
<script>
import useEmailSelection from '@/composables/use-email-selection'
import { computed } from 'vue'
export default {
  setup(props) {
    let emailSelection = useEmailSelection()
    let numberSelected = computed(() => emailSelection.emails.size)
    let numbersEmails = computed(() => props.emails.length)
    let allEmailsSelected = computed(() => numberSelected.value === numbersEmails.value)
    let someEmailsSelected = computed(() => {
      return numberSelected.value > 0 && numberSelected.value < numbersEmails.value
    })
    let bulkSelect = function () {
      if (allEmailsSelected.value) {
        emailSelection.clear()
      } else {
        emailSelection.addMultiple(props.emails)
      }
    }
    return {
      allEmailsSelected,
      someEmailsSelected,
      bulkSelect,
      emailSelection,
      numberSelected,
      numbersEmails,
    }
  },
  props: {
    emails: { type: Array, required: true },
    selectedScreen: { type: String, required: true },
  }
};
</script>

<style scoped>

</style>