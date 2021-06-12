import {Fragment} from "react";
import Head from "next/head";

import AllPosts from "../../components/posts/all-posts";
import {getAllPosts} from "../../utility/posts-util";

export default function AllPostPage(props) {
  return <Fragment>
    <Head>
      <title>All Posts</title>
      <meta name="description" content='A list of golang posts!'/>
    </Head>
    <AllPosts posts={props.posts}/>
  </Fragment>
};

export function getStaticProps() {
  const allPosts = getAllPosts();
  return {
    props: {
      posts: allPosts,
    }
  }
}
