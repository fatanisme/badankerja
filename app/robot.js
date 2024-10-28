export default function robots() {
    const baseUrl = "https://badankerja.com"
    return {
        rules: {
            userAgent: '*',
            allow: ['/', '/blog', '/jobs'],
            disallow: '/private/',
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}