"use client";

import { Check, Copy, SquareArrowOutUpRight, X } from "lucide-react";
import { useState } from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useOrigin } from "@/hooks/use-origin";

interface Props {
  link: string;
}

export const CopyLink = ({ link }: Props) => {
  const origin = useOrigin();
  const [copied, setCopied] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const inviteUrl = `${origin}/events/${link}`;

  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <>
      <div className="flex items-center mt-2 gap-x-2">
        <Input
          className="bg-zinc-300/50 border-0 text-black focus-visible:ring-0 focus-visible:ring-offset-0"
          value={inviteUrl}
          readOnly
        />
        <div className="flex gap-2">
          <Button size="icon" onClick={copyToClipboard}>
            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
          <Button onClick={toggleShareOptions}>
            {showShareOptions ? (
              <X className="w-4 h-4" />
            ) : (
              <SquareArrowOutUpRight className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
      {/* Conditionally rendered social media sharing buttons */}
      {showShareOptions && (
        <div className="flex items-center gap-5 mt-10">
          <FacebookShareButton url={inviteUrl} title="Check out this event!">
            <FacebookIcon className="w-8 h-8 cursor-pointer" />
          </FacebookShareButton>

          <TwitterShareButton url={inviteUrl} title="Check out this event!">
            <TwitterIcon className="w-8 h-8 cursor-pointer" />
          </TwitterShareButton>

          <WhatsappShareButton url={inviteUrl} title="Check out this event!">
            <WhatsappIcon className="w-8 h-8 cursor-pointer" />
          </WhatsappShareButton>
        </div>
      )}
    </>
  );
};
