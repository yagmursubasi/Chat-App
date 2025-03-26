import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const RoomPage = ({ setRoom }) => {
  // form submit edildiğinde çalışacak fonksiyon
  const handleSubmit = (e) => {
    e.preventDefault();
    // formdan gelen değeri al
    const room = e.target[0].value.toLowerCase();
    // formdan gelen değeri room state'ine ata
    setRoom(room);
  };
  return (
    <form onSubmit={handleSubmit} className="room-page">
      <h1>Chat Room</h1>
      <p>Hangi odaya gireceksiniz?</p>
      <input type="text" placeholder="örn:haftasonu" required />
      <button>Odaya Git</button>
      <button onClick={() => signOut(auth)}>Çıkış Yap</button>
    </form>
  );
};

export default RoomPage;
