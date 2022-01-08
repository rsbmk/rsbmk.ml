import { HomeHeaders } from 'components/headers/home'
import { Footer } from 'components/ui/footer'
import { PostList } from 'components/ui/postList'
import { UserInfo } from 'components/ui/userInfo'
import { getAllPosts } from 'hooks/getPost'
import { getAllProjects } from 'hooks/getProyects'
import styles from 'styles/Home.module.css'

export default function Home ({ allPosts, allProject }) {
  return (
    <>
      <HomeHeaders />
      <main className={styles.mainWrap}>
        <UserInfo />
        <PostList allPosts={allPosts} allProject={allProject}/>
      </main>
      <Footer />
    </>
  )
}

export async function getStaticProps () {
  const allPosts = getAllPosts()
  const allProject = getAllProjects()

  return {
    props: { allPosts, allProject }
  }
}
