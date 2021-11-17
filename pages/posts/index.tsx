import React from "react";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Post from "../../src/interfaces/Post.interface";

const Posts = ({ posts }) => {
  return (
    <div>
      <Head>
        <title>postList</title>
        <meta name="posts" content="all Posts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <ul>
          {posts.map((post: Post) => (
            <li key={post.id}>
              <Link href={`/posts/${post.id}`}>
                <a>{post.title}</a>
              </Link>
            </li>
          ))}
        </ul>
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
