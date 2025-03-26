import { useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import EmojiPicker from "emoji-picker-react";
import Main from "../components/Main";

const ChatPage = ({ room, setRoom }) => {
  const [text, setText] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // form submit edildiğinde çalışacak fonksiyon
  const handleSubmit = async (e) => {
    e.preventDefault();

    //mesaj boş mu kontrol et
    if (text.trim() === "") return;

    //inputu temizle ve emoji picker ı kapat
    setText("");
    setIsOpen(false);

    //mesajların gönderileceği kolleksiyonun referansını al
    const messagesCol = collection(db, "messages");

    //referansı alanınan kolleksiyona belge oluştur
    await addDoc(messagesCol, {
      text: text,
      room: room,
      author: {
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        photo: auth.currentUser.photoURL,
      },
      createdAt: serverTimestamp(),
    });
  };
  return (
    <div className="chat-page">
      <header>
        <p>{auth.currentUser.displayName} </p>
        <p>{room} </p>
        <button onClick={() => setRoom(null)}>Farklı Oda</button>
      </header>
      <Main room={room} />
      <form onSubmit={handleSubmit} className="chat-form">
        <input
          type="text"
          placeholder="Mesajınızı yazın"
          required
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <div>
          <EmojiPicker
            onEmojiClick={(e) => {
              setText(text + e.emoji);
            }}
            open={isOpen}
          />
          <button
            type="button"
            className="emoji-btn"
            onClick={() => setIsOpen(!isOpen)}
          >
            😀
          </button>
        </div>
        <button type="submit">Gönder</button>
      </form>
    </div>
  );
};

export default ChatPage;
