import { Modal } from 'components/Modal/Modal';
import React, { useState } from 'react';
import s from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <li className={s.galleryItem} onClick={toggleModal}>
        <img src={webformatURL} alt={tags} className={s.galleryImg} />
      </li>
      {isModalOpen && (
        <Modal
          largeImageURL={largeImageURL}
          alt={tags}
          onCloseModal={toggleModal}
        />
      )}
    </>
  );
};
