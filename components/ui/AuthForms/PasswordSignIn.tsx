'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { signInWithPassword } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PasswordSignInProps {
  redirectMethod: string;
}

export default function PasswordSignIn({
  redirectMethod
}: PasswordSignInProps) {
  const router = redirectMethod === 'client' ? useRouter() : null;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    await handleRequest(e, signInWithPassword, router);
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
              placeholder="email@gmail.com"
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
          <Button type="submit" className="mt-1">
            Zaloguj
          </Button>
        </div>
      </form>
      <p>
        <Link
          href="/signin/forgot_password"
          className="text-sm hover:underline"
        >
          Resetuj hasło
        </Link>
      </p>
      <p>
        <Link href="/signin/signup" className="text-sm hover:underline">
          Nie masz konta? Zarejestruj się
        </Link>
      </p>
    </div>
  );
}
