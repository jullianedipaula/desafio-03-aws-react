import { useState, useEffect } from "react";
import LinkedinModal from "./LinkedinModal";

interface AboutIconProps {
  githubUser: GitHubUser | null;
  customText: string;
  setCustomText: (text: string) => void;
  isEditing: boolean;
}

const AboutIcon = ({
  githubUser,
  customText,
  setCustomText,
  isEditing,
}: AboutIconProps) => {
  const [linkedinLink, setLinkedinLink] = useState<string | null>(
    localStorage.getItem("linkedinLink") || null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (linkedinLink) {
      localStorage.setItem("linkedinLink", linkedinLink);
    } else {
      localStorage.removeItem("linkedinLink");
    }
  }, [linkedinLink]);

  const handleAddLinkedinLink = () => {
    setIsModalOpen(true);
  };

  const handleSaveLinkedinLink = (link: string) => {
    setLinkedinLink(link);
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-start p-6 w-[500px]">
      <h2 className="text-6xl font-extrabold mb-2">
        Hello,
        <br />
        I’m{" "}
        <span
          className="text-green-500"
          contentEditable={isEditing}
          suppressContentEditableWarning={true}
          onBlur={(e) => setCustomText(e.currentTarget.textContent || "Fulano")}
        >
          {customText}
        </span>
      </h2>
      <div className="text-primary_text text-2xl font-semibold mt-8 mb-8">
        <p>
          {githubUser?.bio ||
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem commodi velit placeat minima doloribus quam temporibus quo ipsam quas quod atque nostrum, nobis obcaecati delectus culpa labore provident est perferendis!"}
        </p>
      </div>
      <div className="flex space-x-4">
        <a
          href={githubUser ? githubUser.html_url : "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-dark_green shadow-primary_color text-secondary_text font-bold text-3xl rounded-2xl shadow-md hover:bg-primary_color"
        >
          GitHub
        </a>
        {linkedinLink ? (
          <a
            href={linkedinLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-dark_green shadow-primary_color text-secondary_text font-bold text-3xl rounded-2xl shadow-md hover:bg-primary_color"
          >
            LinkedIn
          </a>
        ) : (
          isEditing && (
            <button
              onClick={handleAddLinkedinLink}
              className="px-4 py-2 bg-dark_green shadow-primary_color text-secondary_text font-bold text-3xl rounded-2xl shadow-md hover:bg-primary_color"
            >
              LinkedIn
            </button>
          )
        )}
      </div>
      {isModalOpen && (
        <LinkedinModal
          onSave={handleSaveLinkedinLink}
          onClose={handleCloseModal}
          initialLink={linkedinLink}
        />
      )}
    </div>
  );
};

export default AboutIcon;
