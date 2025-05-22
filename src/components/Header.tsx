import React from "react";
import Image from "next/image";

interface HeaderProps {
  chartRef: React.RefObject<HTMLDivElement>;
  onLogout: () => void;
  lang: "EN" | "DE" | "FR" | "IT";
  setLang: (lang: "EN" | "DE" | "FR" | "IT") => void;
  downloadLabel: string;
  logoutLabel: string;
}

const LANGUAGES = [
  { code: "EN" as const, label: "EN" },
  { code: "DE" as const, label: "DE" },
  { code: "FR" as const, label: "FR" },
  { code: "IT" as const, label: "IT" },
];

export function Header({ chartRef, onLogout, lang, setLang, downloadLabel, logoutLabel }: HeaderProps) {
  const handleDownload = () => {
    if (chartRef.current) {
      import("html-to-image").then(htmlToImage => {
        htmlToImage.toPng(chartRef.current!).then(dataUrl => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "properti-charts.png";
          link.click();
        });
      });
    }
  };

  return (
    <div className="bg-[#ffffff] w-full border-b">
      <div className="flex flex-row items-center justify-between px-8 py-3">
        <div className="h-[30px] w-[120px] relative">
          <Image src="/logo.svg" alt="Properti Logo" width={120} height={30} priority />
        </div>
        <div className="flex flex-row gap-4 items-center">
          <button
            onClick={handleDownload}
            className="bg-black text-white rounded px-6 py-2 text-base font-medium flex items-center gap-2 hover:bg-gray-800"
          >
            {downloadLabel} ⬇️
          </button>
          <select 
            value={lang} 
            onChange={(e) => setLang(e.target.value as "EN" | "DE" | "FR" | "IT")}
            className="px-6 py-2 text-base font-medium border-2 border-black rounded bg-white text-black hover:bg-gray-100"
          >
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>{l.label}</option>
            ))}
          </select>
          <button
            onClick={onLogout}
            className="ml-2 text-base font-medium text-black hover:underline"
          >
            {logoutLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
