import { auth } from "../firebase";

const Message = ({ data }) => {
  //eğer mesajı oturumu açık olan kullanıcı açtıysa :sağ
  if (auth.currentUser.uid === data.author.id) {
    return <div className="msg-user">{data.text}</div>;
  }
  //eğer mesajı farklı bir kullanıcı attıysa :sol
  return (
    <div className="msg-other">
      <div>
        <img src={data.author.photo} />
        <span>{data.author.name} </span>
      </div>
      <p className="msg-text">{data.text} </p>
    </div>
  );
};

export default Message;
