import Head from "next/head";
import fsPromises from "fs/promises";
import path from "path";
import postStyles from "../styles/posts.module.scss";
import { useState, useEffect, useRef } from "react";
import NavBar from "../comps/navbar";
import PostCard from "@comps/post";

export interface Post {
  id: number;
  username: string;
  displayPicture: string;
  title: string;
  postImage: string;
  noOfLikes: 40;
  description: string;
  tags: string;
  noOfComments: number;
}

export const getStaticProps = async () => {
  const filePath = path.join(process.cwd(), "json/data.json");
  const jsonData = (await fsPromises.readFile(filePath)).toString();
  const data: Post[] = JSON.parse(jsonData);

  return { props: { posts: data } };
};

export default function Home({ posts }: { posts: Post[] }) {
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
  }, [favPosts]);

  const handleSave = (post: Post) => {
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
    <>
      <Head>
        <title>Home</title>
        <meta name="keywords" content="home" />
      </Head>

      <div className={postStyles.main}>
        <NavBar />
        <div className={postStyles.posts}>
          {posts.map((post) => (
            <PostCard post={post} key={post.id} />
          ))}
        </div>
      </div>
    </>
  );
}
