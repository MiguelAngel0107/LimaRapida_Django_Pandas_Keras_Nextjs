"use client";
import Script from "next/script";

export function GoogleAnalytics() {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-8NJ5Z0LCJV"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || []; function gtag()
          {dataLayer.push(arguments)}
          gtag('js', new Date()); gtag('config', 'G-8NJ5Z0LCJV');
                `,
        }}
      />
    </>
  );
}

export function GoogleTagManager() {
  return (
    <>
      <Script id="google-tag" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MHDNQN8W');`}
      </Script>

      <noscript id="google-tag-noscript">
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-MHDNQN8W"
          height="0"
          width="0"
          style={
            { display: "none", visibility: "hidden" } as React.CSSProperties
          }
        ></iframe>
      </noscript>
    </>
  );
}
