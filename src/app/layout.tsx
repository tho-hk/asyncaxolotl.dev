// add the Header after creation

import Header from '@/components/Header'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Async the Axolotl is here!</title>
      </head>
      <body>
        <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
          <Header />  {/* ← Calling the Header function */}
          {children}
        </main>
      </body>
    </html>
  );
}
