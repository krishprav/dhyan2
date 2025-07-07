import {
  DhyanApp,
  Home,
  Articles,
  AudioBooks,
  Pravachans,
  Motivation,
  GuruBot,
  Books,
  Meditation1,
  Meditation2,
  Meditation3,
  Pranayama1,
  Pranayama2,
  Pranayama3,
  Mantra1,
  Mantra2,
  Mantra3,
  Knowledge1,
  Knowledge2,
  Knowledge3,
  Yoga1,
  Yoga2,
  Yoga3,
} from "../utils";

export const categories = [
  { 
    name: 'Meditation', 
    images: [Meditation1, Meditation2, Meditation3],
    description: 'Find inner peace and clarity with guided meditations. Quieten your mind, reduce stress, and cultivate a deeper connection with yourself.',
    colors: [["#8F8A81", "#ffe7b9", "#6f6c64"], ["#53596E", "#6395ff", "#21242e"], ["#C9C8C2", "#ffffff", "#C9C8C2"]]
  },
  { 
    name: 'Pranayama', 
    images: [Pranayama1, Pranayama2, Pranayama3], 
    description: 'Master the art of breathing with guided pranayama exercises that enhance your energy, focus, and overall well-being through ancient practices.',
    colors: [["#53596E", "#6395ff", "#21242e"], ["#8F8A81", "#ffe7b9", "#6f6c64"], ["#454749", "#3b3b3b", "#181819"]]
  },
  { 
    name: 'Mantra', 
    images: [Mantra1, Mantra2, Mantra3], 
    description: 'Discover the power of sacred sounds and mantras that have been used for centuries to achieve deeper states of consciousness and inner peace.',
    colors: [["#C9C8C2", "#ffffff", "#C9C8C2"], ["#454749", "#3b3b3b", "#181819"], ["#8F8A81", "#ffe7b9", "#6f6c64"]]
  },
  { 
    name: 'Knowledge', 
    images: [Knowledge1, Knowledge2, Knowledge3], 
    description: 'Expand your understanding with curated knowledge about mindfulness, meditation philosophy, and practical wisdom for daily life transformation.',
    colors: [["#454749", "#3b3b3b", "#181819"], ["#53596E", "#6395ff", "#21242e"], ["#C9C8C2", "#ffffff", "#C9C8C2"]]
  },
  { 
    name: 'Yoga', 
    images: [Yoga1, Yoga2, Yoga3], 
    description: 'Integrate physical movement with mindful awareness through yoga sequences that strengthen your body while calming your mind and spirit.',
    colors: [["#8F8A81", "#ffe7b9", "#6f6c64"], ["#53596E", "#6395ff", "#21242e"], ["#454749", "#3b3b3b", "#181819"]]
  },
];

export const models = [
  {
    id: 1,
    title: "Meditation",
    color: ["#8F8A81", "#ffe7b9", "#6f6c64"],
    img: DhyanApp,
  },
  {
    id: 2,
    title: "Pranayama",
    color: ["#53596E", "#6395ff", "#21242e"],
    img: Home,
  },
  {
    id: 3,
    title: "Mantra",
    color: ["#C9C8C2", "#ffffff", "#C9C8C2"],
    img: Articles,
  },
  {
    id: 4,
    title: "Knowledge",
    color: ["#454749", "#3b3b3b", "#181819"],
    img: AudioBooks,
  },
  {
    id: 5,
    title: "Yoga",
    color: ["#8F8A81", "#ffe7b9", "#6f6c64"],
    img: Pravachans,
  },
  {
    id: 6,
    title: "Meditation+",
    color: ["#53596E", "#6395ff", "#21242e"],
    img: Motivation,
  },
  {
    id: 7,
    title: "Pranayama+",
    color: ["#C9C8C2", "#ffffff", "#C9C8C2"],
    img: GuruBot,
  },
  {
    id: 8,
    title: "Mantra+",
    color: ["#454749", "#3b3b3b", "#181819"],
    img: Books,
  },
];

export const sizes = [
  { label: 'Meditation', value: "small" },
  { label: 'Pranayama', value: "large" },
  { label: 'Mantra', value: "medium" },
  { label: 'Knowledge', value: "large" },
  { label: 'Yoga', value: "small" },
];