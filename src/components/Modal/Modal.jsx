import { useEffect } from 'react';
import s from './Modal.module.css';

export const Modal = ({ onCloseModal, largeImageURL, alt }) => {
  useEffect(() => {
    const closeEscp = e => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    };

    window.addEventListener('keydown', closeEscp);

    return () => {
      window.removeEventListener('keydown', closeEscp);
    };
  });

  const closeBackdropClick = ({ target, currentTarget }) => {
    if (currentTarget === target) {
      onCloseModal();
    }
  };

  return (
    <div>
      <div className={s.overlay} onClick={closeBackdropClick}>
        <div className={s.modal}>
          <img src={largeImageURL} alt={alt} />
        </div>
      </div>
    </div>
  );
};
