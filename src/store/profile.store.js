//👤 user info, about, bio | hero - about - contact - footer sections
import { defineStore } from 'pinia';
import { format } from 'prettier';

export const useProfileStore = defineStore('profile', {
  state: () => ({
    iconLink: 'https://res.cloudinary.com/dguoer1il/image/upload/v1766663835/logo1.2_vi14ps.png',
    cvLink: 'https://drive.google.com/uc?export=download&id=1ms6n1N13gegETFFKQSeF4eSmDncvm0R3',
    profileImg1Link: 'https://res.cloudinary.com/dguoer1il/image/upload/v1766663778/profile_ltf8a3.png',
    profileImg2Link: 'https://res.cloudinary.com/dguoer1il/image/upload/v1766663802/profile3_zxyibr.png',
    // hideAboutImg: true,

    heroSectionHeading: 'Hi, I am Osama Mahdi Front-end Developer',
    heroSectionDescription:
      "I'm a Vue.js | Front-end developer with deep expertise in JavaScript Currently expanding my skills in Front-end development with Vue.js to become a well-rounded front-end engineer. I study Cyber Security Engineering at the University College of Applied Sciences in Gaza.",

    storyBoxDescription: [
      {
        subTitle: '',
        subText:
          'After the war in Gaza and the closure of universities, I took the  opportunity to begin learning the fundamentals of web development — starting with HTML, CSS, and JavaScript. I built several projects using vanilla JavaScript, which helped me understand the core of how the web works. As I looked for the next step, I discovered a training opportunity with Gaza Sky Geeks focused on React and Next.js. I applied, passed the interview, and was accepted During this intensive program, my team and I built a project called Codepilot, which won first place in the final demo phase. After graduating, I focused on deepening my knowledge of JavaScript and building more projects using both React and Next.js. Driven to grow as a full-stack developer, I applied to the Gaza Sky Geeks Backend Bootcamp, where I was accepted after a competitive multi-stage selection process. Now, I’m continuing to expand my skill set by learning React Native while exploring backend technologies — on a mission to become a well-rounded software engineer.',
      },
    ],

    name: 'Osama Mahdi',
    jobTitle: 'Frontend Developer',
    languages: 'English (Conversational), Arabic (Native)',
    freelanceState: 'Freelance',

    detailsBox: [
      { subTitle: 'Name:', subText: 'Osama Mahdy' },
      { subTitle: 'Role:', subText: 'Front-end Developer | Vue.js' },
      { subTitle: 'Language:', subText: 'English, Arabic ' },
      { subTitle: 'Availability:', subText: 'Available' },
    ],

    contactDescription:
      "I'm currently open to new opportunities and collaborations.Whether you have a question, a project idea, or just want to say hello, feel free to reach out!",
    email: 'os6sooma@gmail.com',
    emailLink: 'mail.google.com/mail/?view=cm&to=os6sooma@gmail.com&su=Contact Request',
    whatsappNumber: '+972595295586',
    whatsappLink: 'https://wa.me//+972595295586',

    linkedInLink: 'https://linkedin.com/in/osama-mahdi',
    githubLink: 'www.github.com/osmahdy',
    instagramLink: 'https://www.instagram.com/_ohmahdi_/',

    footerHook: 'When you love what you do, creativity follows.',
    footerCopyrights: 'Osama Mahdi — Built with Vue.js & Tailwind CSS',
  }),

  getters: {
    // 🔹 Assets
    getIconLink: (state) => state.iconLink,
    getCvLink: (state) => state.cvLink,
    getProfileImg1: (state) => state.profileImg1Link,
    getProfileImg2: (state) => state.profileImg2Link,
    gethHideAboutImg: (state) => state.hideAboutImg,

    // 🔹 Hero
    getHeroHeading: (state) => state.heroSectionHeading,
    getHeroDescription: (state) => state.heroSectionDescription,

    // 🔹 About
    getStoryDescription: (state) => state.storyBoxDescription,
    getDetailsBox: (state) => state.detailsBox,

    // 🔹 Profile
    getName: (state) => state.name,
    getJobTitle: (state) => state.jobTitle,
    getLanguages: (state) => state.languages,
    getFreelanceState: (state) => state.freelanceState,

    // 🔹 Contact
    getContactDescription: (state) => state.contactDescription,
    getEmail: (state) => state.email,
    getEmailLink: (state) => state.emailLink,
    getWhatsappNumber: (state) => state.whatsappNumber,
    getWhatsappLink: (state) => state.whatsappLink,

    // 🔹 Social
    getLinkedIn: (state) => state.linkedInLink,
    getGithub: (state) => state.githubLink,
    getInstagram: (state) => state.instagramLink,

    // 🔹 Footer
    getFooterHook: (state) => state.footerHook,
    getFooterCopyrights: (state) => state.footerCopyrights,
  },

  actions: {
    foramtDriveImageUrl(shareLink) {
      // Extract the file ID using regex
      const match = shareLink.match(/\/d\/([a-zA-Z0-9_-]+)/) || shareLink.match(/id=([a-zA-Z0-9_-]+)/);
      if (!match) return null; // invalid link
      const fileId = match[1];
      return `https://lh3.googleusercontent.com/d/${fileId}`;
    },
    formatCvLink(link) {
      const match = link.match(/\/d\/([a-zA-Z0-9_-]+)/) || link.match(/id=([a-zA-Z0-9_-]+)/);
      if (!match) return null; // invalid link
      const fileId = match[1];
      return `https://drive.google.com/uc?export=download&id=${fileId}`;
    },
  },
});
