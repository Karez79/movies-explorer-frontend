import { MovieCard } from '../MovieCard/MovieCard';
import styles from './MoviesCardList.module.css';

const MoviesCardList = ({ device }) => {
  const movies = [
    {
      'id': 1,
      'url': '33-slova-o-disaine',
      'preview': '/images/movies/desktop/1.jpg',
      'name': '33 слова о дизайне',
      'length': '1ч42м',
      'favorite': false,
      'short': true
    },
    {
      'id': 2,
      'url': '34-slova-o-disaine',
      'preview': '/images/movies/desktop/2.jpg',
      'name': '33 слова о дизайне',
      'length': '1ч42м',
      'favorite': true,
      'short': true
    },
    {
      'id': 3,
      'url': '35-slova-o-disaine',
      'preview': '/images/movies/desktop/3.jpg',
      'name': '33 слова о дизайне',
      'length': '1ч42м',
      'favorite': false,
      'short': false
    },
    {
      'id': 4,
      'url': '36-slova-o-disaine',
      'preview': '/images/movies/desktop/4.jpg',
      'name': '33 слова о дизайне',
      'length': '1ч42м',
      'favorite': false,
      'short': false
    },
    {
      'id': 5,
      'url': '33-slova-o-disaine',
      'preview': '/images/movies/desktop/5.jpg',
      'name': '33 слова о дизайне',
      'length': '1ч42м',
      'favorite': true,
      'short': true
    },
    {
      'id': 6,
      'url': '33-slova-o-disaine',
      'preview': '/images/movies/desktop/6.jpg',
      'name': '33 слова о дизайне',
      'length': '1ч42м',
      'favorite': false,
      'short': false
    },
    {
      'id': 7,
      'url': '33-slova-o-disaine',
      'preview': '/images/movies/desktop/7.jpg',
      'name': '33 слова о дизайне',
      'length': '1ч42м',
      'favorite': false,
      'short': false
    },
    {
      'id': 8,
      'url': '33-slova-o-disaine',
      'preview': '/images/movies/desktop/8.jpg',
      'name': '33 слова о дизайне',
      'length': '1ч42м',
      'favorite': true,
      'short': false
    },
    {
      'id': 9,
      'url': '33-slova-o-disaine',
      'preview': '/images/movies/desktop/9.jpg',
      'name': '33 слова о дизайне',
      'length': '1ч42м',
      'favorite': false,
      'short': false
    },
    {
      'id': 10,
      'url': '33-slova-o-disaine',
      'preview': '/images/movies/desktop/10.jpg',
      'name': '33 слова о дизайне',
      'length': '1ч42м',
      'favorite': false,
      'short': false
    },
    {
      'id': 11,
      'url': '33-slova-o-disaine',
      'preview': '/images/movies/desktop/11.jpg',
      'name': '33 слова о дизайне',
      'length': '1ч42м',
      'favorite': true,
      'short': false
    },
    {
      'id': 12,
      'url': '33-slova-o-disaine',
      'preview': '/images/movies/desktop/12.jpg',
      'name': '33 слова о дизайне',
      'length': '1ч42м',
      'favorite': false,
      'short': true
    },
    {
      'id': 13,
      'url': '33-slova-o-disaine',
      'preview': '/images/movies/desktop/13.jpg',
      'name': '33 слова о дизайне',
      'length': '1ч42м',
      'favorite': true,
      'short': false
    },
    {
      'id': 14,
      'url': '33-slova-o-disaine',
      'preview': '/images/movies/desktop/14.jpg',
      'name': '33 слова о дизайне',
      'length': '1ч42м',
      'favorite': false,
      'short': false
    },
    {
      'id': 15,
      'url': '33-slova-o-disaine',
      'preview': '/images/movies/desktop/15.jpg',
      'name': '33 слова о дизайне',
      'length': '1ч42м',
      'favorite': false,
      'short': true
    },
    {
      'id': 16,
      'url': '33-slova-o-disaine',
      'preview': '/images/movies/desktop/16.jpg',
      'name': '33 слова о дизайне',
      'length': '1ч42м',
      'favorite': true,
      'short': false
    },
  ];

  let cards;

  switch (device) {
    case 'mobile':
      cards = movies
        .slice(0, 5)
        .map(movie => (<MovieCard key={movie.id} movie={movie} page="movies" />));
      break
    case 'tablet':
      cards = movies
        .slice(0, 8)
        .map(movie => (<MovieCard key={movie.id} movie={movie} page="movies" />));
      break
    case 'desktop':
      cards = movies
        .slice(0, 16)
        .map(movie => (<MovieCard key={movie.id} movie={movie} page="movies" />));
      break
    default:
      cards = null;
  }

  return (
    <section className={`${styles.movies__cardList} container ${device === 'mobile' ? 'container--promo' : ''}`}>
      {
        movies ? cards : <h2>Фильмов не найдено!</h2>
      }
    </section>
  )
}

export default MoviesCardList;