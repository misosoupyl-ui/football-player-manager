import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AthleteAdminPage from "../pages/AthleteAdminPage";
import RegisterAthletePage from "../pages/RegisterAthletePage";
import DashBoardPage from "../pages/DashBoardPage";

const AppRouting = () => {
  return (
    <>
      <BrowserRouter>
        {/*https://tailscan.com/tailwind/backgrounds/to-slate-800*/}
        <header className="!bg-slate-700 p-6 shadow-xl/30 !backdrop-blur-xl flex justify-between items-center bg-linear-to-b to-slate-900 from-blue-900/50  ">
          <div className="font-bold text-3xl italic text-indigo-500">
            SportsWorld
          </div>
          <nav className="">
            <ul className="flex gap-16 mt-6">
              <li className="h-16 ">
                <Link
                  to="/athletes"
                  className="!text-white !font-semibold text-xl"
                >
                  Athletes
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="!text-white !font-semibold text-xl"
                >
                  Register Athlete
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="!text-white !font-semibold text-xl"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/athletes" element={<AthleteAdminPage />}></Route>
            <Route path="/register" element={<RegisterAthletePage />}></Route>
            <Route path="/dashboard" element={<DashBoardPage />}></Route>
          </Routes>
        </main>
      </BrowserRouter>
      <footer className="bg-gray-800 text-white p-4 text-center"></footer>
    </>
  );
};

export default AppRouting;
