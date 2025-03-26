import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../firebase";
import Message from "./Message";

const Main = ({ room }) => {
  const [messages, setMessages] = useState([]);
  const lastMessage = useRef();
  // veritabanından bu oda için mesajları al
  useEffect(() => {
    //abone olunacak collectionun referansını al
    const messagesCol = collection(db, "messages");
    //sorgu ayarları
    const q = query(
      messagesCol,
      where("room", "==", room),
      orderBy("createdAt", "asc")
    );

    //kolleksiyondaki anlık güncellemelere abone ol
    const unsub = onSnapshot(q, (data) => {
      //mesajların geçici olarak tutulacağı dizi
      const temp = [];
      //docs dizisindeki her bir dökümanın data() methodu ile datasına erişip geçici diziye aktardık
      data.docs.forEach((doc) => temp.push(doc.data()));
      //state`i güncelle
      setMessages(temp);
    });
    //kullanıcı bu sayfadan ayrılınca kolleksiyonu izlemeyi durdur
    return () => unsub();
  }, []);
  //ilk odaya girildiğinde ve her mesaj atıldığında en aşağıya kaydır
  useEffect(() => {
    lastMessage.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <main>
      {messages.length < 1 ? (
        <div className="warn">
          <p>Sohbete ilk mesajı gönderin</p>
        </div>
      ) : (
        messages.map((i, key) => <Message key={key} data={i} />)
      )}
      <div ref={lastMessage} />
    </main>
  );
};

export default Main;
