import { Helmet } from "react-helmet";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  schema?: object;
}

const SEO = ({
  title = "Аренда Автовышек в Тамбове | Высотные Работы | АвтоВышка68",
  description = "Профессиональная аренда автовышек в Тамбове и области: ВС 22, АГП 22, ВС 28. Высота до 28 метров. Опытные операторы. Работаем 24/7. Низкие цены. Быстрая подача. ☎ +7 915 674 63 90",
  keywords = "аренда автовышки Тамбов, автовышка Тамбов цена, аренда автовышки, высотные работы Тамбов, монтажные работы, строительные работы, ремонт фасадов, установка рекламы, обрезка деревьев, ВС 22, АГП 22, ВС 28, автовышка недорого, автовышка круглосуточно",
  canonical,
  ogImage = "https://avtovyshka68.com/favicon.png",
  schema,
}: SEOProps) => {
  const currentUrl = canonical || window.location.href;

  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "АвтоВышка68 - Аренда Автовышек в Тамбове",
    "description": description,
    "image": ogImage,
    "telephone": "+79156746390",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Тамбов",
      "addressRegion": "Тамбовская область",
      "addressCountry": "RU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "52.7213",
      "longitude": "41.4522"
    },
    "priceRange": "₽₽",
    "openingHours": "Mo-Su 00:00-24:00",
    "url": currentUrl,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "50"
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "52.7213",
        "longitude": "41.4522"
      },
      "geoRadius": "100000"
    }
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang="ru" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={currentUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="ru_RU" />
      <meta property="og:site_name" content="АвтоВышка68" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <meta name="geo.region" content="RU-TAM" />
      <meta name="geo.placename" content="Тамбов" />
      <meta name="geo.position" content="52.7213;41.4522" />
      <meta name="ICBM" content="52.7213, 41.4522" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schema || defaultSchema)}
      </script>
    </Helmet>
  );
};

export default SEO;
