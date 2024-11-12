import React from "react";
import { Route, Routes } from "react-router-dom";
import SearchPage from "./pages/SearchPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";

const App: React.FC = () => {
  return (
      <Routes>
        <Route path="/" element={<SearchPage />} />

        <Route path="/profile" element={<ProfilePage/>} /> 
      </Routes>
  );
};

export default App;
