<script setup>
import Header from '../other comps/general Comps/dashboardHeader.vue';

import generalInfoCard from '../other comps/internal Comps/generalInfoCard.vue';
import heroInfoCard from '../other comps/internal Comps/heroInfoCard.vue';
import aboutInfoCard from '../other comps/internal Comps/aboutInfoCard.vue';
import contactInfoCard from '../other comps/internal Comps/contactInfoCard.vue';
import footerInfoCard from '../other comps/internal Comps/footerInfoCard.vue';
</script>

<template>
  <div class="profile md:p-5" id="profile">
    <Header header="PROFILE SECTION" />
    <generalInfoCard />
    <heroInfoCard />
    <aboutInfoCard />
    <contactInfoCard />
    <footerInfoCard />
  </div>
</template>
