import postStyles from "../styles/posts.module.scss";
import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className={postStyles.navbar}>
      <ul>
        <li id="home">
          <Link href={"/"}>
            <Image
              width={24}
              height={24}
              priority
              src="/home-icon.svg"
              alt="Home"
            />
            <p>Home</p>
          </Link>
        </li>
        <li id="favs">
          <Link href={"/favourite_posts"}>
            <Image
              width={24}
              height={24}
              priority
              src="/heart.svg"
              alt="Likes"
            />
            <p>Likes</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
