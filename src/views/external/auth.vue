<script setup>
import { ref } from 'vue';
import { useDark, useToggle } from '@vueuse/core';
import alert from '../../components/genralComp/alert.vue';
import { auth } from '../../firebase/auth';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import router from '../../router';
import { useSettings } from '../../store/settings.store';

const store = useSettings();
const isDark = useDark();
const toggleDark = useToggle(isDark);

const password = ref('');
const email = ref('');
const showAlert = ref(false);
const alertMessage = ref('');
const alertState = ref('good');

const handleLogin = async () => {
  if (!checkEmptyInputs()) return;

  try {
    await signInWithEmailAndPassword(auth, email.value.trim(), password.value);
    showAlertFn('successfully logged in', 'good'); 
    setTimeout(() => { 
      router.push('/a-panel-dashboard');
    }, 3000);
  } catch (error) {
    handleFirebaseError(error.code);
  }
};

const checkEmptyInputs = () => {
  if (!email.value.trim() && !password.value.trim()) {
    showAlertFn('Please enter the email and password', 'bad');
    return false;
  }

  if (!email.value.trim()) {
    showAlertFn('Please enter the email', 'bad');
    return false;
  }

  if (!password.value.trim()) {
    showAlertFn('Please enter the password', 'bad');
    return false;
  }

  return true;
};

const showAlertFn = (message, state) => {
  showAlert.value = false;

  // wait for DOM update
  setTimeout(() => {
    alertMessage.value = message;
    alertState.value = state;
    showAlert.value = true;
  }, 0);
};

const handleFirebaseError = (code) => {
  alertState.value = 'bad';
  showAlert.value = true;

  switch (code) {
    case 'auth/user-not-found':
      alertMessage.value = 'No account found with this email';
      break;

    case 'auth/wrong-password':
      alertMessage.value = 'Incorrect password';
      break;

    case 'auth/invalid-email':
      alertMessage.value = 'Invalid email format';
      break;

    case 'auth/too-many-requests':
      alertMessage.value = 'Too many attempts. Try again later';
      break;

    default:
      alertMessage.value = 'Login failed. Please try again';
  }
};
</script>

<template>
  <div class="relative flex h-[100dvh] w-full items-center justify-center">
    <div class="bg">
      <div class="triangle triangle-left bg-slate-950"></div>
      <div class="triangle triangle-right bg-slate-500"></div>
    </div>

    <alert v-if="showAlert" :message="alertMessage" :state="alertState" />
    <div class="auth m-auto w-fit min-w-100 bg-white p-3 text-slate-950">
      <p class="text-center text-2xl font-bold">Welcome Osama</p>
      <div class="gp">
        <p class="text-xl font-semibold">Email</p>
        <input
          class="text-md my-2 w-full rounded-xl border-2 border-solid border-slate-600 p-3 outline-none"
          type="email"
          required
          placeholder="Enter Your Email"
          v-model="email"
        />
      </div>
      <div class="gp">
        <p class="text-xl font-semibold">Password</p>
        <input
          class="text-md my-2 w-full rounded-xl border-2 border-solid border-slate-600 p-3 outline-none"
          type="password"
          required
          placeholder="Enter The Password"
          v-model="password"
        />
      </div>
      <button
        class="button my-3 w-full border border-solid !border-gray-500 bg-slate-400 text-gray-800 duration-300 hover:bg-slate-500 dark:bg-gray-950 dark:text-white dark:hover:bg-gray-600"
        @click="handleLogin"
      >
        Login
      </button>
    </div>
  </div>
</template>

<style>
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0px 1000px white inset !important; /* same as normal background */
  -webkit-text-fill-color: inherit !important; /* text color */
  transition: 5000s ease-in-out 0s; /* prevent flicker */
}
.bg {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
}
/* common triangle style */
.triangle {
  position: absolute;
  width: 100%;
  height: 100%;
}

/* left triangle */
.triangle-left {
  /* background: #0f172a;   */
  clip-path: polygon(100% 0, 0% 100%, 0 0);
}

/* right triangle */
.triangle-right {
  /* background: #38bdf8;  */
  clip-path: polygon(100% 0, 0% 100%, 99% 100%);
}
</style>
