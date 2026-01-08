<script setup>
import { useProfileStore } from '../../../../store/profile.store';
import { computed, ref } from 'vue';
import labelComp from '../general Comps/label.vue';
import inputComp from '../general Comps/input.vue';
import edit_save from '../general Comps/edit_save.vue';
import SubHeader from '../general Comps/dashboardSubHeader.vue';
import alert from '../../../genralComp/alert.vue';

const store = useProfileStore();

// card-level edit status
const status = ref(true); // true = readonly, false = editing

const confSave = ref(null);

// local copy of data to edit
const localProfile = ref({
  name: store.getName,
  jobTitle: store.getJobTitle,
  languages: store.getLanguages.join(' | '),
  freelanceState: store.getFreelanceState,
  profileImg1: store.getProfileImg1,
  profileImg2: store.getProfileImg2,
  cvLink: store.getCvLink,
  iconLink: store.getIconLink,
  email: store.getEmail,
  emailLink: store.getEmailLink,
  whatsappNumber: store.getWhatsappNumber,
  whatsappLink: store.getWhatsappLink,
  linkedIn: store.getLinkedIn,
  github: store.getGithub,
  instagram: store.getInstagram,
});

// fields array for rendering
const profileFields = computed(() => [
  { label: 'Name:', key: 'name', placeholder: 'your name' },
  { label: 'Job Title:', key: 'jobTitle', placeholder: 'your job title' },
  { label: 'Languages:', key: 'languages', placeholder: 'your languages' },
  { label: 'Freelance State:', key: 'freelanceState', placeholder: 'freelance state' },
  { label: 'Profile Image 1 Link:', key: 'profileImg1', placeholder: 'image link' },
  { label: 'Profile Image 2 Link:', key: 'profileImg2', placeholder: 'image link' },
  { label: 'CV Link:', key: 'cvLink', placeholder: 'cv link' },
  { label: 'Icon Link:', key: 'iconLink', placeholder: 'icon link' },
  { label: 'Email:', key: 'email', placeholder: 'email' },
  { label: 'Email Link:', key: 'emailLink', placeholder: 'email link' },
  { label: 'Whatsapp Number:', key: 'whatsappNumber', placeholder: 'whatsapp number' },
  { label: 'Whatsapp Link:', key: 'whatsappLink', placeholder: 'whatsapp link' },
  { label: 'LinkedIn Link:', key: 'linkedIn', placeholder: 'linkedin link' },
  { label: 'Github Link:', key: 'github', placeholder: 'github link' },
  { label: 'Instagram Link:', key: 'instagram', placeholder: 'instagram link' },
]);

// edit/save functions
const startEditing = () => {
  status.value = false;
};

const saveEdits = (id) => {
  status.value = true;
  confSave.value = true;
  // push local data to store
  store.setName(localProfile.value.name);
  store.setJobTitle(localProfile.value.jobTitle);
  store.setLanguages(localProfile.value.languages.split(' | '));
  store.setFreelanceState(localProfile.value.freelanceState);
  store.setProfileImg1Link(localProfile.value.profileImg1);
  store.setProfileImg2Link(localProfile.value.profileImg2);
  store.setCvLink(localProfile.value.cvLink);
  store.setIconLink(localProfile.value.iconLink);
  store.setEmail(localProfile.value.email);
  store.setEmailLink(localProfile.value.emailLink);
  store.setWhatsappNumber(localProfile.value.whatsappNumber);
  store.setWhatsappLink(localProfile.value.whatsappLink);
  store.setLinkedInLink(localProfile.value.linkedIn);
  store.setGithubLink(localProfile.value.github);
  store.setInstagramLink(localProfile.value.instagram);

  saveToDb();
};
const alertMessage = ref(null);
const alertState = ref(null);
const showAlert = ref(false);

async function saveToDb() {
  const success = await store.saveToFirebase();
  if (success) {
    // alertMsg.value = 'Saved to database';
    // alertState.value = 'good';
    showAlertFn('Saved to database', 'good');
  } else {
    // alertMsg.value = 'Failed to save to database';
    // alertState.value = 'bad';
    showAlertFn('Failed to save to database', 'bad');
  }
}

function showAlertFn(message, state) {
  showAlert.value = false;

  // wait for DOM update
  setTimeout(() => {
    alertMessage.value = message;
    alertState.value = state;
    showAlert.value = true;
  }, 0);
}
</script>

<template>
  <div class="generalInfo">
    <SubHeader heading="General" class="flex-1" />
    <div
      class="box flex flex-col items-start justify-center md:flex-row md:items-center md:justify-start"
      v-for="field in profileFields"
      :key="field.key"
    >
      <labelComp :label="field.label" />
      <inputComp v-model="localProfile[field.key]" :placeholder="field.placeholder" :status="status" />
    </div>
    <alert v-if="showAlert" :message="alertMessage" :state="alertState" />
    <edit_save v-model="confSave" card-id="general" @edit-click="startEditing" @save-click="saveEdits" />
  </div>
</template>
