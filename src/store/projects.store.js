//📦 projects collection | projects section

import { defineStore } from 'pinia';
import q5 from '../assets/projects/q5.png';
import html from '../assets/skills/html.svg';
import css from '../assets/skills/css.svg';
import js from '../assets/skills/js.svg';

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    categoryClicked: 'All',
    categoryClickedIndex: 0,
    categories: ['All', 'Featured', 'Vue.js', 'HTML/CSS'],
    projects: [
      {
        id: 'p1',
        title: 'Project One',
        description: 'This is a brief description of Project One.',
        categories: ['All', 'Vue.js', 'Featured'],
        image: 'https://res.cloudinary.com/dguoer1il/image/upload/v1766663832/q6_wopk6g.png',
        liveLink: 'https://liveprojectone.com',
        github: 'https://github.com/projectone',
        tagType: 'img',
        tags: [html, css, js, html],
      },
      {
        id: 'p2',
        title: 'Project Two',
        description: 'This is a brief description of Project Two.',
        categories: ['All', 'HTML/CSS', 'Featured'],
        image: 'https://res.cloudinary.com/dguoer1il/image/upload/v1766663831/q7_esl6jy.png',
        liveLink: 'https://liveprojecttwo.com',
        github: 'https://github.com/projectone',
        tagType: 'img',
        tags: [html, css, js, html],
      },
      {
        id: 'p3',
        title: 'Project 3',
        description: 'This is a brief description of Project Three.',
        categories: ['All', 'HTML/CSS', 'Featured'],
        image: 'https://res.cloudinary.com/dguoer1il/image/upload/v1766663814/q4_g50a7l.png',
        liveLink: 'https://liveprojectthree.com',
        github: 'https://github.com/projectthree',
        tagType: 'img',
        tags: [html, css, js, html],
      },
      {
        id: 'p4',
        title: 'Project 4',
        description: 'This is a brief description of Project Four.',
        categories: ['All', 'HTML/CSS'],
        image: 'https://res.cloudinary.com/dguoer1il/image/upload/v1766663814/q4_g50a7l.png',
        liveLink: 'https://liveprojectfour.com',
        github: 'https://github.com/projectfour',
        tagType: 'img',
        tags: [html, css, js, html],
      },
      {
        id: 'p5',
        title: 'Project Five',
        description: 'This is a brief description of Project Five.',
        categories: ['All', 'Vue.js'],
        image: 'https://res.cloudinary.com/dguoer1il/image/upload/v1766663814/q4_g50a7l.png',
        liveLink: 'https://liveprojectfive.com',
        github: 'https://github.com/projectfive',
        tagType: 'img',
        tags: [html, css, js, html],
      },
      {
        id: 'p6',
        title: 'Project 6',
        description: 'This is a brief description of Project Six.',
        categories: ['All', 'Vue.js'],
        image: 'https://res.cloudinary.com/dguoer1il/image/upload/v1766663814/q4_g50a7l.png',
        liveLink: 'https://liveprojectsix.com',
        github: 'https://github.com/projectsix',
        tagType: 'img',
        tags: [html, css, js, html],
      },
    ],
  }),
  getters: {
    getCategoryClicked: (state) => state.categoryClicked ?? state.categories[0],
    getCategories: (state) => state.categories,
    // getProjectsData: (state) => state.projects,
    getCategoryClickedIndex: (state) => state.categories.indexOf(state.categoryClicked),
    getProjectsData: (state) => state.projects,
    getProjectsByCategory: (state) => (category) => {
      if (category === 'All') return state.projects;

      return state.projects.filter((project) => project.categories.includes(category));
    },
  },
  actions: {
    setCategoryClicked(category) {
      this.categoryClicked = category;
    },
  },
});
