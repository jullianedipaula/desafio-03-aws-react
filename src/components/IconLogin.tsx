import React from "react";

interface GitHubUser {
  avatar_url: string;
  name: string;
  location: string;
  email: string | null;
}

interface IconLoginProps {
  githubUser: GitHubUser | null;
}

const IconLogin: React.FC<IconLoginProps> = ({ githubUser }) => {
  return (
    <div className="flex flex-col items-center justify-center w-80 h-96 p-4">
      {githubUser ? (
        <>
          <img src={githubUser.avatar_url} alt="GitHub Avatar" className="w-64 h-64 rounded-full shadow-md" />
          <h1 className="text-5xl text-primary_text font-extrabold mt-6">{githubUser.name}</h1>
          <p className="text-primary_text text-2xl">{githubUser.location}</p>
          <p className="text-primary_text text-2xl mt-2">{githubUser.email || "Email não disponível"}</p>
        </>
      ) : (
        <>
          <div className="w-64 h-60 bg-green-500 rounded-full shadow-md "></div>
          <h1 className="text-5xl text-primary_text font-extrabold mt-6">Seu Nome</h1>
          <p className="text-primary_text text-2xl">Sua Cidade, Estado</p>
          <p className="text-primary_text text-2xl mt-2">seuemail@dominio.com</p>
        </>
      )}
    </div>
  );
};

export default IconLogin;
