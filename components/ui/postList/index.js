import Image from 'next/image'
import Link from 'next/link'
import styles from 'styles/posts.module.css'

export function PostList ({ allPosts, allProject }) {
  const postlist = allPosts.sort((a, b) => a.attributes.date < b.attributes.date ? 1 : -1)
  return (
    <section className={styles.postSection}>
      <div>
        <h2>Últimos árticulos</h2>
        <aside className={styles.postList}>
          {postlist.map(({ attributes, slug }) => (
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
      </div>
      <div className={styles.wrapProjects}>
        <h2>Últimos proyecto</h2>
        <section className={styles.projectList}>
          {allProject.map(({ attributes, slug }, i) => {
            if (i >= 2) return null
            return (
              <Link href={`/project/${slug}`} key={attributes.name}>
                <article className={styles.portfolioCardProject}>
                  <img className={styles.porfolioImg} src={attributes.imageURL} />
                  <h3>{attributes.name}</h3>
                  <p>{attributes.description}</p>
                </article>
              </Link>
            )
          })}
        </section>
      </div>
    </section>
  )
}
