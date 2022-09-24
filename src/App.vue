<template>
  <h1>Simple mail client</h1>
  <Suspense>
    <template #default>
      <mail-table />
    </template>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>
  
<script>
import MailTable from '@/components/MailTable.vue';
import useEmailSelection from '@/composables/use-email-selection'

export default {
  name: 'App',
  components: {
    MailTable
  },
  setup(){    
    return {
      emailSelection: useEmailSelection(),
    }
  }
  
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #87898f;
  margin-top: 60px;
}

/* Global Styles */

button {
  font-size: 16px;
  padding: 8px;
  border: none;
  margin: 5px 10px 5px 0px;
  cursor: pointer;
}

button:hover:enabled,
input[type='checkbox']:hover {
  background-color: rgb(235, 198, 164)
}

button:disabled {
  cursor: auto;
}

.orange{
  border: 2px solid #f7dd95;
}

button.selected {
  cursor: auto;
  color: rgb(248, 225, 123);
  border-color: black;
  border-width: 2px;
}



input[type='checkbox'] {
  -webkit-appearance: none;
  cursor: pointer;
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 2px;
  border: 2px solid #f7dd95;
  position: relative;
  vertical-align: middle;
  padding: 10px;
}

input[type='checkbox'].partial-check {
  background: #ABC;
}

input[type='checkbox']:checked {
  background: #679;
}

.mb-0 {
  margin-bottom: 0;
}

/* Modal */

.modal,
.overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  overflow-x: hidden;
}

.overlay {
  opacity: 0.5;
  background-color: black;
}

.modal-card {
  position: relative;
  max-width: 80%;
  margin: auto;
  margin-top: 30px;
  padding: 20px;
  background-color: white;
  min-height: 500px;
  z-index: 10;
  opacity: 1;
}

/* Email Modal */

.email-display {
  text-align: left;
  color:#000
}

/* Mail Table */

.mail-table {
  max-width: 1000px;
  margin: auto;
  border-collapse: collapse;
}

.mail-table tr.read {
  background-color: rgb(246, 246, 246);
  color: #000;
}

.mail-table tr {
  height: 40px;
}

.mail-table td {
  border-bottom: 1px solid black;
  padding: 5px;
  text-align: left;
}

.mail-table tr:hover {
  background-color: rgb(255, 250, 234);
}

.mail-table tr:first-of-type td {
  border-top: 1px solid black;
}

.mail-table td p {
  max-height: 1.2em;
  overflow-y: hidden;
  margin: 0;
}

.mail-table td.date {
  width: 120px;
}

/* Bulk Action Bar */

.bulk-action-bar {
  width: 100%;
  max-width: 1000px;
  margin: auto;
  text-align: left;
  padding-bottom: 8px;
  position: relative;
}

.bulk-action-bar input {
  margin: 9px;
}

.bulk-action-bar .checkbox {
  margin-right: 6px;
  margin-left: 3px;
  
}
.checkbox_count{
  position: absolute;
  top: 16px;
  left: 17px;
  color: white;
  cursor: pointer;
  font-size: 0.8em;
}

.title {
  color: black;
  font-weight: 600;
}

.clickable {
  cursor: pointer;
}
</style>

