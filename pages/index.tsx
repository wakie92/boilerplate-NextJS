import dynamic from 'next/dynamic';
import React from 'react';

import Landing from 'src/components/Landing';
import Layout from 'src/components/shared/Layout';

const BottomSheet = dynamic(() => import('src/components/shared/BottomSheet'), { ssr: false });

const Index = () => {
  return (
    <Layout>
      <Landing />
      <BottomSheet />
    </Layout>
  );
};

export default Index;
