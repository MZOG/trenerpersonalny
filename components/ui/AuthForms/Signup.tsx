'use client';

import { Button } from '@/components/ui/button';
import React from 'react';
import Link from 'next/link';
import { signUp } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

// Define prop type with allowEmail boolean
interface SignUpProps {
  allowEmail: boolean;
  redirectMethod: string;
}

export default function SignUp({ allowEmail, redirectMethod }: SignUpProps) {
  const router = redirectMethod === 'client' ? useRouter() : null;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    await handleRequest(e, signUp, router);
    setIsSubmitting(false);
  };

  return (
    <div className="my-8">
      <form
        noValidate={true}
        className="mb-4"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="space-y-7">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">E-mail</Label>
            <Input
              type="email"
              id="email"
              name="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              placeholder="name@example.com"
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">Hasło</Label>
            <Input
              type="password"
              id="password"
              name="password"
              autoComplete="password"
              placeholder="Hasło"
            />
          </div>
          <Button
            type="submit"
            // className="mt-1"
            // loading={isSubmitting}
          >
            Zarejestruj
          </Button>
        </div>
      </form>
      <p className="font-medium">Masz już konto?</p>
      <p>
        <Link
          href="/signin/password_signin"
          className="text-sm hover:underline"
        >
          Zaloguj się
        </Link>
      </p>
    </div>
  );
}
