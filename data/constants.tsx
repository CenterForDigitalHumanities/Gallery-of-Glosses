// (site)/page.tsx
export const images: string[] = [
  "https://images.unsplash.com/photo-1643609873467-15cfffe782be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
  "https://images.unsplash.com/photo-1602660187275-7275b639d7ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1546&q=80",
  "https://images.unsplash.com/photo-1472173148041-00294f0814a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1603361233308-b3ec0f7c0a16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1216&q=80",
  "https://images.unsplash.com/photo-1603027862808-3661a3fb6923?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=692&q=80",
];

// about/components/Sections.tsx
export const menuSections = [
  {
    title: "About Us",
    src: "https://images.unsplash.com/photo-1455849318743-b2233052fcff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFib3V0JTIwdXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    content: "About",
  },
  {
    title: "Project History",
    src: "https://images.unsplash.com/photo-1522442676585-c751dab71864?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    content: "History",
  },
  {
    title: "Terminology and Abbreviations",
    src: "https://images.unsplash.com/photo-1563906267088-b029e7101114?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    content: "Terms",
  },
];

// about/components/AboutContent.tsx
export const aboutSections = [
  {
    title: "Who We Are",
    content:
      "The Gallery of Glosses is an open-access digital platform devoted to revealing the richness of the medieval era through a meticulous study and interpretation of glosses from 12th-century manuscripts.",
  },
  {
    title: "Our Mission",
    content:
      "Our mission is to bridge the gap between past and present, connecting today's scholars, students, and enthusiasts with the scholars of the medieval era whose voices have been 'lost to the margins for centuries'.",
  },
  {
    title: "Our Collection",
    content:
      "We curate a broad collection of annotated manuscripts, primarily from the Gospel of Matthew, enabling a deeper understanding of the thought processes, ideas, and creative doodles of medieval minds.",
  },
  {
    title: "For Educators and Students",
    content:
      "We provide an immersive experience that allows students to engage directly with historical texts, fostering the development of translation and transcription skills, and offer educators a wealth of source material for their courses.",
  },
  {
    title: "Our Legacy",
    content:
      "With the Gallery of Glosses, we hope to have created a project with longevity, shedding light on medieval scholarship in a way that resonates through the centuries and influences future interpretations.",
  },
  {
    title: "What is a Gloss?",
    content:
      "A gloss is a note or explanation inserted in the margins or between lines of a text to explain, translate, or expand on difficult or complex passages. They serve as a valuable insight into the scholarly and interpretative practices of the past, providing context and interpretations for text that can aid in our understanding of medieval theology, philosophy, and law.",
  },
  {
    title: "Why Study Glosses?",
    content:
      "Glosses provide a unique perspective on the ways medieval scholars understood and interpreted canonical texts. By studying these annotations, we gain insights into the intellectual landscape of the medieval period, and how scholars grappled with the complexities of the texts they studied.",
  },
];

// about/components/HistoryContent.tsx
export const historySections = [
  {
    date: "May 15",
    image: "/images/may_pict.png",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem modi eos maiores reprehenderit non ",
  },
  {
    date: "June 15",
    image: "/images/june_pict.png",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem modi.",
  },
  {
    date: "July 15",
    image: "/images/july_pict.png",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit laboriosam nostrum esse neque voluptates quidem.",
  },
  {
    date: "August 15",
    image: "",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus blanditiis ab corporis sequi delectus aliquam atque iusto? Facilis.",
  },
];

// about/components/TermsContent.tsx
export const terms = [
  {
    title: "Gloss",
    desc: "A gloss is an individual version of an explanation or interpretation found in one or more manuscripts. It provides brief marginal or interlinear annotations explaining the meaning of a word or wording in a text.",
  },
  {
    title: "Meta-Gloss",
    desc: "A meta-gloss represents the abstract idea of a gloss, of which various individual glosses are instances or versions.",
  },
  { title: "Glossary", desc: "A curated collection of glosses." },
];

// about/components/TermsContent.tsx
export const abbreviations = [
  {
    title: "Mt",
    desc: "This stands for the Gospel of Matthew, a part of the Bible. It is used as an authoritative text for the context of some glosses.",
  },
  {
    title: "[##:##]",
    desc: "A canonical reference system common in theological studies, where the numbers before and after the colon respectively represent the chapter and verse of a book from the Bible, e.g., Matthew 5:16 refers to Chapter 5, Verse 16 of the Gospel of Matthew.",
  },
];
