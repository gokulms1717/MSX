import type { NextPage } from 'next';
import Head from 'next/head';
import BuilderLayout from '@/modules/builder/BuilderLayout';
import dynamic from 'next/dynamic';

const OnboardingChooser = dynamic(() => import('@/modules/builder/OnboardingChooser'), {
  ssr: false,
});

const BuilderPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>E-Resume: Builder</title>
        <meta name="description" content="Single Page Resume Builder" />
        <link rel="icon" type="image/png" href="/icons/resume-icon.png" />
      </Head>

      <BuilderLayout />
      <OnboardingChooser />
    </div>
  );
};

export default BuilderPage;
