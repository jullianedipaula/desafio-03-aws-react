import React, { useEffect } from "react";
import {
  signInWithPopup,
  getRedirectResult,
  UserCredential,
  OAuthCredential,
} from "firebase/auth";
import { auth, githubProvider } from "../firebaseConfig";
import { TbBrandGithubFilled } from "react-icons/tb";

const AuthButton: React.FC = () => {
  const handleLogin = async () => {
    try {
      localStorage.setItem("auth_state", "githubLogin");

      const result: UserCredential = await signInWithPopup(
        auth,
        githubProvider
      );

      if (result.user) {
        const username = result.user.displayName || "undefined";
        localStorage.setItem("github_username", username);

        if ("credential" in result && result.credential) {
          const credential = result.credential as OAuthCredential;
          const accessToken = credential.accessToken;

          if (accessToken) {
            localStorage.setItem("github_token", accessToken);
            localStorage.setItem("user_data", JSON.stringify(result.user));
          }
        }

        window.location.href = "/profile";
      }
    } catch (error) {
      console.error("Erro ao autenticar com o GitHub:", error);
      alert("Falha na autenticação. Tente novamente.");
    }
  };

  useEffect(() => {
    const authState = localStorage.getItem("auth_state");
    if (authState === "githubLogin") {
      localStorage.removeItem("auth_state");

      getRedirectResult(auth)
        .then((result) => {
          if (result && result.user) {
            const username = result.user.displayName || "undefined";
            localStorage.setItem("github_username", username);

            if ("credential" in result && result.credential) {
              const credential = result.credential as OAuthCredential;
              const accessToken = credential.accessToken;

              if (accessToken) {
                localStorage.setItem("github_token", accessToken);
                localStorage.setItem("user_data", JSON.stringify(result.user));
              }
            }

            window.location.href = "/profile";
          }
        })
        .catch((error) => {
          console.error(
            "Erro ao obter o resultado do redirecionamento:",
            error
          );
        });
    }
  }, []);

  return (
    <span className="flex items-center justify-center gap-4">
      <p className="text-primary_text text-2xl font-extrabold">
        Acesse sua conta com
      </p>
      <button
        onClick={handleLogin}
        className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition duration-150"
      >
        <TbBrandGithubFilled className="mr-2" />
        GitHub
      </button>
    </span>
  );
};

export default AuthButton;
