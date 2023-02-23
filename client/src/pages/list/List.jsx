import './list.scss';

import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';

const List = () => {
  return (
    <div className='home'>
      <Sidebar />
      <div className='homeContainer'>
        <Navbar />
        <div className='list'>
          <h1 className='title'>list</h1>
        </div>
      </div>
    </div>
  );
};

export default List;
