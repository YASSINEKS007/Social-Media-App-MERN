import { useSelector } from "react-redux";

function MessagesPage() {
  const { _id } = useSelector((state) => state.user);
  return (
    <div>
      <p>{_id}</p>
    </div>
  );
}

export default MessagesPage;
