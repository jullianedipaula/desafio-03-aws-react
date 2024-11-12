import { FaTrash } from "react-icons/fa";
import { PiPencilSimpleLineFill } from "react-icons/pi";

interface Experience {
  title: string;
  duration: string;
  description: string;
  tags: string[];
  repositoryLink: string;
}

interface ExperienceCardProps {
  experience: Experience;
  onEdit?: () => void;
  onDelete?: () => void;
  isEditing: boolean;
}

const ExperienceCard = ({ experience, onEdit, onDelete, isEditing }: ExperienceCardProps) => {
  return (
    <div className="relative mt-16 w[409px] h[503px] bg-card_color p-4 rounded-2xl shadow-2xl shadow-primary_color border-4 border-dark_green">
      {isEditing && (
        <div className="absolute top-2 right-2 flex space-x-2">
          <button onClick={onEdit} className="text-blue-500">
            <PiPencilSimpleLineFill />
          </button>
          <button onClick={onDelete} className="text-red-500">
            <FaTrash />
          </button>
        </div>
      )}
      <h3 className="text-2xl text-secondary_text font-extrabold">{experience.title}</h3>
      <p className="text-lg text-tertiary_text font-semibold">{experience.duration}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {experience.tags.map((tag, index) => (
          <span key={index} className="bg-dark_green text-secondary_text px-2 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-2 text-secondary_text h-32 font-semibold text-2xl overflow-y-auto">
        <p>{experience.description}</p>
      </div>
      {experience.repositoryLink && (
        <a
          href={experience.repositoryLink}
          className=" flex items-center justify-center mt-4 bg-dark_green rounded-lg w-full h-14 font-bold text-2xl text-secondary_text hover:bg-primary_color"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver repositório
        </a>
      )}
    </div>
  );
};

export default ExperienceCard;
