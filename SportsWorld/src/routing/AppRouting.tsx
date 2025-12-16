import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import AthleteAdminPage from "../pages/AthleteAdminPage";
import RegisterAthletePage from "../pages/RegisterAthletePage";
import DashBoardPage from "../pages/DashBoardPage";

const AppRouting = () => {
  return (
    <BrowserRouter>
      {/* HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-[#05060f]/95 via-[#0a0f2c]/95 to-[#05060f]/95 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-10 bg-indigo-500 rounded-full" />
            <span className="text-2xl font-semibold tracking-wide italic text-white">
              SportsWorld
            </span>
          </div>

          <nav>
            <ul className="flex items-center gap-10 text-sm font-medium">
              <li>
                <Link
                  to="/athletes"
                  className="text-white/80 hover:text-white transition relative
                  after:absolute after:-bottom-1 after:left-0 after:h-[2px]
                  after:w-0 after:bg-indigo-500 hover:after:w-full after:transition-all"
                >
                  Athletes
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="text-white/80 hover:text-white transition relative
                  after:absolute after:-bottom-1 after:left-0 after:h-[2px]
                  after:w-0 after:bg-indigo-500 hover:after:w-full after:transition-all"
                >
                  Register athlete
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard"
                  className="text-white/80 hover:text-white transition relative
                  after:absolute after:-bottom-1 after:left-0 after:h-[2px]
                  after:w-0 after:bg-indigo-500 hover:after:w-full after:transition-all"
                >
                  Dashboard (finances)
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main>
        <Routes>
          {/* ✅ Når du åpner /, send til /athletes */}
          <Route path="/" element={<Navigate to="/athletes" replace />} />

          <Route path="/athletes" element={<AthleteAdminPage />} />
          <Route path="/register" element={<RegisterAthletePage />} />
          <Route path="/dashboard" element={<DashBoardPage />} />

          {/* ✅ Hvis du skriver feil URL, send også til athletes */}
          <Route path="*" element={<Navigate to="/athletes" replace />} />
        </Routes>
      </main>

      <footer className="border-t border-white/5 bg-black/80 text-white/60 text-sm py-4 text-center">
       SportsWorld.
      </footer>
    </BrowserRouter>
  );
};

export default AppRouting;
