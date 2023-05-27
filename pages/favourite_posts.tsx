import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import postStyles from "../styles/posts.module.scss";
import NavBar from "../comps/navbar";
import { Post } from ".";
import PostCard from "@comps/post";

const FavouritePosts = () => {
  const [favPosts, setFavPosts] = useState<Post[]>([]);
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

  return (
    <>
      <Head>
        <title>Liked Posts</title>
        <meta name="keywords" content="home" />
      </Head>

      <div className={postStyles.main}>
        <NavBar />
        <div className={postStyles.posts}>
          {favPosts.map((post) => (
            <PostCard post={post} key={post.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default FavouritePosts;
