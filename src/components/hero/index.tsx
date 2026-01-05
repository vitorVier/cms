import Image from "next/image";
import styles from "./styles.module.scss";

interface HeroProps {
    heading: string;
    buttonUrl: string;
    buttonTitle: string;
    bannerUrl: string;
    icon: React.ReactNode;
}

export function Hero({ heading, buttonUrl, buttonTitle, bannerUrl, icon }: HeroProps) {
    return (
        <main className={styles.main}>
            <div className={styles.containerHero}>
                <h1 className={styles.heading}>{heading}</h1>

                <a 
                    href={buttonUrl}
                    target="_blank"
                    className={styles.link}
                >
                    {icon}
                    {buttonTitle}
                </a>
            </div>

            <div className={styles.contentBanner}>
                <Image
                    src={bannerUrl}
                    alt={heading || "Banner"}
                    priority
                    fill
                    quality={100}
                    className={styles.banner}
                    sizes="(max-width: 480px) 100vw, (max-width: 1024px) 75vw, 50vw"
                />
            </div>
        </main>
    )
}