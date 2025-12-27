//🧠 work - education sections

import { defineStore } from 'pinia';

export const useExperience = defineStore('experience', {
  state: () => ({
    tagsList: [
      { name: 'Html' },
      { name: 'Css' },
      { name: 'JavaScript' },
      { name: 'Vue.js' },
      { name: 'React' },
      { name: 'Node.js' },
      { name: 'Express.js' },
      { name: 'MongoDB' },
      { name: 'SQL' },
      { name: 'Git' },
      { name: 'Web Development' },
    ],
    eduData: [
      {
        period: '2022 - 2027',
        title: 'Started University Learn',
        description:
          'I started university learning journey at UCAS from 2022 to 2027 and decided to study cybersecurity engineering',
        studyState: true,
      },
      {
        period: '2022 - 2023',
        title: 'First Level At University',
        description:
          'I started university learning journey at UCAS from 2022 to 2027 and decided to study cybersecurity engineering',
        studyState: true,
      },
      {
        period: '2022 - 2027',
        title: 'Finished University Learn',
        description:
          'I started university learning journey at UCAS from 2022 to 2027 and decided to study cybersecurity engineering',
        studyState: false,
      },
    ],
    workData: [
      {
        period: '2022 - 2028',
        title: 'Strted University Learn',
        subTitle: 'self projects and freelancing',
        description:
          'i started university learnig journey at ucas from 2022 to 2027 i decidec to studey cybersecurity engineering',
        workState: true,
        tagType: 'img',
        tags: [
          'https://res.cloudinary.com/dguoer1il/image/upload/v1766662730/vue_pmlh0n.png',
          'https://res.cloudinary.com/dguoer1il/image/upload/v1766662732/css_dze0hz.png',
        ],
      },
      {
        period: '2022 - 2027',
        title: 'Strted University Learn',
        subTitle: 'self projects and freelancing',
        description:
          'i started university learnig journey at ucas from 2022 to 2027 i decidec to studey cybersecurity engineering',
        workState: true,
        tagType: 'img',
        // tags: ['fa-brands fa-html5', 'fa-brands fa-css3-alt', 'fa-brands fa-js'],
        tags: [
          'https://res.cloudinary.com/dguoer1il/image/upload/v1766662730/vue_pmlh0n.png',
          'https://res.cloudinary.com/dguoer1il/image/upload/v1766662732/css_dze0hz.png',
        ],
      },
      {
        period: '2022 - 2027',
        title: 'Strted University Learn',
        subTitle: 'self projects and freelancing',
        description:
          'i started university learnig journey at ucas from 2022 to 2027 i decidec to studey cybersecurity engineering',
        workState: true,
        tagType: 'img',
        tags: [
          'https://res.cloudinary.com/dguoer1il/image/upload/v1766662730/vue_pmlh0n.png',
          'https://res.cloudinary.com/dguoer1il/image/upload/v1766662732/css_dze0hz.png',
        ],
      },
    ],
    counterData: [
      { num: 5, label: 'Years of Experience' },
      { num: 20, label: 'Projects Built' },
      { num: 10, label: 'Vue.js Projects' },
      { num: 10, label: 'HTML/CSS/JS Projects' },
    ],
  }),
  getters: {
    getTagsList: (state) => state.tagsList,
    getEduData: (state) => state.eduData,
    getWorkData: (state) => state.workData,
    getCounterData: (state) => state.counterData,
  },
  actions: {
    formatDriveImageUrl(shareLink) {
      const match = shareLink.match(/\/d\/([a-zA-Z0-9_-]+)/) || shareLink.match(/id=([a-zA-Z0-9_-]+)/);
      if (!match) return null;
      return `https://lh3.googleusercontent.com/d/${match[1]}`;
    },
  },
});
