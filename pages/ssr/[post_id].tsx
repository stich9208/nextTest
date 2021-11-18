import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Post from "../../src/interfaces/Post.interface";

const EachPostSsr = ({ post }: { post: Post }) => {
  return (
    <div>
      <Head>
        <title>post</title>
        <meta name="post/ssr" content="each Post" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "50%",
          }}
        >
          <h2 style={{ textAlign: "center" }}>{post.title}</h2>
          <br />
          <article style={{ width: "70%" }}>
            <p
              style={{
                textAlign: "center",
                fontSize: "17px",
                lineHeight: "25px",
              }}
            >
              {post.body}
            </p>
          </article>
        </section>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query: { post_id },
}): Promise<any> => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${post_id}`
  );
  const post = await res.json();
  return {
    props: {
      post,
    },
  };
};

export default EachPostSsr;
