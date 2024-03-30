import { GetStaticProps } from 'next';
import { RiCalendarLine, RiUserLine } from 'react-icons/ri';
import Prismic from '@prismicio/client';
import Link from 'next/link';
import { useState } from 'react';
import { getPrismicClient } from '../services/prismic';
import Header from '../components/Header';

import styles from './home.module.scss';
import { formatDate } from '../utils/date-format';

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
  preview: boolean;
}

const Home: React.FC<HomeProps> = ({ postsPagination, preview }) => {
  const [posts, setPosts] = useState<PostPagination>(postsPagination);
  const handleLoadPosts = (): void => {
    fetch(postsPagination.next_page)
      .then(response => response.json())
      .then(data => {
        setPosts({
          next_page: data.next_page,
          results: data.results.map(item => ({
            uid: item.uid,
            first_publication_date: item.first_publication_date,
            data: {
              author: item.data.author,
              title: item.data.title,
              subtitle: item.data.subtitle,
            },
          })),
        });
      });
  };

  return (
    <>
      <Header />
      <div className={styles.postContainer}>
        {posts.results.map(post => (
          <Link href={`/post/${post.uid}`} key={post.uid}>
            <div className={styles.post}>
              <h2>{post.data.title}</h2>
              <p>{post.data.subtitle}</p>
              <div className={styles.infoContainer}>
                <div className={styles.info}>
                  <RiCalendarLine size={20} />
                  <span>{formatDate(post.first_publication_date)}</span>
                </div>
                <div>
                  <RiUserLine size={20} />
                  <span>{post.data.author}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}

        {posts.next_page && (
          <button onClick={() => handleLoadPosts()} type="button">
            Carregar mais posts
          </button>
        )}

        {preview && (
          <aside>
            <Link href="/api/exit-preview">
              <a className={styles.button}>Sair do modo Preview</a>
            </Link>
          </aside>
        )}
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async ({
  previewData,
  preview = false,
}) => {
  console.log(previewData);
  console.log(preview);
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    { pageSize: 20, ref: previewData?.ref ?? null }
  );
  const results = postsResponse.results.map(item => ({
    uid: item.uid,
    first_publication_date: item.first_publication_date,
    data: {
      author: item.data.author,
      title: item.data.title,
      subtitle: item.data.subtitle,
    },
  }));

  return {
    props: {
      postsPagination: {
        results,
        next_page: postsResponse.next_page,
      },
      preview,
    },
  };
};

export default Home;
