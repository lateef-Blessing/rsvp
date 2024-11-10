"use client";

import { useQRCode } from "next-qrcode";

export const EventQRCode = ({ link }: { link: string }) => {
  const { Image } = useQRCode();

  return (
    <Image
      text={link}
      options={{
        type: "image/jpeg",
        quality: 0.5,
        errorCorrectionLevel: "M",
        margin: 1,
        scale: 4,
        width: 1000,
        color: {
          dark: "#FFFFFF",
          light: "#000000",
        },
      }}
    />
  );
};
