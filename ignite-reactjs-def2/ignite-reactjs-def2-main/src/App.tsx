import './styles/global.scss';

import './styles/sidebar.scss';
import './styles/content.scss';
import { SideBar } from './components/SideBar';
import { Content } from './components/Content';
import { useState } from 'react';

export function App() {
  const [selectId, setSelectId] = useState(1);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar setSelectGenreId={setSelectId} />
      <Content selectedGenreId={selectId} />
    </div>
  );
}
