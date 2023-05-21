import { useState, useEffect } from 'react';
import { Button } from './Button/Button';
import { fetchMovies } from 'services/movies-api';
import { MoviesList } from './MoviesList/MoviesList';
import Modal from './Modal/Modal';

export const App = () => {
  const [isListShow, setIsListShow] = useState(false);
  const [movies, setMovies] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [currentImage, setCurrentImage] = useState(null);

  const toggleVisibility = () => {
    setIsListShow(prev => !prev);
  };

  useEffect(() => {
    if (isListShow) {
      setIsLoader(true);

      fetchMovies(page)
        .then(({ data: { results } }) => {
          setMovies(prev => [...prev, ...results]);
        })
        .catch(eror => console.log(eror))
        .finally(() => {
          setIsLoader(false);
        });
    }

    if (!isListShow) {
      setMovies([]);
      setPage(1);
    }
  }, [isListShow, page]);

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  const deleteMovie = id => {
    setMovies(prev => prev.filter(el => el.id !== id));
  };

  const openModal = data => {
    setCurrentImage(data);
  };

  const closeModal = () => {
    setCurrentImage(null);
  };

  return (
    <>
      <Button
        clickHandler={toggleVisibility}
        text={isListShow ? 'hide movies list' : 'show movies list'}
      />

      {isListShow && (
        <>
          <MoviesList
            movies={movies}
            onDeleteMovie={deleteMovie}
            openModal={openModal}
          />
          {isLoader && <Button text={'load more'} clickHandler={loadMore} />}
        </>
      )}
      {currentImage && (
        <Modal currentImage={currentImage} closeModal={closeModal} />
      )}
    </>
  );
};

// export class App extends Component {
//   state = {
//     isListShow: false,
//     movies: [],
//     isLoader: false,
//     page: 1,
//   };

//   toggleVisibility = () => {
//     this.setState(prevState => ({
//       isListShow: !prevState.isListShow,
//     }));
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const { isListShow, page } = this.state;
//     if (
//       (prevState.isListShow !== isListShow || prevState.page !== page) &&
//       isListShow
//     ) {
//       this.setState({ isLoader: true });
//       fetchMovies(page)
//         .then(({ data: { results } }) => {
//           this.setState(prevState => ({
//             movies: [...prevState.movies, ...results],
//           }));
//         })
//         .catch(eror => console.log(eror))
//         .finally(() => {
//           this.setState({ isLoader: false });
//         });
//     }
//     if (prevState.isListShow !== isListShow && !isListShow) {
//       this.setState({
//         movies: [],
//         page: 1,
//       });
//     }
//   }
//   loadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   render() {
//     const { isListShow, movies } = this.state;
//     return (
//       <>
//         <Button
//           clickHandler={this.toggleVisibility}
//           text={isListShow ? 'hide movies list' : 'show movies list'}
//         />

//         {isListShow && (
//           <>
//             <MoviesList movies={movies} />
//             <Button text={'load more'} clickHandler={this.loadMore} />
//           </>
//         )}
//       </>
//     );
//   }
// }
