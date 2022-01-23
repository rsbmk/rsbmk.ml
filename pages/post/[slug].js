import { PostHeaders } from 'components/headers/post'
import { Footer } from 'components/ui/footer'
import { Nav } from 'components/ui/Nav'
import { ShereButtom } from 'components/ui/shareBottom'
import { getAllPosts, getPostBySlug } from 'hooks/getPost'
import { marked } from 'marked'
import styles from 'styles/posts.module.css'
import { SOCIAL } from 'utils/dictionaries'

export default function Post ({ body, title, slug }) {
  return (
    <>
      <PostHeaders slug={slug} title={title} />
      <main className={styles.wrapPost}>
        <Nav />
        <div dangerouslySetInnerHTML={{ __html: body }} />
      </main>
      <aside className={styles.shered}>
        <h2>¡Comparte!</h2>
        <p>Ayudame a que este artículo llegue a más personas interesadas en el desarrolo web.</p>
        <section className={styles.SharedSection}>
          {slug && <ShereButtom slug={slug} social={SOCIAL.TWITTER} />}
          {slug && <ShereButtom slug={slug} social={SOCIAL.LINKEDIN} />}
        </section>
      </aside>
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
