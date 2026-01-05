import { getItemBySlug } from '@/utils/actions/getData';
import styles from './styles.module.scss';
import { Hero } from '@/components/hero';
import { PostProps } from '@/utils/post.type';
import { Phone } from 'lucide-react';
import Image from 'next/image';
import { Container } from '@/components/container';
import { Metadata } from 'next';

export async function generateMetadata({ params }: {
    params: { slug: string }
}): Promise<Metadata> {
    
    const { slug } = await params;

    try {
        const { objects }: PostProps = await getItemBySlug(slug)
        .catch(() => {
            return {
                title: "DevNotors - Sua oficina especializada!",
                description: "Oficina de carros em Santo Cristo - RS",
            }
        })

        return {
            title: `DevMotors - ${objects[0].title}`,
            description: `${objects[0].metadata.description.text}`,
            keywords: ['devmotors', 'troca de oleo', 'devmotors troca de oleo'],
            openGraph: {
                images: [objects[0].metadata.banner.url]
            },
            robots: {
                index: true,
                follow: true,
                nocache: true,
                googleBot: {
                index: true,
                follow: true,
                noimageindex: true
                }
            }
        }
    } catch (err) {
        return {
            title: "DevNotors - Sua oficina especializada!",
            description: "Oficina de carros em Santo Cristo - RS",
        }
    }
}

export default async function Page({ params }: {
    params: { slug: string }
}) {
    const { slug } = await params;
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
