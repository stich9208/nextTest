import React, { useEffect } from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Post from "../../src/interfaces/Post.interface";

const Posts = ({ posts }: { posts: any }) => {
  return (
    <div style={{ paddingTop: "20px" }}>
      <Head>
        <title>postList</title>
        <meta name="posts/ssg" content="all Posts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            marginLeft: "100px",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          Static Generation
        </span>
        <Link href="/ssr" passHref>
          <button
            style={{
              marginRight: "20%",
              width: "100px",
              height: "40px",
              cursor: "pointer",
            }}
          >
            Go to SSR
          </button>
        </Link>
      </header>
      <main>
        <ol>
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
                <a style={{ borderBottom: "1px solid black" }}>{post.title}</a>
              </Link>
            </li>
          ))}
        </ol>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (): Promise<any> => {
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

export default Posts;
