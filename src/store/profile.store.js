// 👤 user info, about, bio | hero - about - contact - footer sections
import { defineStore } from 'pinia';
import { ref, set, getDatabase, onValue, off, get } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { app as firebaseApp } from '../firebase';

export const useProfileStore = defineStore('profile', {
  state: () => ({
    loaded: false,
    subscribed: false,
    _unsubscribeRef: null,

    iconLink: '',
    cvLink: '',
    profileImg1Link: '',
    profileImg2Link: '',

    heroSectionHeading: '',
    heroSectionDescription: '',

    storyBoxDescription: '',

    name: '',
    jobTitle: '',
    languages: [],
    freelanceState: '',

    contactDescription: '',
    email: '',
    emailLink: '',
    whatsappNumber: '',
    whatsappLink: '',

    linkedInLink: '',
    githubLink: '',
    instagramLink: '',

    footerHook: '',
    footerCopyrights: '',
  }),

  getters: {
    getIconLink: (s) => s.iconLink,
    getCvLink: (s) => s.cvLink,
    getProfileImg1: (s) => s.profileImg1Link,
    getProfileImg2: (s) => s.profileImg2Link,

    getHeroHeading: (s) => s.heroSectionHeading,
    getHeroDescription: (s) => s.heroSectionDescription,

    getFreelanceState: (s) => s.freelanceState,
    getLanguages: (s) => s.languages,
    getJobTitle: (s) => s.jobTitle,
    getName: (s) => s.name,

    getStoryDescription: (s) => [{ subTitle: '', subText: s.storyBoxDescription }],

    getDetailsBox: (s) => [
      { subTitle: 'Name:', subText: s.name },
      { subTitle: 'Role:', subText: s.jobTitle },
      { subTitle: 'Language:', subText: s.languages.join(' | ') },
      { subTitle: 'Availability:', subText: s.freelanceState },
    ],

    getContactDescription: (s) => s.contactDescription,
    getEmailLink: (s) => s.emailLink,
    getWhatsappLink: (s) => s.whatsappLink,

    getEmail: (s) => s.email,
    getWhatsappNumber: (s) => s.whatsappNumber,
    getLinkedIn: (s) => s.linkedInLink,
    getGithub: (s) => s.githubLink,
    getInstagram: (s) => s.instagramLink,

    getFooterHook: (s) => s.footerHook,
    getFooterCopyrights: (s) => s.footerCopyrights,
  },

  actions: {
    /* =========================
       🔥 REALTIME SUBSCRIPTION
       ========================= */

    subscribe() {
      if (this.subscribed) return;

      const db = getDatabase(firebaseApp, 'https://portfolio-2f700-default-rtdb.asia-southeast1.firebasedatabase.app');

      const profileRef = ref(db, 'profile');
      this.subscribed = true;
      this._unsubscribeRef = profileRef;

      onValue(
        profileRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();

            this.iconLink = data.iconLink || '';
            this.cvLink = data.cvLink || '';
            this.profileImg1Link = data.profileImg1Link || '';
            this.profileImg2Link = data.profileImg2Link || '';

            this.heroSectionHeading = data.heroSectionHeading || '';
            this.heroSectionDescription = data.heroSectionDescription || '';

            this.storyBoxDescription = data.storyBoxDescription || '';
            this.name = data.name || '';
            this.jobTitle = data.jobTitle || '';
            this.languages = data.languages || [];
            this.freelanceState = data.freelanceState || '';

            this.contactDescription = data.contactDescription || '';
            this.email = data.email || '';
            this.emailLink = data.emailLink || '';
            this.whatsappNumber = data.whatsappNumber || '';
            this.whatsappLink = data.whatsappLink || '';

            this.linkedInLink = data.linkedInLink || '';
            this.githubLink = data.githubLink || '';
            this.instagramLink = data.instagramLink || '';

            this.footerHook = data.footerHook || '';
            this.footerCopyrights = data.footerCopyrights || '';
          }

          // 🔑 FIRST SNAPSHOT = DATA READY
          if (!this.loaded) {
            this.loaded = true;
          }
        },
        (error) => {
          console.error('Profile realtime error:', error);
          this.loaded = true; // avoid infinite loader
        },
      );
    },

    unsubscribe() {
      if (this._unsubscribeRef) {
        off(this._unsubscribeRef);
        this._unsubscribeRef = null;
        this.subscribed = false;
      }
    },

    reset() {
      this.loaded = false;
      this.subscribed = false;
      this._unsubscribeRef = null;
    },

    /* =========================
       💾 SAVE TO FIREBASE
       ========================= */

    saveToFirebase() {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) throw new Error('User not authenticated');

        const db = getDatabase(
          firebaseApp,
          'https://portfolio-2f700-default-rtdb.asia-southeast1.firebasedatabase.app',
        );

        const profileRef = ref(db, 'profile');

        set(profileRef, {
          iconLink: this.iconLink,
          cvLink: this.cvLink,
          profileImg1Link: this.profileImg1Link,
          profileImg2Link: this.profileImg2Link,

          heroSectionHeading: this.heroSectionHeading,
          heroSectionDescription: this.heroSectionDescription,

          storyBoxDescription: this.storyBoxDescription,
          name: this.name,
          jobTitle: this.jobTitle,
          languages: this.languages,
          freelanceState: this.freelanceState,

          contactDescription: this.contactDescription,
          email: this.email,
          emailLink: this.emailLink,
          whatsappNumber: this.whatsappNumber,
          whatsappLink: this.whatsappLink,

          linkedInLink: this.linkedInLink,
          githubLink: this.githubLink,
          instagramLink: this.instagramLink,

          footerHook: this.footerHook,
          footerCopyrights: this.footerCopyrights,
        });

        return true;
      } catch (err) {
        console.error('Failed to save profile:', err);
        return false;
      }
    },

    getAllData() {
      return {
        iconLink: this.iconLink,
        cvLink: this.cvLink,
        profileImg1Link: this.profileImg1Link,
        profileImg2Link: this.profileImg2Link,

        heroSectionHeading: this.heroSectionHeading,
        heroSectionDescription: this.heroSectionDescription,

        storyBoxDescription: this.storyBoxDescription,
        name: this.name,
        jobTitle: this.jobTitle,
        languages: [...this.languages],
        freelanceState: this.freelanceState,

        contactDescription: this.contactDescription,
        email: this.email,
        emailLink: this.emailLink,
        whatsappNumber: this.whatsappNumber,
        whatsappLink: this.whatsappLink,

        linkedInLink: this.linkedInLink,
        githubLink: this.githubLink,
        instagramLink: this.instagramLink,

        footerHook: this.footerHook,
        footerCopyrights: this.footerCopyrights,
      };
    },
    /* =========================
       🔹 SETTER FUNCTIONS (restored)
       ========================= */
    setName(value) {
      this.name = value;
    },
    setJobTitle(value) {
      this.jobTitle = value;
    },
    setLanguages(value) {
      this.languages = value;
    },
    setFreelanceState(value) {
      this.freelanceState = value;
    },
    setProfileImg1Link(value) {
      this.profileImg1Link = value;
    },
    setProfileImg2Link(value) {
      this.profileImg2Link = value;
    },
    setCvLink(value) {
      this.cvLink = value;
    },
    setIconLink(value) {
      this.iconLink = value;
    },
    setEmail(value) {
      this.email = value;
    },
    setEmailLink(value) {
      this.emailLink = value;
    },
    setWhatsappNumber(value) {
      this.whatsappNumber = value;
    },
    setWhatsappLink(value) {
      this.whatsappLink = value;
    },
    setLinkedInLink(value) {
      this.linkedInLink = value;
    },
    setGithubLink(value) {
      this.githubLink = value;
    },
    setInstagramLink(value) {
      this.instagramLink = value;
    },
    setHeroSectionHeading(value) {
      this.heroSectionHeading = value;
    },
    setHeroSectionDescription(value) {
      this.heroSectionDescription = value;
    },
    setStoryBoxDescription(value) {
      this.storyBoxDescription = value;
    },
    setContactDescription(value) {
      this.contactDescription = value;
    },
    setFooterHook(value) {
      this.footerHook = value;
    },
    setFooterCopyrights(value) {
      this.footerCopyrights = value;
    },
    formatDriveDownloadLink(driveLink) {
      // Extract the file ID from common Google Drive URL formats
      const regex = /\/d\/([a-zA-Z0-9_-]+)|id=([a-zA-Z0-9_-]+)/;
      const match = driveLink.match(regex);

      const fileId = match ? match[1] || match[2] : null;

      if (!fileId) {
        console.warn('Invalid Google Drive link');
        return driveLink; // fallback to original link
      }

      return `https://drive.google.com/uc?export=download&id=${fileId}`;
    },
  },
});
