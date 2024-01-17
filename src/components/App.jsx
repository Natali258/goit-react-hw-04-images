import React, { useEffect, useState } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { FetchImage } from 'services/api';

export const App = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [galleryImg, setGalleryImg] = useState([]);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (search !== '') {
      fetchGalleryItems(search, page);
    }
  }, [search, page]);

  const fetchGalleryItems = (search, page) => {
    setShowLoader(true);

    FetchImage(search, page)
      .then(({ data }) => {
        if (!data.hits.length) {
          setIsEmpty(true);
          setIsLoadMore(false);
          return;
        }
        setGalleryImg(prev => [...prev, ...data.hits]);
        setIsLoadMore(page < Math.ceil(data.total / 12));
      })
      .finally(() => setShowLoader(false));
  };

  const searchName = search => {
    setSearch('');
    setPage(1);
    setGalleryImg([]);
    setIsEmpty(false);
    setShowLoader(true);

    setSearch(search);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div>
      <Searchbar search={searchName} />
      <ImageGallery galleryImgs={galleryImg} />
      {isLoadMore && <Button loadMore={handleLoadMore} />}
      {showLoader && <Loader />}

      {isEmpty && (
        <p>
          'Sorry, there are no images matching your search query. Please try
          again.
        </p>
      )}
    </div>
  );
};
