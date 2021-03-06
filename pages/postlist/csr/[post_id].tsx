import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Post from "../../../src/interfaces/Post.interface";
import { POST_URL } from "../../../config/util";

const EachPostCsr = () => {
  const router = useRouter();
  const [post, setPost] = useState<Post>();

  const {
    query: { post_id },
  } = router;

  useEffect(() => {
    fetch(`${POST_URL}/${post_id}`)
      .then((res) => res.json())
      .then((res) => setPost(res))
      .catch((err) => console.log(err));
  }, []);

  return post ? (
    <div style={{ height: "100vh", backgroundColor: "lightyellow" }}>
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
            <h2 style={{ textAlign: "center", color: "indigo" }}>
              {post.title}
            </h2>
            <br />
            <article style={{ width: "50%" }}>
              <p
                style={{
                  textAlign: "center",
                  fontSize: "17px",
                  lineHeight: "25px",
                  color: "indigo",
                }}
              >
                {post.body}
              </p>
            </article>
          </section>
        </main>
        <footer style={{ marginBottom: "50px" }}>
          <button
            className="csr"
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
  ) : (
    <div>Loading...</div>
  );
};

export default EachPostCsr;
