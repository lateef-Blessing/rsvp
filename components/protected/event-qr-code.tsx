"use client";

import { useRef } from "react";
import { Download } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

import { Button } from "@/components/ui/button";

export const EventQRCode = ({ link }: { link: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleDownload = () => {
    if (canvasRef.current) {
      const url = canvasRef.current.toDataURL("image/jpeg");
      const link = document.createElement("a");
      link.href = url;
      link.download = "event-qrcode.jpeg";
      link.click();
    }
  };

  return (
    <div className="h-max">
      <QRCodeCanvas
        ref={canvasRef}
        value={link}
        size={500}
        style={{ width: "100%", height: "100%" }}
        bgColor="#000000"
        fgColor="#FFFFFF"
        level="M"
      />
      <Button
        onClick={handleDownload}
        className="w-full rounded-md mt-2"
      >
        <Download className="w-5 h-5 mr-2" />Download QRCode
      </Button>
    </div>
  );
};
