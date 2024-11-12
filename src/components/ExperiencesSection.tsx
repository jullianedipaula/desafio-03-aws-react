import { useState, useEffect } from "react";
import ExperienceCard from "./ExperienceCard";
import ExperienceModal from "./ExperienceModal";
import { FaTrash } from "react-icons/fa";
import { PiPencilSimpleLineFill } from "react-icons/pi";
import { FiPlusCircle } from "react-icons/fi";

interface Experience {
  title: string;
  duration: string;
  description: string;
  tags: string[];
  repositoryLink?: string;
}

interface ExperiencesSectionProps {
  isEditing: boolean;
  
}

const ExperiencesSection = ({ isEditing }: ExperiencesSectionProps) => {
  const [experiences, setExperiences] = useState<Experience[]>(() => {
    const savedExperiences = localStorage.getItem("experiences");
    return savedExperiences
      ? JSON.parse(savedExperiences)
      : [
          {
            title: "Dev Junior na NASA",
            duration: "Junho - 2002 - 2020",
            description:
              "Trabalhei com figma na nasa construindo designs de foguetes usando figma pro Elon Musk",
            tags: ["Figma", "React", "Typescript"],
            repositoryLink: "#",
          },
          {
            title: "Projeto de caridade na minha cidade",
            duration: "2 semanas",
            description:
              "Trabalhei em um projeto na cidade que envolvia React e Scrum para ajudar idosos na minha cidade e seus problemas de movimentação pela cidade.",
            tags: ["Javascript", "Angular"],
            repositoryLink: "#",
          },
          {
            title: "Projetão Fellas",
            duration: "2 meses",
            description:
              "Um projetão fellas da minha cidade que é muito fellas, um projeto tão fellas que não deixa de ser fellas.",
            tags: ["Figma", "React", "Typescript"],
            repositoryLink: "#",
          },
        ];
  });

  const [showModal, setShowModal] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(
    null
  );

  useEffect(() => {
    localStorage.setItem("experiences", JSON.stringify(experiences));
  }, [experiences]);

  const handleAddNew = () => {
    setEditingExperience(null);
    setShowModal(true);
  };

  const handleEdit = (experience: Experience) => {
    setEditingExperience(experience);
    setShowModal(true);
  };

  const handleSave = (newExperience: Experience) => {
    if (editingExperience) {
      setExperiences(
        experiences.map((exp) =>
          exp === editingExperience ? newExperience : exp
        )
      );
    } else {
      setExperiences([...experiences, newExperience]);
    }
    setShowModal(false);
  };

  const handleDelete = (experience: Experience) => {
    setExperiences(experiences.filter((exp) => exp !== experience));
  };

  return (
    <div className="p-8 bg-teal-800 min-h-screen">
      <h2 className="text-6xl font-extrabold text-center text-secondary_text mb-8">
        Experiências
      </h2>
      <div className="flex flex-wrap justify-center gap-4">
        {experiences.map((experience, index) => (
          <div key={index} className="w-64 h-64">
            {isEditing ? (
              <div
                className="w-60 h-80 rounded-lg flex items-center justify-center flex-col gap-10 shadow-2xl bg-card_color shadow-primary_color border-4 border-dark_green"
                style={{
                  background:
                    "linear-gradient(to bottom, #09404D 50%, #340808 50%)",
                }}
              >
                <button
                  onClick={() => handleEdit(experience)}
                  className="text-primary_color text-2xl"
                >
                  <PiPencilSimpleLineFill size={50} />
                </button>
                <button
                  onClick={() => handleDelete(experience)}
                  className="text-primary_color"
                >
                  <FaTrash size={50} />
                </button>
              </div>
            ) : (
              <ExperienceCard experience={experience} isEditing={false} />
            )}
          </div>
        ))}
        {isEditing && (
          <div
            className="flex items-center justify-center flex-col w-60 h-80 rounded-lg cursor-pointer shadow-2xl bg-card_color shadow-primary_color border-4 border-dark_green"
            onClick={handleAddNew}
          >
            <FiPlusCircle size={50} className="text-secondary_text text-4xl" />
            <p className="text-secondary_text font-extrabold text-2xl">
              Adicionar Card
            </p>
          </div>
        )}
      </div>
      {showModal && (
        <ExperienceModal
          experience={editingExperience}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default ExperiencesSection;
