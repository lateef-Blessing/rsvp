"use client";

import { useCallback, useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";

import { newVerification } from "@/actions/new-verification";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { TopDots } from "@/components/root/top-dots";
import { BottomDots } from "@/components/root/bottom-dots";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <section className="py-14 lg:py-20 mt-24 bg-zinc-400/10">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-2">
            <div className="relative mx-auto bg-background max-w-[525px] overflow-hidden rounded-lg px-8 py-14 sm:px-12 md:px-[60px]">
              <div className="mb-10 flex items-center justify-center gap-2 text-3xl text-zinc-700 dark:text-white">
                <ShieldCheck className="h-8 w-8" />
                <h1 className="tracking-tight font-semibold">Email verification</h1>
              </div>
              <div className="flex items-center w-full justify-center">
                {!success && !error && <BeatLoader />}
                <FormSuccess message={success} />
                {!success && <FormError message={error} />}
              </div>
              <div>
                <TopDots />
                <BottomDots />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
