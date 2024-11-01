import Analytics from './components/analytics/Analytics'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import './globals.css'

export const metadata = {
  metadataBase: new URL('https://badankerja.com'),
  keywords: ["Lowongan Kerja", "Karir", "Pencarian Kerja", "Lowongan Kerja Terbaru", "Loker", "Job Vacancy", "Peluang Karir", "Rekrutmen", "Info Lowongan Kerja", "Kerja di Indonesia", "Lowongan Pekerjaan 2024", "Bursa Kerja", "Resume dan CV", "Tips Karir", "Jabatan Pekerjaan"],
  title: {
    default: "BadanKerja",
    template: "%s | BadanKerja",
  },
  description: "Cari pekerjaan impianmu disini !",
  openGraph: {
    description: "Cari pekerjaan impianmu disini !",
    images: ["https://strapi.badankerja.com/uploads/badan_kerja_og_image_c0eb8277c0.jpg"]
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <head>
          <Analytics />
        </head>
        <Header />
        <main className="bg-gray-50">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
