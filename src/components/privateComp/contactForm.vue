<script setup>
import emailjs from '@emailjs/browser';
import { ref } from 'vue';
import alert from '../genralComp/alert.vue';
emailjs.init(import.meta.env.VITE_emailJs_public_key);

const emailVal = ref('');
const showAlert = ref(false);
const alertMessage = ref('');
const alertState = ref('good');

const sendEmail = (e) => {
  e.preventDefault();
  //  1️⃣ Send the email
  emailjs
    .sendForm(
      import.meta.env.VITE_emailJs_service_ID,
      import.meta.env.VITE_emailJs_template_ID,
      e.target,
      import.meta.env.VITE_emailJs_public_key,
    )
    .then((e) => {
      alertMessage.value = 'Email Sent';
      alertState.value = 'good';
    })
    .catch((error) => {
      alertMessage.value = 'Error sending the email';
      alertState.value = 'bad';
      console.error('EmailJS Error:', error);
    });

  // 2️⃣ Send auto-reply to user
  emailjs
    .sendForm(
      import.meta.env.VITE_emailJs_service_ID,
      import.meta.env.VITE_emailJs_autoreply_template_ID, // your auto-reply template
      e.target,
      import.meta.env.VITE_emailJs_public_key,
    )
    .then(() => {
      showAlert.value = true;
      e.target.reset();
    })
    .catch((err) => {
      console.error('Auto-reply Error:', err);
      showAlert.value = true;
    });
};
</script>

<template>
  <form @submit="sendEmail" class="p-3">
    <alert v-if="showAlert" :message="alertMessage" :state="alertState" />
    <input type="hidden" name="from_name" value="Osama Portfolio" />
    <div class="formTitle my-3">
      <p class="text-xl font-semibold">Message title</p>
      <input
        name="title"
        class="text-md my-2 w-full rounded-xl border-2 border-solid border-slate-600 p-3 text-gray-800 outline-none dark:text-white"
        type="text"
        placeholder="Enter Message Title"
        required
      />
    </div>
    <div class="formSenderEmail my-3">
      <p class="text-xl font-semibold">Enter Your Email</p>
      <input
        name="sender_email"
        class="text-md my-2 w-full rounded-xl border-2 border-solid border-slate-600 p-3 text-gray-800 outline-none dark:text-white"
        type="email"
        placeholder="Enter Your Email"
        required
        v-model="emailVal"
      />
      <input type="hidden" name="username" :value="emailVal.substring(0, emailVal.indexOf('@'))" />
    </div>
    <div class="formContent my-3">
      <p class="text-xl font-semibold">Message Content</p>
      <textarea
        name="message"
        class="text-md my-2 h-40 w-full resize-none rounded-xl border-2 border-solid border-slate-600 p-3 text-gray-800 outline-none dark:text-white"
        type="text"
        placeholder="Enter Message Content"
        required
      />
    </div>
    <button
      type="submit"
      class="button my-3 w-full border border-solid !border-gray-500 bg-slate-400 text-gray-800 duration-300 hover:bg-slate-500 dark:bg-gray-950 dark:text-white dark:hover:bg-gray-600"
    >
      Send
    </button>
  </form>
</template>
