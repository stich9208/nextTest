import React from "react";
import { GetStaticProps } from "next";
import Head from "next/head";

const EachPost = ({ post }) => {
  return (
    <div>
      <Head>
        <title>post</title>
        <meta name="post" content="each Post" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <title>
          <h1>{post.title}</h1>
        </title>
        <br />
        <section>
          <p>{post.body}</p>
        </section>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params,
}): Promise<any> => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );
  const post = await res.json();

  return { props: { post } };
};

export default EachPost;
