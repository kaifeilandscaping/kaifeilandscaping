'use client';

import { useEffect, useRef, useState } from 'react';
import { galleryCategories } from '@/app/data/galleryData';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState(galleryCategories[0].id);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const currentCategory = galleryCategories.find(
    (cat) => cat.id === activeCategory
  );
  const currentIndex = currentCategory?.photos.findIndex(
    (photo) => photo.id === selectedPhoto
  );
  const currentPhoto = currentCategory?.photos[currentIndex ?? -1] ?? null;

  useEffect(() => {
    if (!selectedPhoto) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedPhoto(null);
        return;
      }

      if (!currentCategory || currentIndex === undefined || currentIndex < 0) {
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        const nextIndex =
          currentIndex + 1 >= currentCategory.photos.length
            ? 0
            : currentIndex + 1;
        setSelectedPhoto(currentCategory.photos[nextIndex].id);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        const prevIndex =
          currentIndex <= 0
            ? currentCategory.photos.length - 1
            : currentIndex - 1;
        setSelectedPhoto(currentCategory.photos[prevIndex].id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto, currentCategory, currentIndex]);

  useEffect(() => {
    if (selectedPhoto && modalRef.current) {
      modalRef.current.focus();
    }
  }, [selectedPhoto]);

  return (
    <section id="gallery" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2d4a3e] mb-4">
            Projects Gallery
          </h2>
          <p className="text-lg text-gray-600">
            Explore our portfolio of beautiful landscape designs and installations
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {galleryCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                activeCategory === category.id
                  ? 'bg-[#2d4a3e] text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Category Description */}
        {currentCategory && (
          <p className="text-center text-gray-600 mb-12">
            {currentCategory.description}
          </p>
        )}

        {/* Gallery Grid */}
        {currentCategory && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {currentCategory.photos.map((photo) => (
              <div
                key={photo.id}
                className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer hover:shadow transition-all"
                onClick={() => setSelectedPhoto(photo.id)}
              >
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="text-white font-semibold text-lg">
                    {photo.title}
                  </h3>
                  {photo.description && (
                    <p className="text-gray-200 text-sm mt-1">
                      {photo.description}
                    </p>
                  )}
                </div> */}
              </div>
            ))}
          </div>
        )}

        {/* Modal Lightbox */}
        {selectedPhoto && currentCategory && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              ref={modalRef}
              tabIndex={-1}
              className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden focus:outline-none"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors z-10 cursor-pointer"
                aria-label="Close"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <button
                onClick={() => {
                  const activeIndex = currentIndex ?? -1;
                  if (activeIndex < 0) return;
                  const prevIndex =
                    activeIndex > 0
                      ? activeIndex - 1
                      : currentCategory.photos.length - 1;
                  setSelectedPhoto(currentCategory.photos[prevIndex].id);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-3 shadow hover:bg-white transition-colors z-10"
                aria-label="Previous photo"
              >
                ‹
              </button>

              <button
                onClick={() => {
                  const activeIndex = currentIndex ?? -1;
                  if (activeIndex < 0) return;
                  const nextIndex =
                    activeIndex + 1 < currentCategory.photos.length
                      ? activeIndex + 1
                      : 0;
                  setSelectedPhoto(currentCategory.photos[nextIndex].id);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-3 shadow hover:bg-white transition-colors z-10"
                aria-label="Next photo"
              >
                ›
              </button>

              {currentPhoto && (
                <div>
                  <img
                    src={currentPhoto.imageUrl}
                    alt={currentPhoto.title}
                    className="w-full h-auto"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
