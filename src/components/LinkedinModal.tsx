import { useState } from "react";

interface LinkedinModalProps {
  onSave: (link: string) => void;
  onClose: () => void;
  initialLink: string | null;
}

const LinkedinModal = ({ onSave, onClose, initialLink }: LinkedinModalProps) => {
  const [link, setLink] = useState(initialLink || "");

  const handleSave = () => {
    onSave(link);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Adicionar LinkedIn</h2>
        <input
          type="text"
          placeholder="Insira o link do LinkedIn"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-500 mr-4">Cancelar</button>
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">Salvar</button>
        </div>
      </div>
    </div>
  );
};

export default LinkedinModal;
