import { useEffect, useState } from "react";
import { IoLogInOutline } from "react-icons/io5";
import { Octokit } from "@octokit/rest";
import { useNavigate } from "react-router-dom";

interface GitHubUser {
  avatar_url: string;
  name: string;
}

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [githubUser, setGitHubUser] = useState<GitHubUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let username = localStorage.getItem("github_username");
    const token = import.meta.env.VITE_GITHUB_TOKEN;

    if (username && token) {
      username = username.trim().replace(/\s+/g, "");

      setIsLoggedIn(true);
      const octokit = new Octokit({ auth: token });

      const fetchGitHubUser = async () => {
        if (username) {
          try {
            const { data } = await octokit.users.getByUsername({ username });
            setGitHubUser({
              avatar_url: data.avatar_url,
              name: data.name ?? "Unknown",
            });
          } catch (error) {
            console.error("Erro ao buscar dados do GitHub:", error);
          }
        }
      };

      fetchGitHubUser();
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 w-full flex items-center justify-center bg-dark_green rounded-b-3xl z-10">
      <div className="flex justify-center items-center ml-64 gap-16 mt-9 mb-9">
        <span
          className="font-semibold text-3xl text-secondary_text hover:text-primary_color cursor-pointer"
          onClick={() => scrollToSection("icon")}
        >
          Início
        </span>
        <span
          className="font-semibold text-3xl text-secondary_text hover:text-primary_color cursor-pointer"
          onClick={() => scrollToSection("mystory")}
        >
          Minha História
        </span>
        <span
          className="font-semibold text-3xl text-secondary_text hover:text-primary_color cursor-pointer"
          onClick={() => scrollToSection("experiencesSection")}
        >
          Experiências
        </span>
        <span
          className="font-semibold text-3xl text-secondary_text hover:text-primary_color cursor-pointer"
          onClick={() => scrollToSection("contactArea")}
        >
          Contato
        </span>
      </div>

      <div className="flex ml-24 mr-8 mt-9 mb-9 flex-row justify-center items-center">
        {isLoggedIn && githubUser ? (
          <img
            src={githubUser.avatar_url}
            alt="Avatar do GitHub"
            className="w-12 h-12 rounded-full cursor-pointer"
            title="Perfil"
            onClick={() => {
              window.location.href = "/profile";
            }}
          />
        ) : (
          <span
            className="flex items-center justify-center gap-2 font-semibold text-3xl text-secondary_text hover:text-primary_color cursor-pointer"
            onClick={() => navigate("/")}
          >
            <IoLogInOutline />
            Entrar
          </span>
        )}
      </div>
    </nav>
  );
}
