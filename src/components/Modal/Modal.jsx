import { useEffect } from 'react';

const Modal = ({ currentImage: { alt, src }, closeModal }) => {
  useEffect(() => {
    const closeWithEcs = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', closeWithEcs);

    return () => {
      window.removeEventListener('keydown', closeWithEcs);
    };
  }, [closeModal]);

  return (
    <div>
      <div>
        <img src={`https://image.tmdb.org/t/p/w500${src}`} alt={alt} />
        <button type="button" onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
