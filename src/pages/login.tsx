import { Button, Container, Paper, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getSession, signIn } from 'next-auth/react';

export default function Login() {
  return (
    <>
      <Head>
        <title>Sign in | Resume Builder</title>
      </Head>
      <Container maxWidth="sm" className="min-h-screen flex items-center justify-center py-10">
        <Paper className="w-full p-8 flex flex-col items-center gap-6">
          <Link href="/">
            <Image src="/icons/resume-icon.png" alt="logo" height={48} width={48} />
          </Link>
          <Typography variant="h5" component="h1">
            Sign in to continue
          </Typography>
          <Button variant="contained" className="bg-resume-800" onClick={() => signIn('google')}>
            Continue with Google
          </Button>
        </Paper>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: '/builder',
        permanent: false,
      },
    };
  }
  return { props: {} };
};
