import "./App.css";
import { Toaster } from "react-hot-toast";
import SearchBar from "./SearchBar/SearchBar";
import ImageGallery from "./ImageGallery/ImageGallery";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import ImageModal from "./ImageModal/ImageModal";
import Loader from "./Loader/Loader";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import { fetchImages } from "./Services/Api";
import { useState } from "react";

export default function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const openModal = (image) => {
    if (!isModalOpen) {
      setSelectedImage(image);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const handleSearch = async (newQuery) => {
    setIsLoading(true);
    setError(null);
    setQuery(newQuery);
    setPage(1);
    try {
      const fetchedImages = await fetchImages(newQuery, 1);
      setImages(fetchedImages);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const nextPage = page + 1;
      const fetchedImages = await fetchImages(query, nextPage);
      setImages((prevImages) => [...prevImages, ...fetchedImages]);
      setPage(nextPage);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <ImageGallery images={images} onImageClick={openModal} />
      {images.length > 0 && !isLoading && (
        <div className="load-more-container">
          <LoadMoreBtn onClick={handleLoadMore} />
        </div>
      )}
      <ImageModal
        isOpen={isModalOpen}
        image={selectedImage}
        onClose={closeModal}
      />
      <Toaster />
    </div>
  );
}
