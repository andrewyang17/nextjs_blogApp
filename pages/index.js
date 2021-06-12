import {Fragment} from "react";
import Head from "next/head";

import Hero from "../components/homepage/hero";
import FeaturedPosts from "../components/homepage/featured-posts";
import getFeaturedPosts from "../utility/posts-util";

export default function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Gopher's Blog</title>
        <meta name="description" content="It's all about golang!" />
      </Head>
      <Hero />
      <FeaturedPosts posts={props.posts}/>
    </Fragment>
  )
};

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();
  return {
    props: {
      posts: featuredPosts
    },
  }
}
