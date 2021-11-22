import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Post from "../../../src/interfaces/Post.interface";
import { POST_URL } from "../../../config/util";

const EachPostSsr = ({ post }: { post: Post }) => {
  const router = useRouter();
  return (
    <div style={{ height: "100vh" }}>
      <Head>
        <title>post</title>
        <meta name="post/ssr" content="each Post" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          height: "100%",
          padding: "50px",
          backgroundColor: "black",
        }}
      >
        <main>
          <section
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              color: "white",
            }}
          >
            <h2 style={{ textAlign: "center" }}>{post.title}</h2>
            <br />
            <article style={{ width: "50%" }}>
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
        <footer style={{ marginBottom: "50px" }}>
          <button
            className="ssr"
            style={{
              width: "150px",
              height: "30px",
              fontWeight: "bold",
              borderRadius: "40px",
            }}
            onClick={() => router.back()}
          >
            GO BACK TO LIST
          </button>
        </footer>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query: { post_id },
}): Promise<any> => {
  const res = await fetch(`${POST_URL}/${post_id}`);
  const post = await res.json();
  return {
    props: {
      post,
    },
  };
};

export default EachPostSsr;
