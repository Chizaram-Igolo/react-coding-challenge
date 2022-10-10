import { Routes, Route, Link, useLocation } from "react-router-dom";

import Dashboard from "views/Dashboard";
import Overview from "views/Overview";

function NavigationBar() {
  const location = useLocation();

  return (
    <div className="flex p-4 px-4 space-x-3 border-b text-sm text-gray-700">
      <Link to="/">
        <h2 className="text-2xl font-FiraSans_BoldItalic">daash</h2>
      </Link>
      {location.pathname === "/overview" ? (
        <Link to="/">
          <button
            type="submit"
            className="flex h-8 w-auto lg:w-40 text-white bg-blue-600 
                 hover:bg-blue-700 focus:ring-4 focus:outline-none 
                 focus:ring-blue-300 font-FiraSans_Medium rounded-md text-sm 
                  px-5 py-[7px] text-center"
          >
            Go to Table
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="-mt-[2px] ml-2 w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M.99 5.24A2.25 2.25 0 013.25 3h13.5A2.25 2.25 0 0119 5.25l.01 9.5A2.25 2.25 0 0116.76 17H3.26A2.267 2.267 0 011 14.74l-.01-9.5zm8.26 9.52v-.625a.75.75 0 00-.75-.75H3.25a.75.75 0 00-.75.75v.615c0 .414.336.75.75.75h5.373a.75.75 0 00.627-.74zm1.5 0a.75.75 0 00.627.74h5.373a.75.75 0 00.75-.75v-.615a.75.75 0 00-.75-.75H11.5a.75.75 0 00-.75.75v.625zm6.75-3.63v-.625a.75.75 0 00-.75-.75H11.5a.75.75 0 00-.75.75v.625c0 .414.336.75.75.75h5.25a.75.75 0 00.75-.75zm-8.25 0v-.625a.75.75 0 00-.75-.75H3.25a.75.75 0 00-.75.75v.625c0 .414.336.75.75.75H8.5a.75.75 0 00.75-.75zM17.5 7.5v-.625a.75.75 0 00-.75-.75H11.5a.75.75 0 00-.75.75V7.5c0 .414.336.75.75.75h5.25a.75.75 0 00.75-.75zm-8.25 0v-.625a.75.75 0 00-.75-.75H3.25a.75.75 0 00-.75.75V7.5c0 .414.336.75.75.75H8.5a.75.75 0 00.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </Link>
      ) : (
        <Link to="/overview">
          <button
            type="submit"
            className="flex h-8 w-auto lg:w-auto text-white bg-blue-600 
                   hover:bg-blue-700 focus:ring-4 focus:outline-none 
                   focus:ring-blue-300 font-FiraSans_Medium rounded-md text-sm 
                    px-5 py-[7px] text-center"
          >
            Go to Overview
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="-mt-[2px] ml-2 w-5 h-5"
            >
              <path d="M12 9a1 1 0 01-1-1V3c0-.553.45-1.008.997-.93a7.004 7.004 0 015.933 5.933c.078.547-.378.997-.93.997h-5z" />
              <path d="M8.003 4.07C8.55 3.992 9 4.447 9 5v5a1 1 0 001 1h5c.552 0 1.008.45.93.997A7.001 7.001 0 012 11a7.002 7.002 0 016.003-6.93z" />
            </svg>
          </button>
        </Link>
      )}
    </div>
  );
}

function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/overview" element={<Overview />} />
      </Routes>
    </>
  );
}

export default App;
