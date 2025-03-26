import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

const LoginPage = () => {
  const handleClick = () => {
    signInWithPopup(auth, provider).catch((err) => console.log(err));
  };
  return (
    <div className="container">
      <div className="login">
        <h1>Chat Room</h1>
        <p> Devam Etmek İçin Giriş Yapın</p>
        <button onClick={handleClick}>
          <img src="./google.png" alt="google logo" width={30} />
          <span>Google ile Giriş Yap</span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
