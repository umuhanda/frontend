import { englishQuestions } from './englishQuestions';
import { frenchQuestions } from './frenchQuestions';
import { kinyarwandaQuestions } from './kinyarwandaQuestions';

export const revisionQuestions = [
  {
    id: 1,
    title: kinyarwandaQuestions.title,
    author: kinyarwandaQuestions.author,
    description: kinyarwandaQuestions.description,
    status: kinyarwandaQuestions.status,
    contact: kinyarwandaQuestions.contact,
    questions: kinyarwandaQuestions.questions,
  },
  {
    id: 2,
    title: englishQuestions.title,
    author: englishQuestions.author,
    description: englishQuestions.description,
    status: englishQuestions.status,
    contact: englishQuestions.contact,
    questions: englishQuestions.questions,
  },
  {
    id: 3,
    title: frenchQuestions.title,
    author: frenchQuestions.author,
    description: frenchQuestions.description,
    status: frenchQuestions.status,
    contact: frenchQuestions.contact,
    questions: frenchQuestions.questions,
  },
];
