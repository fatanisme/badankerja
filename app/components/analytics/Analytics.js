import Script from 'next/script';

const Analytics = () => {
    return (
        <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=G-9S53CP8PDV`} strategy='afterInteractive'></Script>
            <Script id='google-analytics' strategy='afterInteractive'>
                {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-9S53CP8PDV');
          `}
            </Script>
        </>
    );
};

export default Analytics;