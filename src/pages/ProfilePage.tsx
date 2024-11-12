import { useEffect, useState } from "react";
import { Octokit } from "@octokit/rest";
import AboutIcon from "../components/AboutIcon";
import ContactArea from "../components/ContactArea";
import ExperiencesSection from "../components/ExperiencesSection";
import Header from "../components/Header";
import IconLogin from "../components/IconLogin";
import MyStory from "../components/MyStory";
import { EditButton } from "../components/EditButton";

interface GitHubUser {
  avatar_url: string;
  name: string;
  location: string;
  email: string | null;
  bio: string | null;
  html_url: string;
}

export default function ProfilePage() {
  const [githubUser, setGitHubUser] = useState<GitHubUser | null>(null);
  const [customText, setCustomText] = useState<string>(
    localStorage.getItem("customText") || "Fulano"
  );
  const [storyText, setStoryText] = useState<string>(
    localStorage.getItem("storyText") ||
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat molestias officiis eos quis omnis totam, expedita fuga reprehenderit sint explicabo est amet hic aperiam possimus error corrupti inventore nihil! Autem."
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const fetchGitHubData = async () => {
      const username = localStorage.getItem("github_username");
      const token = import.meta.env.VITE_GITHUB_TOKEN;

      if (username && token) {
        const octokit = new Octokit({ auth: token });
        try {
          const sanitizedUsername = username.replace(/\s/g, "");
          const { data } = await octokit.users.getByUsername({
            username: sanitizedUsername,
          });
          setGitHubUser({
            avatar_url: data.avatar_url,
            name: data.name,
            location: data.location,
            email: data.email,
            bio: data.bio,
            html_url: data.html_url,
          });
        } catch (error) {
          console.error("Erro ao buscar dados do GitHub:", error);
        }
      }
    };
    fetchGitHubData();
  }, []);

  const saveToLocalStorage = (key: string, value: string) => {
    localStorage.setItem(key, value);
  };

  const handleCustomTextChange = (newText: string) => {
    setCustomText(newText);
    saveToLocalStorage("customText", newText);
  };

  const handleStoryTextChange = (newText: string) => {
    setStoryText(newText);
    saveToLocalStorage("storyText", newText);
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <>
      <div className="mb-6">
        <Header />
      </div>
      <div className="mt-60">
        <EditButton onEdit={toggleEditing} isEditing={isEditing} />
      </div>
      <div
        className="flex justify-center items-center flex-row w[1240px] h[400px] mt-64 ml-8 mr-8 gap-[420px]"
        id="icon"
      >
        <IconLogin githubUser={githubUser} />
        <AboutIcon
          githubUser={githubUser}
          customText={customText}
          setCustomText={handleCustomTextChange}
          isEditing={isEditing}
        />
      </div>
      <div className="mt-32" id="mystory">
        <MyStory
          storyText={storyText}
          setStoryText={handleStoryTextChange}
          isEditing={isEditing}
        />
      </div>
      <div className="mt-32" id="experiencesSection">
        <ExperiencesSection isEditing={isEditing} />
      </div>
      <div id="contactArea">
        <ContactArea email={undefined} />
      </div>
    </>
  );
}
