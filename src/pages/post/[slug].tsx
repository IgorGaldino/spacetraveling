import { GetStaticPaths, GetStaticProps } from 'next';
import { useEffect } from 'react';
import { PrismicRichText } from '@prismicio/react';
import Header from '../../components/Header';

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

export default function Post({ post }: PostProps, test): JSX.Element {
  useEffect(() => {
    console.log('post', test);
  }, [test]);
  return (
    <div className={commonStyles.container}>
      <Header />
      <main>
        <img src="" alt="" />
        <section>
          {post.data.content.map(content => {
            console.log('content', content);
            return (
              <article key={content.heading}>
                <h2>{content.heading}</h2>
                <PrismicRichText field={content.body}  />
              </article>
            );
          })}
        </section>
      </main>
    </div>
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
