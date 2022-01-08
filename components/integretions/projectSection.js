import Link from 'next/link'
import styles from 'styles/posts.module.css'

export function ProjectSection ({ allProject }) {
  return (
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
  )
}
