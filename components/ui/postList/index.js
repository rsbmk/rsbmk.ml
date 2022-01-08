import { PostSection } from 'components/integretions/postSection'
import { ProjectSection } from 'components/integretions/projectSection'
import styles from 'styles/posts.module.css'
import { sortDate } from 'utils/sortForDate'

export function WrapMainInfo ({ allPosts, allProject }) {
  const postList = sortDate(allPosts)
  const projectList = sortDate(allProject)

  return (
    <section className={styles.postSection}>
      <PostSection postlist={postList} />
      <ProjectSection allProject={projectList} />
    </section>
  )
}
