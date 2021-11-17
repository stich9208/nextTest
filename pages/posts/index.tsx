import React from "react";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Post from "../../src/interfaces/Post.interface";

const Posts = ({ posts }: { posts: any }) => {
  return (
    <div>
      <Head>
        <title>postList</title>
        <meta name="posts" content="all Posts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
  const posts = await res.json();
  return {
    props: {
      posts,
    },
  };
};

export default Posts;
