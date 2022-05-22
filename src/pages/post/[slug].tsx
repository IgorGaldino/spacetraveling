import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import { PrismicRichText } from '@prismicio/react';
import { RichText } from 'prismic-dom';
import { RichTextField } from '@prismicio/types';

import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';

import Header from '../../components/Header';

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
  const WORD_PER_MIN = 200;
  const router = useRouter();

  const readingTime = (): number => {
    const wordsLength = post.data.content.reduce((acc, current) => {
      const actualLength = RichText.asText(current.body).match(/\S+/g).length;
      return acc + actualLength;
    }, 0);
    return Math.ceil(wordsLength / WORD_PER_MIN);
  };

  if (router.isFallback) {
    return <div>Carregando...</div>;
  }

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
                    <PrismicRichText field={content.body as RichTextField} />
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
  const posts = await prismic.getByType('posts');
  const paths = posts.results.map(post => ({
    params: {
      slug: post.uid,
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const prismic = getPrismicClient({});
  const { slug } = params;
  const post = await prismic.getByUID('posts', slug as string);

  return {
    props: {
      post,
    },
  };
};
