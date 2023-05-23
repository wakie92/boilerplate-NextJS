'use client';
import { Provider, useStore } from 'jotai';
import React from 'react';
import ThemeHandler from 'src/components/shared/ThemeHandler';

export default function RootLayout({ children }: { children: React.ReactElement }) {
  const store = useStore();

  return (
    <html lang="ko">
      <ThemeHandler>
        <Provider store={store}>
          <body>{children}</body>
        </Provider>
      </ThemeHandler>
    </html>
  );
}
