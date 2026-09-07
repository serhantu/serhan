import Link from "next/link";
import {
  listActiveServices,
  listActiveReferences,
  listPublishedBlogPosts,
  listActiveFaqs,
} from "@/lib/cms";
import { getSiteSettings } from "@/lib/site-settings";
import * as s from "./page.css";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [settings, services, references, blogPosts, faqs] = await Promise.all([
    getSiteSettings(),
    listActiveServices(),
    listActiveReferences(),
    listPublishedBlogPosts(),
    listActiveFaqs(),
  ]);

  const recentPosts = blogPosts.slice(0, 3);
  const topFaqs = faqs.slice(0, 4);

  return (
    <main className={s.page}>
      {/* Hero */}
      <section className={s.hero}>
        <h1 className={s.heroTitle}>{settings.companyName || "Serhan Turizm"}</h1>
        <p className={s.heroSubtitle}>
          {settings.aboutShort ||
            "Öğrenci taşımacılığı ve kurumsal personel taşımacılığında güvenli, konforlu ve zamanında ulaşım çözümleri."}
        </p>
        <div className={s.heroActions}>
          <Link href="/teklif" className={s.primaryBtn}>
            Teklif Alın
          </Link>
          <Link href="/hizmetler" className={s.secondaryBtn}>
            Hizmetlerimizi İnceleyin
          </Link>
        </div>
      </section>

      {/* Services */}
      {services.length > 0 && (
        <section className={s.section}>
          <div className={s.sectionHeader}>
            <h2 className={s.sectionTitle}>Hizmetlerimiz</h2>
            <Link href="/hizmetler" className={s.sectionLink}>
              Tüm Hizmetler →
            </Link>
          </div>
          <div className={s.grid}>
            {services.map((service) => (
              <Link key={service.id} href={`/hizmetler/${service.slug}`} className={s.card}>
                {service.imageUrl && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={service.imageUrl} alt={service.name} className={s.cardImage} />
                )}
                <h3 className={s.cardTitle}>{service.name}</h3>
                {service.shortDescription && (
                  <p className={s.cardDescription}>{service.shortDescription}</p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* References */}
      {references.length > 0 && (
        <section className={s.section}>
          <div className={s.sectionHeader}>
            <h2 className={s.sectionTitle}>Referanslarımız</h2>
            <Link href="/referanslar" className={s.sectionLink}>
              Tüm Referanslar →
            </Link>
          </div>
          <div className={s.grid}>
            {references.map((ref) => (
              <div key={ref.id} className={s.card}>
                {ref.logoUrl && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={ref.logoUrl} alt={ref.name} className={s.refLogo} />
                )}
                <h3 className={s.cardTitle}>{ref.name}</h3>
                {ref.description && <p className={s.cardDescription}>{ref.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Blog */}
      {recentPosts.length > 0 && (
        <section className={s.section}>
          <div className={s.sectionHeader}>
            <h2 className={s.sectionTitle}>Güncel Yazılar & Haberler</h2>
            <Link href="/blog" className={s.sectionLink}>
              Tüm Yazılar →
            </Link>
          </div>
          <div className={s.grid}>
            {recentPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className={s.card}>
                {post.coverImage && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={post.coverImage} alt={post.title} className={s.cardImage} />
                )}
                <h3 className={s.cardTitle}>{post.title}</h3>
                {post.excerpt && <p className={s.cardDescription}>{post.excerpt}</p>}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* FAQs */}
      {topFaqs.length > 0 && (
        <section className={s.section}>
          <div className={s.sectionHeader}>
            <h2 className={s.sectionTitle}>Sıkça Sorulan Sorular</h2>
            <Link href="/sss" className={s.sectionLink}>
              Tüm Sorular →
            </Link>
          </div>
          <div className={s.faqList}>
            {topFaqs.map((faq) => (
              <div key={faq.id} className={s.faqItem}>
                <p className={s.faqQuestion}>{faq.question}</p>
                <p className={s.faqAnswer}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
