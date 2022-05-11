import { GetStaticProps } from 'next';
import Link from "next/link";
import { useState } from 'react';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { FiCalendar, FiUser } from 'react-icons/fi';

import { getPrismicClient } from '../services/prismic';
import Header from '../components/Header';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps): JSX.Element {
  const [posts, setPosts] = useState<PostPagination>(postsPagination);

  function onMorePost(): void {
    console.log('Carregar mais posts', posts.next_page);
    fetch(posts.next_page)
      .then(response => response.json())
      .then(data => {
        setPosts({
          ...data,
          results: [...posts.results, ...data.results],
        });
      });
  }

  function dateFormat(date): string {
    return format(new Date(date), 'dd MMM yyyy', {
      locale: ptBR,
    });
  }

  return (
    <div className={commonStyles.container}>
      <Header />
      <section className={styles.posts}>
        {posts.results.map(post => (
          <article key={post.uid}>
            <Link href={`/post/${post.uid}`}>
              <a>
                <h3>{post.data.title}</h3>
              </a>
            </Link>
            <p>{post.data.subtitle}</p>
            <div className={styles.info}>
              <FiCalendar />
              {dateFormat(post.first_publication_date)}
              <FiUser />
              {post.data.author}
            </div>
          </article>
        ))}
      </section>
      {posts.next_page && (
        <button
          type="button"
          className={styles.btnMorePosts}
          onClick={() => {
            onMorePost();
          }}
        >
          Carregar mais posts
        </button>
      )}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient({});
  const postsPagination = await prismic.getByType('posts', { pageSize: 1 });

  return {
    props: {
      postsPagination,
    },
  };
};
