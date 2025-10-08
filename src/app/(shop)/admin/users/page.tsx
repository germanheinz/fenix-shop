export const revalidate = 0;

import { Title } from '@/components';

import { redirect } from 'next/navigation';
import { UserTable } from './ui/UserTable';
import { getPaginaterUser } from '@/actions';

export default async function OrderPage() {

  const {ok, users = [] } = await getPaginaterUser();

  // if(!ok) redirect('/')


  return (
    <>
      <Title title="Users Manager" />

      <div className="mb-10">
        
        <UserTable users={ users }/>

      </div>
    </>
  );
}