import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import Post from "../../src/interfaces/Post.interface";

const EachPost = ({ post }: { post: any }) => {
  return (
    <div>
      <Head>
        <title>post</title>
        <meta name="post" content="each Post" />
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
          <h2>{post.title}</h2>
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

export const getStaticPaths: GetStaticPaths = async (): Promise<any> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();
  const paths = posts.map((post: Post) => ({
    params: {
      post_id: JSON.stringify(post.id),
    },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}): Promise<any> => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params?.post_id}`
  );
  const post = await res.json();

  return { props: { post } };
};

export default EachPost;
