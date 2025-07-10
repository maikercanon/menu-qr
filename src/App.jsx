import { Routes, Route } from 'react-router-dom';
import PublicMenu from './components/PublicMenu';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicMenu />} />
      <Route path="/menu" element={<PublicMenu />} />
    </Routes>
  );
}

export default App;
