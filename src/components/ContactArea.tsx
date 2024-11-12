import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaMapMarkerAlt,
} from "react-icons/fa";

const ContactArea = ({ email }) => {
  return (
    <div className="flex flex-col items-center justify-center text-white">
      <div className="flex items-center justify-center flex-col mt-0 text-center font-extrabold bg-dark_green w-full h-96">
        <p className="text-3xl">
          Sinta-se livre para me contatar a qualquer momento!
        </p>
        <h1 className="mt-16 text-5xl">{email || "Email não disponível"}</h1>
      </div>

      <footer className="w-full py-6 border-t border-gray-800 text-center">
        <div className="text-center mx-16 my-8 font-bold text-4xl text-dark_green">
          <p>
            Assim que possível, me envie um email para que possamos trabalhar
            felizes juntos!
          </p>
        </div>
        <div className="flex justify-center gap-6 my-4 text-dark_green">
          <a
            href="https://instagram.com"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="w-6 h-6" />
          </a>
          <a
            href="https://facebook.com"
            aria-label="Facebook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="w-6 h-6" />
          </a>
          <a
            href="https://twitter.com"
            aria-label="Twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="w-6 h-6" />
          </a>
          <a
            href="https://youtube.com"
            aria-label="YouTube"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube className="w-6 h-6" />
          </a>
        </div>

        <div className="text-2xl font-medium mt-10 flex justify-center items-center text-dark_green gap-20">
          <span className="flex justify-center items-center gap-2">
            <FaMapMarkerAlt />
            Brasil
          </span>
          <span>© 2024, All Rights By Compass UOL</span>
        </div>
      </footer>
    </div>
  );
};

export default ContactArea;
