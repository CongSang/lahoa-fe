import { GoogleLoginRedirect } from '@/components/auth';

interface OAuth2RedirectPageProps {
  searchParams: Promise<{
    token: string;
    refreshToken: string;
  }>
}
 
const OAuth2RedirectPage = async ({ searchParams } : OAuth2RedirectPageProps) => {
  const params = await searchParams

  return (
    <GoogleLoginRedirect searchParams={params} />
  );
}

export default OAuth2RedirectPage
