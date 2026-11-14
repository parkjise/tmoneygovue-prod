import questions from '@/data/vuePracticeQuestions.json';
export const vueExercises = questions;
export const exerciseCategories = [...new Set(questions.map((item) => item.category))];
