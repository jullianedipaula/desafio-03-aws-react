interface MyStoryProps {
  storyText: string;
  setStoryText: (text: string) => void;
  isEditing: boolean;
}

const MyStory = ({ storyText, setStoryText, isEditing }: MyStoryProps) => {
  return (
    <div className="p-6 bg-card_color text-white rounded-lg shadow-lg mx-16 w[1240px] h[504px]">
      <h2 className="text-4xl font-extrabold mb-4">Minha história</h2>
      <p
        className="text-white font-bold text-2xl leading-6 mt-16"
        contentEditable={isEditing}
        suppressContentEditableWarning={true}
        onBlur={(e) => setStoryText(e.currentTarget.textContent || storyText)}
      >
        {storyText}
      </p>
    </div>
  );
};

export default MyStory;
