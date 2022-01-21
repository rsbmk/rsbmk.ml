import { ProjectHeaders } from 'components/headers/project'
import { Footer } from 'components/ui/footer'
import { Nav } from 'components/ui/Nav'
import { getAllProjects, getProjectBySlug } from 'hooks/getProyects'
import { marked } from 'marked'
import styles from 'styles/porfolio.module.css'

export default function Project ({ body, name, description }) {
  return (
    <>
      <ProjectHeaders description={description} name={name} />
      <main className={styles.wrapProject}>
        <Nav />
        <div dangerouslySetInnerHTML={{ __html: body }} />
      </main>
      <Footer />
    </>
  )
}
export function getStaticProps ({ params }) {
  const projectName = params.project
  const { body, attributes } = getProjectBySlug(projectName)
  return {
    props: {
      body: marked(body),
      name: attributes.name,
      description: attributes.description
    }
  }
}

export async function getStaticPaths () {
  const proyects = getAllProjects()
  return {
    paths: proyects.map(({ slug }) => {
      return {
        params: {
          project: slug
        }
      }
    }),
    fallback: false
  }
}
