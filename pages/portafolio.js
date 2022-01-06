import { PortafolioHeaders } from 'components/headers/portafolio'
import { ButtonBack } from 'components/ui/buttonBack'
import { Footer } from 'components/ui/footer'
import { getAllProjects } from 'hooks/getProyects'
import Link from 'next/link'
import styles from 'styles/porfolio.module.css'

export default function Portafolio ({ projects }) {
  return (
    <>
      <PortafolioHeaders />
      <main className={styles.main}>
        <ButtonBack /> <h1 className={styles.title}>Portafolio</h1>
        <section className={styles.projectList}>
          {projects.map(({ attributes, slug }) => (
            <Link href={`/project/${slug}`} key={attributes.name}>
              <article className={styles.portfolioCardProject}>
                <img className={styles.porfolioImg} src={attributes.imageURL} />
                <h3>{attributes.name}</h3>
                <p>{attributes.description}</p>
              </article>
            </Link>
          ))}
        </section>
        <Footer />
      </main>
    </>
  )
}

export async function getStaticProps () {
  const projects = getAllProjects()

  return {
    props: { projects }
  }
}
