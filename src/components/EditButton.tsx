import { MdEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

interface EditButtonProps {
  onEdit: () => void;
  isEditing: boolean;
}

export function EditButton({ onEdit, isEditing }: EditButtonProps) {
  return (
    <span className="absolute top-32 right-0 m-4">
      <button
        className="rounded-full bg-card_color w-20 h-20 flex items-center justify-center"
        onClick={onEdit}
      >
        {isEditing ? <FaCheck className="text-secondary_text w-12 h-12" /> : <MdEdit className="text-secondary_text w-12 h-12" />}
      </button>
    </span>
  );
}
