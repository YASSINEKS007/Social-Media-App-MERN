import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  SendOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FlexBetween from "../components/FlexBetween";
import Friend from "../components/Friend";
import WidgetWrapper from "../components/WidgetWrapper";
import { setPost } from "../state/main";

const PostWidget = ({
  postId,
  postUserId,
  name,
  location,
  description,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [allComments, setAllComments] = useState(comments);
  const token = useSelector((state) => state.token);

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const [likeCount, setLikeCount] = useState(0);
  const loggedInUserId = useSelector((state) => state.user._id);
  const dispatch = useDispatch();

  const [newComment, setNewComment] = useState("");
  const backendHost = import.meta.env.VITE_BACKEND_HOST;

  const post = useSelector((state) =>
    state.posts.find((post) => post._id === postId)
  );

  const postComment = async () => {
    try {
      const response = await fetch(`${backendHost}/posts/${postId}/comment`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId, comment: newComment }),
      });
      const updatedPost = await response.json();
      setAllComments(updatedPost.comments);
      setNewComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const isLiked = post && post.likes && post.likes[loggedInUserId];

  useEffect(() => {
    setLikeCount(post ? Object.keys(post.likes).length : 0);
  }, [post]);

  const patchLike = async () => {
    const response = await fetch(`${backendHost}/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography
        color={main}
        sx={{ mt: "1rem" }}
      >
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`${backendHost}/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          <TextField
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            label="Add a comment"
            variant="outlined"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={postComment}>
                    <SendOutlined />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {allComments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
