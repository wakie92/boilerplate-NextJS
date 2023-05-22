import React from 'react';
import ThemeHandler from 'src/components/shared/ThemeHandler';

export default function RootLayout({ children }: { children: React.ReactElement }) {
  return (
    <html lang="ko">
      <ThemeHandler>
        <body>{children}</body>
      </ThemeHandler>
    </html>
  );
}
