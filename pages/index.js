import { HomeHeaders } from 'components/headers/home'
import { Footer } from 'components/ui/footer'
import { PostList } from 'components/ui/postList'
import { UserInfo } from 'components/ui/userInfo'
import { getAllPosts } from 'hooks/getPost'
import styles from 'styles/Home.module.css'

export default function Home ({ allPosts }) {
  return (
    <>
      <HomeHeaders />
      <main className={styles.mainWrap}>
        <UserInfo />
        <PostList allPosts={allPosts} />
      </main>
      <Footer />
    </>
  )
}

export async function getStaticProps () {
  const allPosts = getAllPosts()

  return {
    props: { allPosts }
  }
}
