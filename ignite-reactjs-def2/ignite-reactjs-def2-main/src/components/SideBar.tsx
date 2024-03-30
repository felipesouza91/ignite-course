import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { api } from '../services/api';
import { Button } from './Button';
interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface SideBarProps {
  setSelectGenreId: Function;
}

export function SideBar(props: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
    props.setSelectGenreId(id);
  }

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then((response) => {
      setGenres(response.data);
    });
    api
      .get<GenreResponseProps>(`genres/${selectedGenreId}`)
      .then((response) => {
        setSelectedGenre(response.data);
      });
  }, []);

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
