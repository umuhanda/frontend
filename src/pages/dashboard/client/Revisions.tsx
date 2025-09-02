import { useMemo } from 'react';
import { useLanguage } from '../../../hooks/useLanguage';
import { revisionQuestions } from '../../../utils/RevisionQuestions';
import Revision from './Revision';

const Revisions = () => {

  const contextLanguage = useLanguage()

  const questions = useMemo(() => {
    return revisionQuestions.filter((lesson) => lesson.status === contextLanguage.state.currentName);
  }, [contextLanguage]);


  return <Revision questions={questions} />;
};

export default Revisions;
