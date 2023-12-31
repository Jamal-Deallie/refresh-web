import { auth } from '@/lib/lucia';
import { useRouter } from 'next/router';

import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from 'next';

export const getServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<
  GetServerSidePropsResult<{
    userId: string;
    username: string;
  }>
> => {
  const authRequest = auth.handleRequest(context);
  const session = await authRequest.validate();
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return {
    props: {
      userId: session.user.userId,
      username: session.user.username,
    },
  };
};
type Props = {};

export default function ProfilePage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const router = useRouter();
  
  return (
    <>
      <h1>Profile</h1>
      <p>User id: {props.userId}</p>
      <p>Username: {props.username}</p>
      <form
        method='post'
        action='/api/logout'
        onSubmit={async e => {
          e.preventDefault();
          const response = await fetch('/api/logout', {
            method: 'POST',
            redirect: 'manual',
          });
          if (response.status === 0 || response.ok) {
            router.push('/login'); // redirect to login page on success
          }
        }}>
        <input type='submit' value='Sign out' />
      </form>
    </>
  );
}
