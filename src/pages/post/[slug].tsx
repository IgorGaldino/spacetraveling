import { GetStaticPaths, GetStaticProps } from 'next';
import { useEffect } from 'react';
import { PrismicRichText } from '@prismicio/react';
import { RichText } from 'prismic-dom';

import Header from '../../components/Header';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';

import { dateFormat } from '../../utils/dateFormat';
import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): JSX.Element {
  useEffect(() => {
    console.log('post', post);
  }, [post]);
  const WORD_PER_MIN = 200;
  const readingTime = (): number => {
    const wordsLength = post.data.content.reduce((acc, current) => {
      const actualLenght = RichText.asText(current.body).match(/\S+/g).length;
      return acc + actualLenght;
    }, 0);
    return Math.ceil(wordsLength / WORD_PER_MIN);
  };

  return (
    <>
      <Header />
      {!!post?.data && (
        <main>
          <div className={styles.banner}>
            <img src={post.data.banner.url} alt="banner" />
          </div>
          <section className={commonStyles.container}>
            <header className={styles.header}>
              <h2>{post.data.title}</h2>
              <div className={commonStyles.info}>
                <span>
                  <FiCalendar />
                  {dateFormat(post.first_publication_date)}
                </span>
                <span>
                  <FiUser />
                  {post.data.author}
                </span>
                <span>
                  <FiClock />
                  {readingTime()} min
                </span>
              </div>
            </header>
            <section className={styles.content}>
              {post.data.content.map(content => {
                return (
                  <article key={content.heading}>
                    <h2 className={styles.title}>{content.heading}</h2>
                    <PrismicRichText field={content.body} />
                  </article>
                );
              })}
            </section>
          </section>
        </main>
      )}
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient({});
  // const posts = await prismic.getByType('posts');

  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const prismic = getPrismicClient({});
  const { slug } = params;
  const post = await prismic.getByUID('posts', slug);

  return {
    props: {
      post,
    },
  };
};
