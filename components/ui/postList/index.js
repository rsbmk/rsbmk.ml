import Image from 'next/image'
import Link from 'next/link'
import styles from 'styles/posts.module.css'

export function PostList ({ allPosts }) {
  return (
    <section className={styles.postSection}>
      <h2 className={styles.postTitle}>Últimos árticulos</h2>
      <aside className={styles.postList}>
        {allPosts.map(({ attributes, slug }) => (
          <Link key={slug} href={`/post/${slug}`}>
            <a>
              <article className={styles.postItem}>
                <div className={styles.wrapTitleDate}>
                  <div className={styles.wrapImgPost}>
                    <Image
                      className={styles.postImage}
                      src={attributes.miniature}
                      alt={`image ${attributes.slug}`}
                      width={40}
                      height={40}
                    />
                  </div>
                  <div>
                    <h3 className={styles.postTitle}>{attributes.title}</h3>
                    <time className={styles.postDate}>{attributes.date}</time>
                  </div>
                </div>
              </article>
            </a>
          </Link>
        ))}
      </aside>
    </section>
  )
}
