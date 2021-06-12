import Image from 'next/image';

import classes from './hero.module.css';

export default function Hero() {
  return <section className={classes.hero}>
    <div className={classes.image}>
      <Image src="/images/site/Gopher.png" alt="gopher" width={300} height={300}></Image>
    </div>
    <h1>Hi, I'm Gopher</h1>
    <p>I blog about Golang.</p>
  </section>
};
