// 🛠 skills - tech stack

import { defineStore } from 'pinia';
import { ref, update, getDatabase, get, set, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { app as firebaseApp } from '../firebase';

// Function defined OUTSIDE the store
function formatDriveImageUrl(shareLink) {
  const match = shareLink.match(/\/d\/([a-zA-Z0-9_-]+)/) || shareLink.match(/id=([a-zA-Z0-9_-]+)/);
  if (!match) return null;
  return `https://lh3.googleusercontent.com/d/${match[1]}`;
}

export const useSkills = defineStore('skills', {
  state: () => ({
    skills: [],
    loaded: false,
    subscribed: false,
    _unsubscribeRef: null,
  }),
  getters: {
    getSkills: (state) => state.skills,
  },
  actions: {
    setSkills(data) {
      this.skills = data;
    },
    formatDriveImageUrl(shareLink) {
      const match = shareLink.match(/\/d\/([a-zA-Z0-9_-]+)/) || shareLink.match(/id=([a-zA-Z0-9_-]+)/);
      if (!match) return null;
      return `https://lh3.googleusercontent.com/d/${match[1]}`;
    },
    async saveToFirebase() {
      try {
        // 1️⃣ Get current user (only save if authenticated)
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) throw new Error('User not authenticated');

        // 2️⃣ Gather all profile data
        const data = { ...this.getSkills };

        // 3️⃣ Get Firebase Realtime Database reference
        const db = getDatabase(
          firebaseApp,
          'https://portfolio-2f700-default-rtdb.asia-southeast1.firebasedatabase.app',
        );

        // const db = getDatabase();
        const dataRef = ref(db, `skills`);

        // 4️⃣ Update profile data in Firebase Realtime Database
        await set(dataRef, data);

        return true;
      } catch (err) {
        console.error('Failed to save profile to Firebase:', err);
        return false;
      }
    },
    subscribe() {
      if (this.subscribed) return;

      const db = getDatabase(firebaseApp, 'https://portfolio-2f700-default-rtdb.asia-southeast1.firebasedatabase.app');
      const dataRef = ref(db, 'skills');

      this.subscribed = true;

      onValue(
        dataRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            this.skills = data;
          }

          // 🔑 FIRST SNAPSHOT ARRIVED
          if (!this.loaded) {
            this.loaded = true;
          }
        },
        (error) => {
          console.error('Realtime update failed:', error);
          this.loaded = true; // avoid infinite loaders
        },
      );

      this._unsubscribeRef = dataRef;
    },
    unsubscribe() {
      if (this._unsubscribeRef) {
        const db = getDatabase(firebaseApp);
        off(this._unsubscribeRef);
        this.subscribed = false;
        this._unsubscribeRef = null;
      }
    },
    reset() {
      this.loaded = false;
      this.subscribed = false;
      this.skills = [];
    },
  },
});
