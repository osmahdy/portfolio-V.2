import { defineStore } from 'pinia';
import { ref, update, getDatabase, get, set, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { app as firebaseApp } from '../firebase';
import { db } from '../firebase';

export const useSettings = defineStore('settings', {
  state: () => ({
    isAuthenticated: false,
    authChecked: false,
    openedSectinon: localStorage.getItem('lastOpened'),
    lastSignIn: '',
    isLoading: true, // ← initially true
  }),

  getters: {
    getIsAuthenticated: (state) => state.isAuthenticated,
    getOpenedSection: (state) => (state.openedSectinon ? state.openedSectinon : 'profile'),
    getLastSignIn: (state) => state.lastSignIn,
  },

  actions: {
    setLoading(value) {
      this.isLoading = value;
    },
    logout() {
      this.isAuthenticated = false;
      this.authChecked = false;
    },
    login() {
      this.isAuthenticated = true;
      this.authChecked = true;
    },
    setAuthenticated(value) {
      this.isAuthenticated = value;
      this.authChecked = true;
    },
    setOpenedSection(id) {
      this.openedSectinon = id;
      localStorage.setItem('lastOpened', id);
    },
    setLastSignIn(date) {
      this.lastSignIn = date;
    },
    timeAgo(date) {
      if (!date) return 'Never';

      const now = new Date();
      const diff = now - new Date(date); // milliseconds
      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      // For fixed string
      const fixed = new Date(date).toString().substring(0, 25);

      if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago, ${fixed}`;
      if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago, ${fixed}`;
      if (minutes > 0) return `${minutes} min${minutes > 1 ? 's' : ''} ago, ${fixed}`;
      return 'Just now, ' + fixed;
    },
    async saveLastSignInToFirebase(date) {
      try {
        // 1️⃣ Get current user (only save if authenticated)
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) throw new Error('User not authenticated');

        // 2️⃣ Gather all profile data
        const data = { LastSignIn: date };

        await update(ref(db, 'settings'), {
          LastSignIn: date,
        });

        return true;
      } catch (err) {
        console.error('Failed to save profile to Firebase:', err);
        return false;
      }
    },
    async getLastSignInFromFirebase() {
      if (this.subscribed) return;

      const dataRef = ref(db, 'settings/LastSignIn');

      this.subscribed = true;
      await get(dataRef).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          this.lastSignIn = data;
        }
      });
    },
  },
});
