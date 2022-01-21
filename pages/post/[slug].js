import { PostHeaders } from 'components/headers/post'
import { Footer } from 'components/ui/footer'
import { Nav } from 'components/ui/Nav'
import { getAllPosts, getPostBySlug } from 'hooks/getPost'
import { marked } from 'marked'
import styles from 'styles/posts.module.css'

export default function Post ({ body, title, slug }) {
  return (
    <>
      <PostHeaders title={title} />
      <main className={styles.wrapPost}>
        <Nav />
        <div dangerouslySetInnerHTML={{ __html: body }} />
      </main>
      {/* {slug && <button>
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://twitter.com/intent/tweet?url=https://rsbmk.ml/post/${slug}`}
        >
          comparte este post
        </a>
      </button>} */}
      <Footer />
    </>
  )
}

export function getStaticProps ({ params }) {
  const slug = params.slug
  const { body, attributes } = getPostBySlug(slug)
  return {
    props: {
      body: marked(body),
      title: attributes.title,
      slug
    }
  }
}

export async function getStaticPaths () {
  const posts = getAllPosts()

  return {
    paths: posts.map(({ slug }) => {
      return {
        params: {
          slug: slug
        }
      }
    }),
    fallback: false
  }
}
