import { useEffect, useState } from "react";
import PostWidget from "./PostWidget";
import { useSelector } from "react-redux";

function AllPostsWidget() {
  const backendHost = import.meta.env.VITE_BACKEND_HOST;
  const [posts, setPosts] = useState([]);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${backendHost}/posts`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPosts(data);
        console.log(data);
      } catch (err) {
        console.log("error fetching posts", err);
      }
    };

    fetchPosts();
  }, [backendHost]);

  return (
    <div>
      {posts.map((post) => (
        <PostWidget
          key={post._id}
          postId={post._id}
          postUserId={post.userId}
          name={post.firstName + post.lastName}
          location={post.location}
          description={post.description}
          picturePath={post.picturePath}
          userPicturePath={post.userPicturePath}
          likes={Object.values(post.likes)}  
          comments={post.comments}
        />
      ))}
    </div>
  );
}

export default AllPostsWidget;
