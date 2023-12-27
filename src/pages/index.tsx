import Dashboard from '@/components/Dashboard';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>T-Audio</title>
      </Head>
      <div className="min-h-screen">
        <Dashboard />
      </div>
    </>
  );
}
