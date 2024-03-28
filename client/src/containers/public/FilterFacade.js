// FilterFacade.js
import { useState } from 'react';

const useFilterFacade = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [content, setContent] = useState([]);
  const [name, setName] = useState('');
  const [queries, setQueries] = useState({});
  const [defaultText, setDefaultText] = useState('');

  const handleShowModal = (content, name, defaultText) => {
    setContent(content);
    setName(name);
    setDefaultText(defaultText);
    setIsShowModal(true);
  };

  const handleSubmit = (e, query) => {
    e.stopPropagation();
    setQueries(prev => ({ ...prev, ...query }));
    setIsShowModal(false);
  };

  return {
    isShowModal,
    content,
    name,
    queries,
    defaultText,
    handleShowModal,
    handleSubmit,
    setIsShowModal,
  };
};

export default useFilterFacade;