import { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";
import RoomPage from "./pages/RoomPage";
import ChatPage from "./pages/ChatPage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const App = () => {
  //kullanıcı yetkiisini kontrol etme state
  const [isAuth, setIsAuth] = useState(false);
  //hangi odayı seçtiğini kontrol etme state
  const [room, setRoom] = useState(null);
  // sayfa yenilendiğinde kullanıcının oturum bilgilerini al
  useEffect(() => {
    //kullanıcının oturum durumu her değiştiğinde güncel bilgileri alıp getirir
    onAuthStateChanged(auth, (user) => {
      setIsAuth(user ? true : false);
    });
  });

  //yetkisi yoksa loginpage ekrana bas
  if (!isAuth) return <LoginPage />;

  //yetkisi varsa roompage ekrana bas
  return (
    <div className="container">
      {room ? (
        <ChatPage room={room} setRoom={setRoom} />
      ) : (
        <RoomPage setRoom={setRoom} />
      )}
    </div>
  );
};

export default App;
