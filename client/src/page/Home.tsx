import Header from "./Header";
import Categories from "./Categories";
import { Outlet } from "react-router";

function Home() {


  return (
    <>
      <div className="h-screen overflow-hidden">
        <Header />
        <div className="flex h-full">
          <Categories />
          <Outlet />
        </div>
      </div>

    </>
  );
}

export default Home;