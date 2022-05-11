import { GetStaticPaths, GetStaticProps } from 'next';
import { useEffect } from 'react';
import { RichText } from 'prismic-dom';
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

export default function Post({ post }: PostProps): JSX.Element {
  useEffect(() => {
    console.log('post', post);
  }, [post]);
  return (
    <div className={commonStyles.container}>
      <Header />
      <main>
        <img src="" alt="" />
        <section>content</section>
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
  const response = await prismic.getByUID('posts', slug);
  // const post = {
  //   ...response,
  //   data: {
  //     ...response.data,
  //     title: RichText.asText(response.data.title),
  //     author: RichText.asText(response.data.author),
  //     content: RichText.asHtml(response.data.content),
  //   },
  // };

  return {
    props: {
      post: response,
    },
  };
};
