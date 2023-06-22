import ToasterProvider from '@/providers/ToasterProvider'
import './globals.css'

export const metadata = {
  title: 'Gallery of Glosses',
  description: 'Explore Glosses and Manuscripts',
}

export const revalidate = 0;

export default async function RootLayout({ children }: {children: React.ReactNode }) {

    return (
        <html lang="en">
            <body>
                <ToasterProvider />
                {children}
            </body>
        </html>
    )
}
