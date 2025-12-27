// 🛠 skills - tech stack

import { defineStore } from 'pinia';

// Function defined OUTSIDE the store
function formatDriveImageUrl(shareLink) {
  const match = shareLink.match(/\/d\/([a-zA-Z0-9_-]+)/) || shareLink.match(/id=([a-zA-Z0-9_-]+)/);
  if (!match) return null;
  return `https://lh3.googleusercontent.com/d/${match[1]}`;
}

export const useSkills = defineStore('skills', {
  state: () => ({
    skills: [
      {
        img: 'https://res.cloudinary.com/dguoer1il/image/upload/v1766662730/html_o7i5vl.png',
        color: '#E44D26',
        name: 'HTML',
      },
      {
        img: 'https://res.cloudinary.com/dguoer1il/image/upload/v1766662732/css_dze0hz.png',
        color: '#1172B8',
        name: 'CSS',
      },
      {
        img: 'https://res.cloudinary.com/dguoer1il/image/upload/v1766662730/js_iphnia.png',
        color: '#F7DF1E',
        name: 'JavaScript',
      },
      {
        img: 'https://res.cloudinary.com/dguoer1il/image/upload/v1766662730/vue_pmlh0n.png',
        color: '#42B883',
        name: 'Vue.js',
      },
      {
        img: 'https://res.cloudinary.com/dguoer1il/image/upload/f_auto,q_auto/v1766662734/bootstrap_ee4oni.png',
        color: '#7952B3',
        name: 'Bootstrap',
      },
      {
        img: 'https://res.cloudinary.com/dguoer1il/image/upload/v1766662729/tailwind_pskww2.png',
        color: '#38BDF8',
        name: 'TailwindCSS',
      },
      {
        img: 'https://res.cloudinary.com/dguoer1il/image/upload/v1766662732/firebase_idvhiv.png',
        color: '#FFA712',
        name: 'Firebase',
      },
      {
        img: 'https://res.cloudinary.com/dguoer1il/image/upload/v1766662731/git_vyi5bf.png',
        color: '#F1502F',
        name: 'Git',
      },
      {
        img: 'https://res.cloudinary.com/dguoer1il/image/upload/v1766662734/github_i7h8hk.png',
        color: 'white',
        name: 'GitHub',
      },
      {
        img: 'https://res.cloudinary.com/dguoer1il/image/upload/v1766662731/java_a3lrdl.png',
        color: '#5382A1',
        name: 'Java',
      },
    ],
  }),
  getters: {
    getSkills: (state) => state.skills,
  },
  actions: {
    formatDriveImageUrl(shareLink) {
      const match = shareLink.match(/\/d\/([a-zA-Z0-9_-]+)/) || shareLink.match(/id=([a-zA-Z0-9_-]+)/);
      if (!match) return null;
      return `https://lh3.googleusercontent.com/d/${match[1]}`;
    },
  },
});
