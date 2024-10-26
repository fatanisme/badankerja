import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import './globals.css'

export const metadata = {
  title: 'BADANKERJA',
  description: 'Find your dream job',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="bg-gray-50">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
