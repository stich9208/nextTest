import React, { useEffect } from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Post from "../../../src/interfaces/Post.interface";

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
          marginBottom: "50px",
        }}
      >
        <span
          style={{
            marginLeft: "20px",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          Static Generation
        </span>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "fixed",
            right: 0,
            paddingRight: "20px",
            width: "800px",
          }}
        >
          <Link href="/postlist/ssr" passHref>
            <button
              className="ssg"
              style={{
                marginRight: "20%",
                width: "100px",
                height: "40px",
                fontWeight: "bold",
                borderRadius: "20px",
                cursor: "pointer",
              }}
            >
              GO TO SSR
            </button>
          </Link>
          <Link href="/postlist/csr" passHref>
            <button
              className="ssg"
              style={{
                marginRight: "20%",
                width: "100px",
                height: "40px",
                fontWeight: "bold",
                borderRadius: "20px",
                cursor: "pointer",
              }}
            >
              GO TO CSR
            </button>
          </Link>
          <Link href="/" passHref>
            <button
              className="ssg"
              style={{
                width: "100px",
                height: "40px",
                fontWeight: "bold",
                borderRadius: "20px",
                cursor: "pointer",
              }}
            >
              HOME
            </button>
          </Link>
        </div>
      </header>
      <main>
        <ol>
          {posts.map((post: Post) => (
            <li
              key={post.id}
              style={{
                marginTop: "20px",
                marginLeft: "20px",
                padding: "10px",
                fontSize: "25px",
              }}
            >
              <Link href={`/postlist/ssg/${post.id}`}>
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
