import { GetStaticPaths, GetStaticProps } from 'next';

import { RiCalendarLine, RiTimeLine, RiUserLine } from 'react-icons/ri';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import { getPrismicClient } from '../../services/prismic';
import styles from './post.module.scss';
import { formatDate, formatDateWitHours } from '../../utils/date-format';
import Comments from '../../components/Comments';

interface Post {
  first_publication_date: string | null;
  last_publication_date?: string | null;
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
  prevPost?: {
    title: string;
    uid: string;
  };
  nextPost?: {
    title: string;
    uid: string;
  };
}

const Post: React.FC<PostProps> = ({ post, nextPost, prevPost }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Carregando...</div>;
  }
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.banner}>
          {post.data.banner.url && (
            <img src={post.data.banner.url} alt="Banner" />
          )}
        </div>
        <div className={styles.content}>
          <h1>{post.data.title}</h1>
          <div className={styles.infosContainer}>
            <div className={styles.infos}>
              <div className={styles.info}>
                <RiCalendarLine size={20} />
                <span>{formatDate(post.first_publication_date)}</span>
              </div>
              <div>
                <RiUserLine size={20} />
                <span>{post.data.author}</span>
              </div>
              <div>
                <RiTimeLine size={20} />
                <span>
                  {`${Math.ceil(
                    post.data.content.reduce((total, item) => {
                      const heading = item.heading.split(' ').length;
                      const body = RichText.asHtml(item.body)
                        .replace(/(<([^\s>]+)>)/gi, ' ')
                        .trim()
                        .split(/\s+/).length;
                      return total + heading + body;
                    }, 0) / 200
                  )} min`}
                </span>
              </div>
            </div>
            {post.last_publication_date &&
              post.first_publication_date !== post.last_publication_date && (
                <p>{`* editado em ${formatDateWitHours(
                  post.last_publication_date
                )}`}</p>
              )}
          </div>

          <div className={styles.dataContent}>
            {post.data.content.map(item => (
              <div key={item.heading}>
                <h2>{item.heading}</h2>
                <div
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{
                    __html: RichText.asHtml(item.body),
                  }}
                />
              </div>
            ))}
          </div>
          <div className={styles.buttonContainer}>
            {prevPost ? (
              <Link href={`/post/${prevPost.uid}`} passHref>
                <a>
                  <p>{prevPost.title}</p>
                  <span>Post Anterior</span>
                </a>
              </Link>
            ) : (
              <div />
            )}
            {nextPost ? (
              <Link href={`/post/${nextPost.uid}`} passHref>
                <a>
                  <p>{nextPost.title}</p>
                  <span>Proximo Post</span>
                </a>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>

      <Comments repositoryName="felipesouza91/ignite-reactjs-def5" />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    { pageSize: 10 }
  );

  const paths = postsResponse.results.map(item => ({
    params: { slug: item.uid },
  }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const prismic = getPrismicClient();
  const response = await prismic.getByUID('posts', String(slug), {});
  const prevpost = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      pageSize: 1,
      after: response.id,
      orderings: '[document.first_publication_date desc]',
    }
  );
  const nextpost = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      pageSize: 1,
      after: response.id,
      orderings: '[document.first_publication_date]',
    }
  );

  const prevPost =
    prevpost.results.length > 0
      ? {
          title: prevpost.results[0].data.title,
          uid: prevpost.results[0].uid,
        }
      : null;
  const nextPost =
    nextpost.results.length > 0
      ? {
          title: nextpost.results[0].data.title,
          uid: nextpost.results[0].uid,
        }
      : null;

  return {
    props: {
      post: response,
      nextPost,
      prevPost,
    },
  };
};

export default Post;
