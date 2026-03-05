import { Outlet, useNavigation } from "react-router-dom";
import { Header, Navbar, Loading } from "../components";

const HomeLayout = () => {
  const navigationState = useNavigation();
  const isPageLoading = navigationState.state === "loading";

  return (
    <>
      <Header />
      <Navbar />
      {isPageLoading ? (
        <Loading />
      ) : (
        <section className="align-element py-20">
          <Outlet />
        </section>
      )}
    </>
  );
};

export default HomeLayout;

