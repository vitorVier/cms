import { Container } from "@/components/container";
import { Hero } from "@/components/hero";
import Image from "next/image";
import styles from './content.module.scss'
import { PostProps } from "@/utils/post.type";
import { getItemBySlug } from "@/utils/actions/getData";
import { Phone } from "lucide-react";

export async function Content({ slug }: { slug: string }) {
    const { objects }: PostProps = await getItemBySlug(slug);
    
    return (
        <>
            <Hero 
                heading={objects[0].title}
                buttonTitle={objects[0].metadata.button.title}
                buttonUrl={objects[0].metadata.button.url}
                bannerUrl={objects[0].metadata.banner.url}
                icon={ <Phone size={22} color="#FFF" /> }
            />

            <Container>
                <section className={styles.about}>
                    <article className={styles.innerAbout}>
                        <h1>{objects[0].metadata.description.title}</h1>
                        <p>{objects[0].metadata.description.text}</p>

                        {objects[0].metadata.description.button_active && (
                            <a 
                                href={objects[0].metadata.description.button_url as string}
                                target='_blank'
                                className={styles.link}
                            >
                                {objects[0].metadata.description.button_title}
                            </a>
                        )}
                    </article>

                    <div className={styles.bannerAbout}>
                        <Image
                            className={styles.imgAbout}
                            alt={objects[0].title}
                            quality={100}
                            fill
                            src={objects[0].metadata.banner.url}
                            sizes="(max-width: 480px) 100vw, (max-width: 1024px) 75vw, 50vw"
                        />
                    </div>
                </section>
            </Container>
        </>
    )
}