// 🧠 work - education sections (REALTIME SAFE)

import { defineStore } from 'pinia';
import { ref, set, onValue, off, getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { app as firebaseApp } from '../firebase';
import { db } from '../firebase';

const DB_URL = 'https://portfolio-2f700-default-rtdb.asia-southeast1.firebasedatabase.app';

export const useExperience = defineStore('experience', {
  state: () => ({
    tagsList: [],
    eduData: [],
    workData: [],
    counterData: [],

    loaded: false,
    subscribed: false,

    _unsubscribe: null,
  }),

  getters: {
    getTagsList: (s) => s.tagsList,
    getEduData: (s) => s.eduData,
    getWorkData: (s) => s.workData,
    getCounterData: (s) => s.counterData,
  },

  actions: {
    /* ----------------------------------
     * 🔁 PURE SNAPSHOT (IMPORTANT)
     * ---------------------------------- */
    getAllData() {
      return {
        learning: [...this.eduData],
        work: [...this.workData],
        tagsList: [...this.tagsList],
        counters: { ...this.counterData },
      };
    },
    setEduData(data) {
      this.eduData = data;
    },
    setWorkData(data) {
      this.workData = data;
    },
    setTagsList(data) {
      this.tagsList = data;
    },
    setCounterData(data) {
      this.counterData = data;
    },

    /* ----------------------------------
     * 💾 SAVE HELPERS
     * ---------------------------------- */
    _requireAuth() {
      const user = getAuth().currentUser;
      if (!user) throw new Error('User not authenticated');
    },

    async saveSection(path, data) {
      try {
        this._requireAuth();
        await set(ref(db, path), data);
        return true;
      } catch (e) {
        console.error(`Save failed (${path})`, e);
        return false;
      }
    },

    saveLearningToFirebase() {
      return this.saveSection('experience/learning', [...this.eduData]);
    },

    saveWorkToFirebase() {
      return this.saveSection('experience/work', [...this.workData]);
    },

    saveTagsToFirebase() {
      const cleanTags = { ...this.tagsList };
      return this.saveSection('experience/tagsList', cleanTags);
    },

    saveCountersToFirebase() {
      return this.saveSection('experience/counters', { ...this.counterData });
    },

    /* ----------------------------------
     * 🔥 REALTIME SUBSCRIBE (HOT LOAD)
     * ---------------------------------- */
    subscribe() {
      if (this.subscribed) return;

      const dataRef = ref(db, 'experience');

      this._unsubscribe = onValue(
        dataRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();

            this.eduData = data.learning || [];
            this.workData = data.work || [];
            this.tagsList = Object.values(data.tagsList) || [];
            this.counterData = data.counters || {};
          }

          // ✅ first snapshot ends loading
          if (!this.loaded) this.loaded = true;
        },
        (err) => {
          console.error('Realtime error:', err);
          this.loaded = true; // prevent infinite loaders
        },
      );

      this.subscribed = true;
    },

    unsubscribe() {
      if (this._unsubscribe) {
        off(this._unsubscribe);
        this._unsubscribe = null;
        this.subscribed = false;
      }
    },

    reset() {
      this.tagsList = [];
      this.eduData = [];
      this.workData = [];
      this.counterData = [];

      this.loaded = false;
      this.subscribed = false;
      this._unsubscribe = null;
    },
  },
});
