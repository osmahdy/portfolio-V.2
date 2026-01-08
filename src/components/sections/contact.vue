<script setup>
import sectionHeader from '../genralComp/sectionHeader.vue';
import subHeader from '../genralComp/subHeader.vue';
import contactForm from '../privateComp/contactForm.vue';
import { useProfileStore } from '../../store/profile.store';
const store = useProfileStore();
</script>

<template>
  <div class="contactUs min-h-[500px]">
    <sectionHeader heading="Get In Touch" />
    <div class="subContact jusitfy-center flex flex-col items-center text-start md:flex-row md:items-stretch">
      <div class="contactContent p-3 text-start md:w-1/2">
        <div>
          <subHeader title="Contact Me" class="!my-5 !mt-0" />
          <p class="mb-5">
            {{store.getContactDescription}}
          </p>
        </div>
        <div>
          <div class="my-2 text-lg">
            <span class="label">
              <i class="fa-regular fa-comment-dots"></i>
              <span class="mx-1 inline-block min-w-30"> Emaill: </span>
            </span>
            <a
              href="https://mail.google.com/mail/?view=cm&to=os6sooma@gmail.com&su=Contact Request"
              target="_blank"
              rel="noopener"
              >os6sooma@gmail.com</a
            >
          </div>
          <div class="my-2 text-lg">
            <span class="label">
              <i class="fa-brands fa-whatsapp text-xl"></i>
              <span class="mx-1 inline-block min-w-30"> WhatsApp: </span>
            </span>
            <a href="https://wa.me//+972595295586" target="_blank">+972595295586</a>
          </div>
        </div>
      </div>
      <div class="form w-full md:w-1/2">
        <contactForm />
      </div>
    </div>
  </div>
</template>
