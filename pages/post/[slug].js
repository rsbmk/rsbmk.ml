import { PostHeaders } from 'components/headers/post'
import { ButtonBack } from 'components/ui/buttonBack'
import { Footer } from 'components/ui/footer'
import { getAllPosts, getPostBySlug } from 'hooks/getPost'
import { marked } from 'marked'
import styles from 'styles/posts.module.css'

export default function Post ({ body, title }) {
  return (
    <>
      <PostHeaders title={title} />
      <main className={styles.wrapPost}>
        <ButtonBack />
        <div dangerouslySetInnerHTML={{ __html: body }} />
      </main>
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
      title: attributes.title
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
