import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import Link from "next/link";
import Post from "../../../src/interfaces/Post.interface";
import { POST_URL } from "../../../config/util";

const EachPostSsg = ({ post }: { post: any }) => {
  return (
    <div style={{ height: "100vh" }}>
      <Head>
        <title>post</title>
        <meta name="post" content="each Post" />
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
        }}
      >
        <main>
          <section
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
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
          <Link href="/postlist/ssg" passHref>
            <button
              className="ssg"
              style={{
                width: "150px",
                height: "30px",
                fontWeight: "bold",
                borderRadius: "40px",
              }}
            >
              GO BACK TO LIST
            </button>
          </Link>
        </footer>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async (): Promise<any> => {
  const res = await fetch(POST_URL);
  const posts = await res.json();
  const paths = posts.map((post: Post) => ({
    params: {
      post_id: JSON.stringify(post.id),
    },
  }));
  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}): Promise<any> => {
  const res = await fetch(`${POST_URL}/${params?.post_id}`);
  const post = await res.json();

  return { props: { post } };
};

export default EachPostSsg;
