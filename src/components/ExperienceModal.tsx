import { useState } from "react";

interface ExperienceModalProps {
  experience?: Experience;
  onSave: (experience: Experience) => void;
  onClose: () => void;
}

const ExperienceModal = ({
  experience,
  onSave,
  onClose,
}: ExperienceModalProps) => {
  const [title, setTitle] = useState(experience?.title || "");
  const [duration, setDuration] = useState(experience?.duration || "");
  const [description, setDescription] = useState(experience?.description || "");
  const [tags, setTags] = useState(experience?.tags.join(", ") || "");
  const [repositoryLink, setRepositoryLink] = useState(
    experience?.repositoryLink || ""
  );

  const handleSave = () => {
    const newExperience = {
      title,
      duration,
      description,
      tags: tags.split(",").map((tag) => tag.trim()),
      repositoryLink,
    };
    onSave(newExperience);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">
          {experience ? "Editar" : "Criar"} card
        </h2>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Período de atuação"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Habilidades (Separe-as por vírgula)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <textarea
          placeholder="Descreva a sua experiência"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        ></textarea>
        <input
          type="text"
          placeholder="Link do repositório (Opcional)"
          value={repositoryLink}
          onChange={(e) => setRepositoryLink(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-500 mr-4">
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceModal;
