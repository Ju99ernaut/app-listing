import { useContext } from 'react';
import LayoutContext from '../contexts/LayoutContext';
import Grid from '../components/Grid';

const Home = () => {
  const ctx = useContext(LayoutContext);

  return (
    <div className="App">
      <Grid auth={ctx.authenticated} authorization={ctx.token} profileMd={() => ctx.showMdl('profile')} />
    </div>
  );
}

export default Home;