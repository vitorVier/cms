import { Suspense } from "react";
import { getItemBySlug } from '@/utils/actions/getData';
import { PostProps } from '@/utils/post.type';
import { Metadata } from 'next';
import { Content } from './components/content';
import { LoadingPost } from "./components/loading";

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

    return (
        <>
            <Suspense fallback={<LoadingPost />}>
                <Content slug={slug} />
            </Suspense>
        </>
    )
}
