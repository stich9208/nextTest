import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Post from "../../src/interfaces/Post.interface";

const Ssr = ({ posts }: { posts: any }) => {
  return (
    <div>
      <Head>
        <title>postList</title>
        <meta name="posts/ssr" content="all Posts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "20px",
          backgroundColor: "black",
          color: "white",
        }}
      >
        <span style={{ marginLeft: "100px" }}>Server Side Rendering</span>
        <Link href="/posts" passHref>
          <button
            style={{ marginRight: "20%", width: "100px", height: "50px" }}
          >
            Go to SSG
          </button>
        </Link>
      </header>
      <main style={{ backgroundColor: "black" }}>
        <ol style={{ color: "white" }}>
          {posts.map((post: Post) => (
            <li
              key={post.id}
              style={{
                marginLeft: "20px",
                marginBottom: "20px",
                padding: "10px",
                fontSize: "25px",
              }}
            >
              <Link href={`/posts/${post.id}`}>
                <a style={{ color: "white", borderBottom: "1px solid white" }}>
                  {post.title}
                </a>
              </Link>
            </li>
          ))}
        </ol>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps =
  async (): Promise<any> => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    // const res = await fetch("http://localhost:3000/data/data.json");
    const posts = await res.json();

    if (!posts)
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    return {
      props: {
        posts,
      },
    };
  };

export default Ssr;
