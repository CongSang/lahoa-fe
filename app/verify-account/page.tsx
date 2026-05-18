import { ActivationStatusCard } from '@/components/index'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function VerifyAccountPage() {
  const cookieStore = await cookies();

  const status =
    cookieStore.get("verify-account")?.value;

  if (!status) {
    redirect("/");
  }

  const valid =
    status === 'SUCCESS' ||
    status === 'EXPIRED' ||
    status === 'INVALID'
      ? status
      : 'INVALID'

  return (
    <main className="min-h-screen bg-linear-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center px-6">
      <ActivationStatusCard status={valid} />
    </main>
  )
}