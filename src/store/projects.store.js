//📦 projects collection | projects section

import { defineStore } from 'pinia';
import { ref, update, getDatabase, get, set, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { app as firebaseApp } from '../firebase';

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    categoryClicked: 'All',
    categoryClickedIndex: 0,
    categories: [],
    projects: [],
    loaded: false,
    subscribed: false,
    _unsubscribeRef: null,
  }),
  getters: {
    getCategoryClicked: (state) => state.categoryClicked ?? state.categories[0],
    getCategories: (state) => state.categories,
    // getProjectsData: (state) => state.projects,
    getCategoryClickedIndex: (state) => state.categories.indexOf(state.categoryClicked),
    // findIndex((obj) => obj.name === state.categoryClicked),
    getProjectsData: (state) => state.projects,
    getProjectsByCategory: (state) => (category) => {
      if (category === 'All') return state.projects;
      return state.projects.filter((project) =>
        project.categories?.some((cat) => cat.category === category && cat.checked),
      );
    },
  },
  actions: {
    setCategoryClicked(category) {
      this.categoryClicked = category;
    },
    setCategory(newCategories) {
      this.categories = newCategories;
    },
    syncProjectsWithCategories() {
      this.projects = this.projects.map((project) => ({
        ...project,
        categories: this.categories.map((cat) => {
          // Ensure cat is a string, not an object
          const catName = typeof cat === 'string' ? cat : cat.name;
          const existing = project.categories?.find((c) => c.category === catName);

          return {
            category: catName, // now it's always a string
            checked: existing ? existing.checked : false,
          };
        }),
      }));
    },
    setProjects(data) {
      this.projects = data;
    },
    saveProjectsToFirebase() {
      try {
        // 1️⃣ Get current user (only save if authenticated)
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) throw new Error('User not authenticated');

        // 2️⃣ Gather all profile data
        const data = { ...this.getProjectsData };

        // 3️⃣ Get Firebase Realtime Database reference
        const db = getDatabase(
          firebaseApp,
          'https://portfolio-2f700-default-rtdb.asia-southeast1.firebasedatabase.app',
        );

        // const db = getDatabase();
        const dataRef = ref(db, `projects/projects`);

        // 4️⃣ Update profile data in Firebase Realtime Database
        set(dataRef, data);

        return true;
      } catch (err) {
        console.error('Failed to save profile to Firebase:', err);
        return false;
      }
    },
    async saveCategoriesToFirebase() {
      try {
        const cleanCategories = this.categories.map((cat) => ({ name: cat.name })); 
        // 3️⃣ Get Firebase Realtime Database reference
        const db = getDatabase(
          firebaseApp,
          'https://portfolio-2f700-default-rtdb.asia-southeast1.firebasedatabase.app',
        );

        // const db = getDatabase();
        const dataRef = ref(db, `projects/categories`);

        // 4️⃣ Update profile data in Firebase Realtime Database
        await set(dataRef, cleanCategories);

        return true;
      } catch (err) {
        console.error('Failed to save profile to Firebase:', err);
        return false;
      }
    },
    subscribe() {
      if (this.subscribed) return;

      const db = getDatabase(firebaseApp, 'https://portfolio-2f700-default-rtdb.asia-southeast1.firebasedatabase.app');
      const dataRef = ref(db, 'projects');

      this.subscribed = true;

      onValue(
        dataRef,
        (snapshot) => {
          // if (snapshot.exists()) {
          //   const data = snapshot.val();

          //   this.projects = data.projects || [];

          //   this.categories = (data.categories || []).map((c) => ({
          //     name: typeof c === 'string' ? c : c?.name || '',
          //   }));
          // }

          // // 🔑 FIRST SNAPSHOT ARRIVED
          // if (!this.loaded) {
          //   this.loaded = true;
          // }
          if (!snapshot.exists()) return;

          const data = snapshot.val();

          // only sync if data actually changed
          if (!this.loaded) {
            this.projects = data.projects || [];
            this.categories = (data.categories || []).map((c) => ({
              name: typeof c === 'string' ? c : c?.name || '',
            }));
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
      this.categories = [];
      this.projects = [];
    },
  },
});
