import React, { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import AuthButton from "../components/AuthButton";
import { useNavigate } from "react-router-dom";

interface User {
  username: string;
  name: string;
}

const SearchUser: React.FC = () => {
  const [query, setQuery] = useState(
    localStorage.getItem("github_username") || ""
  );
  const [suggestions, setSuggestions] = useState<User[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length > 0) {
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const filteredUsers = storedUsers.filter((user: User) =>
        user.name.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredUsers);
      setError("");
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSearch = () => {
    if (suggestions.length === 0) {
      setError("O nome que você digitou não existe ou não está cadastrado!");
    } else {
      setError("");
      navigate(`/profile/${suggestions[0].username}?loggedIn=false`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <main className="flex flex-col items-center w-full max-w-lg p-6">
        <h1 className="text-4xl text-primary_text font-extrabold mb-4 text-center">
          Digite o nome do usuário que deseja buscar
        </h1>
        <div className="flex flex-col items-center w-full">
          <div className="flex items-center mt-4 gap-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Digite o nome do usuário"
              className="border border-primary_text rounded-2xl px-4 py-3 text-gray-700 focus:outline-none w-[687px] h-[56px]"
            />
            <button
              onClick={handleSearch}
              disabled={!query}
              className="bg-gray-300 w-[86px] h-[56px] flex items-center justify-center rounded-2xl hover:bg-secondary_color transition duration-150"
            >
              <FaArrowRight size={24} className="text-secondary_text" />
            </button>
          </div>
          {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
          {suggestions.length > 0 && (
            <ul className="absolute bg-white shadow-lg w-full mt-2 rounded-lg overflow-hidden">
              {suggestions.map((user) => (
                <li
                  key={user.username}
                  className="p-2 hover:bg-gray-100 border-b border-gray-200"
                  onClick={() =>
                    navigate(`/profile/${user.username}?loggedIn=false`)
                  }
                >
                  {user.name} ({user.username})
                </li>
              ))}
            </ul>
          )}
        </div>
        <span className="font-bold text-primary_text my-6 text-2xl ">ou</span>

        <AuthButton />
      </main>
    </div>
  );
};

export default SearchUser;
