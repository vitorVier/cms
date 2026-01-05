import { HomeProps } from '@/utils/home.type';
import styles from './styles.module.scss';
import Image from 'next/image';
import Link from 'next/link';

export function Services({ object }: HomeProps ) {
  return (
    <>
      <section className={styles.containerAbout}>
        <article className={styles.innerAbout}>
          <h1 className={styles.title}>Sobre</h1>
          <p>{object.metadata.about.description}</p>
        </article>

        <div className={styles.bannerAbout}>
          <Image
            className={styles.imageAbout}
            alt='Imagem ilustrativa sobre a empresa'
            quality={100}
            fill
            src={object.metadata.about.banner.url}
            sizes="(max-width: 480px) 100vw, (max-width: 1024px) 75vw, 50vw"
          />
        </div>
      </section>

      <h2 className={styles.servicesTitle}>Conheça nosso serviços</h2>

      <section className={styles.services} id='servicos'>
        {object.metadata.services.map( service => (
          <article key={service.description} className={styles.service}>
            <Link href={`/post/${service.slug}`}>
              <div className={styles.innerService}>
                <Image
                  className={styles.imageService}
                  alt='Imagem do serviço'
                  quality={100}
                  fill
                  src={service.image.url}
                  sizes="(max-width: 480px) 100vw, (max-width: 1024px) 75vw, 50vw"
                />
              </div>
            </Link>

            <p>{service.description}</p>
          </article>
        ))}
      </section>
    </>
  );
}