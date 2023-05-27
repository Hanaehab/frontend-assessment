import { Post } from "@pages/index";
import postStyles from "../styles/posts.module.scss";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

const PostCard = ({ post }: { post: Post }) => {
  const [favPosts, setFavPosts] = useState<Post[]>([]);
  const likedPost = useMemo(
    () => !!favPosts.find((fav) => fav.id === post.id),
    [favPosts, post.id]
  );
  const initialRender = useRef(true);
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      let favourites = JSON.parse(localStorage.getItem("favourites") ?? "");
      setFavPosts(favourites);
    }
  }, []);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    localStorage.setItem("favourites", JSON.stringify(favPosts));
    console.log(favPosts);
  }, [favPosts]);

  const handleSave = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      let temp: Post[] = JSON.parse(localStorage.getItem("favourites") ?? "");
      if (temp.filter((e) => e.id === post.id).length > 0) {
        const filteredPosts = temp.filter((item) => item.id !== post.id);
        localStorage.setItem("favourites", JSON.stringify(filteredPosts));
      } else {
        temp.push(post);
        localStorage.setItem("favourites", JSON.stringify(temp));
      }
      let favourites = JSON.parse(localStorage.getItem("favourites") ?? "");
      setFavPosts(favourites);
    }
  };

  return (
    <div id={post.id + ""} className={postStyles.post}>
      <div id="user" className={postStyles.user}>
        <Image
          width={48}
          height={48}
          src={post.displayPicture}
          alt={post.username}
        />
        <p>{post.username}</p>
      </div>
      <div id="postPicture" className={postStyles.picture}>
        <Image
          className={postStyles.postImage}
          onDoubleClick={handleSave}
          width={500}
          height={500}
          src={post.postImage}
          alt={"post"}
        />
      </div>
      <div
        id="likes"
        className={postStyles.likes}
        onClick={handleSave}
        style={{ cursor: "pointer" }}
      >
        <Image
          width={24}
          height={24}
          style={{ cursor: "pointer" }}
          priority
          src={likedPost ? "/heart-filled.svg" : "/heart-empty.svg"}
          alt="Likes"
        />
        <p>
          {likedPost
            ? `You and ${post.noOfLikes} others liked this`
            : `${post.noOfLikes} likes`}
        </p>
      </div>
      <div id="caption" className={postStyles.caption}>
        <p className={postStyles.captionText}>
          <span className={postStyles.captionUser}>{post.username}</span>{" "}
          {post.title}
        </p>
      </div>
      <div id="tags" className={postStyles.tags}>
        <p className={postStyles.hashtags}>{post.tags}</p>
      </div>
      {post.noOfComments && (
        <p className={postStyles.comments}>
          View all {post.noOfComments} comments
        </p>
      )}
    </div>
  );
};

export default PostCard;
