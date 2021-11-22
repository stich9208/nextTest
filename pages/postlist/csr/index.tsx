import React, { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Post from "../../../src/interfaces/Post.interface";
import { POST_URL } from "../../../config/util";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(POST_URL)
      .then((res) => res.json())
      .then((res) => setPosts(res));
  }, []);

  return (
    <div style={{ paddingTop: "20px", backgroundColor: "lightyellow" }}>
      <Head>
        <title>postList</title>
        <meta name="posts/csr" content="all Posts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "50px",
          color: "indigo",
        }}
      >
        <span
          style={{
            marginLeft: "20px",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          Client Side Rendering
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
              className="csr"
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
          <Link href="/postlist/ssr" passHref>
            <button
              className="csr"
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

          <Link href="/" passHref>
            <button
              className="csr"
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
        <ol style={{ color: "indigo" }}>
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
              <Link href={`/postlist/csr/${post.id}`}>
                <a style={{ borderBottom: "1px solid indigo" }}>{post.title}</a>
              </Link>
            </li>
          ))}
        </ol>
      </main>
    </div>
  );
};

export default Posts;
