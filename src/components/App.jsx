import { Component } from 'react';
import { Button } from './Button/Button';
import { fetchMovies } from 'services/movies-api';
import { MoviesList } from './MoviesList/MoviesList';

export class App extends Component {
  state = {
    isListShow: false,
    movies: [],
    isLoader: false,
    page: 1,
  };
  toggleVisibility = () => {
    this.setState(prevState => ({
      isListShow: !prevState.isListShow,
    }));
  };
  componentDidUpdate(prevProps, prevState) {
    const { isListShow, page } = this.state;
    if (
      (prevState.isListShow !== isListShow || prevState.page !== page) &&
      isListShow
    ) {
      this.setState({ isLoader: true });
      fetchMovies(page)
        .then(({ data: { results } }) => {
          this.setState(prevState => ({
            movies: [...prevState.movies, ...results],
          }));
        })
        .catch(eror => console.log(eror))
        .finally(() => {
          this.setState({ isLoader: false });
        });
    }
    if (prevState.isListShow !== isListShow && !isListShow) {
      this.setState({
        movies: [],
        page: 1,
      });
    }
  }
  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { isListShow, movies } = this.state;
    return (
      <>
        <Button
          clickHandler={this.toggleVisibility}
          text={isListShow ? 'hide movies list' : 'show movies list'}
        />

        {isListShow && (
          <>
            <MoviesList movies={movies} />
            <Button text={'load more'} clickHandler={this.loadMore} />
          </>
        )}
      </>
    );
  }
}
