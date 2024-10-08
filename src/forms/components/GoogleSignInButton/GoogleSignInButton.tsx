/**
 *
 * A button component that triggers authentication with Google using NextAuth.
 * This button is styled to visually match Google's branding and can be customized
 * with different callback URLs.
 */


import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";

interface GoogleSignInButtonProps {
  callbackUrl?: string;
  isDisabled?: boolean;
}


const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({ callbackUrl, isDisabled }) => {

  // const session = await getServerSession(authOptions)
  // const userRoles = session?.user?.roles || [];
  
  const getRedirectPath = (userRoles: string[]): string => {
    if (userRoles.includes('admin')) {
        return "/dashboard/worksheets/validatedSheets";
    } else if (userRoles.includes('editor') && !userRoles.includes('reviewer')) {
        return "/dashboard/worksheets/sheetsToComplete";
    } else if (userRoles.includes('reviewer') && !userRoles.includes('editor')) {
        return "/dashboard/worksheets/sheetsToReview";
    } else if (userRoles.includes('editor') && userRoles.includes('reviewer')) {
        return "/dashboard/worksheets/sheetsToComplete";
    }
    return "/"; // Ruta por defecto si no se cumplen las condiciones
};
  const handleSignIn = () => {
    signIn('google', { callbackUrl: '/dashboard/worksheets/allSheets' });
  };

  return (
    <button
      onClick={handleSignIn}
      disabled={isDisabled}
      className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent transition-transform transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed mt-3"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path
          d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
          fill="#EA4335"
        />
        <path
          d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
          fill="#4285F4"
        />
        <path
          d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
          fill="#FBBC05"
        />
        <path
          d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
          fill="#34A853"
        />
      </svg>
      <span className="text-sm font-semibold leading-6">Google</span>
    </button>
  );
}

export default GoogleSignInButton;