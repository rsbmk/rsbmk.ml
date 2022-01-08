import { SocialLinks } from 'components/ui/socialLinks'
import Image from 'next/image'
import Link from 'next/link'
import styles from 'styles/Home.module.css'

export function UserInfo () {
  return (
    <section className={styles.userSection}>
      <Image
        src="https://i.postimg.cc/gJGHVbqz/rsbmk.jpg"
        alt="rsbmk"
        className={styles.userImg}
        width={200}
        height={200}
      />
      <h1 className={styles.name}>Roberto Bocio Melo</h1>
      <p className={styles.descrip}>
        FullStack JavaScript Developer <br /> I ❤ programming 👨‍💻 Music 🎸 NBA 🏀
      </p>
      <h3 className={styles.porfafolioLink}>
        <Link href="/portafolio">
          <a>Portafolio</a>
        </Link>
      </h3>
      <SocialLinks />
    </section>
  )
}
