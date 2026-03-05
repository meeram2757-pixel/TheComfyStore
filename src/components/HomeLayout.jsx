import { Outlet, useNavigation } from 'react-router-dom';
import Navbar from './Navbar';
import Header from './Header';
import Loading from './Loading';

const HomeLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';

  return (
    <>
      <Header />
      <Navbar />
      {isPageLoading ? (
        <Loading />
      ) : (
        <section className='align-element py-20'>
          <Outlet />
        </section>
      )}
    </>
  );
};

export default HomeLayout;
