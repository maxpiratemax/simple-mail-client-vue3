import { reactive } from 'vue'
import {supabase} from '@/supabase/init'


let emails = reactive(new Set());

export const useEmailSelection = function () {
  let toggle = function (email) {
    if (emails.has(email)) {
      emails.delete(email)
    } else {
      emails.add(email)
    }
  }

  let clear = () => {
    emails.clear();
  }

  let addMultiple = (newEmails) => {
    newEmails.forEach((email) => {
      emails.add(email)
    })
  }

  let forSelected = (fn) => {
    emails.forEach(async(email) => {
      fn(email);
      // axios.put(`http://localhost:3000/emails/${email.id}`, email)
      const {error} = await supabase
        .from('emails')
        .update(email)
        .eq('id', email.id)
    })
    clear()
  }

  let markRead = () => forSelected(email => email.read = true)
  let markUnread = () =>  forSelected(email => email.read = false)
  let archive = () =>  forSelected(email => email.archived = !email.archived)

  return {
    emails,
    toggle,
    clear,
    addMultiple,
    markRead,
    markUnread,
    archive
  }
}

export default useEmailSelection