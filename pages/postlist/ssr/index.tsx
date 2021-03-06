import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Post from "../../../src/interfaces/Post.interface";

const Ssr = ({ posts }: { posts: Post[] }) => {
  return (
    <div style={{ paddingTop: "20px", backgroundColor: "black" }}>
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
          marginBottom: "50px",
          color: "white",
        }}
      >
        <span
          style={{
            marginLeft: "20px",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          Server Side Rendering
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
          <Link href="/postlist/ssg" passHref>
            <button
              className="ssr"
              style={{
                marginRight: "20%",
                width: "100px",
                height: "40px",
                fontWeight: "bold",
                borderRadius: "20px",
                cursor: "pointer",
              }}
            >
              GO TO SSG
            </button>
          </Link>
          <Link href="/postlist/csr" passHref>
            <button
              className="ssr"
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
              className="ssr"
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
        <ol style={{ color: "white" }}>
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
              <Link href={`/postlist/ssr/${post.id}`}>
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
