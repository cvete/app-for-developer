import React from "react";

interface FooterProps {
  lastUpdated?: string;
  source: string;
  updatedLabel: string;
  lang?: "EN" | "DE" | "FR" | "IT";
}

const monthNames: Record<string, string[]> = {
  EN: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  DE: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
  FR: ["Janv", "Févr", "Mars", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"],
  IT: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"],
};

function formatDate(dateStr?: string, lang: "EN" | "DE" | "FR" | "IT" = "EN") {
  if (!dateStr) return "--";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "--";
  const day = d.getDate().toString().padStart(2, "0");
  const month = monthNames[lang][d.getMonth()];
  const year = d.getFullYear();
  return `${day}. ${month} ${year}`;
}

export const Footer: React.FC<FooterProps> = ({ lastUpdated, source, updatedLabel, lang = "EN" }) => (
  <footer>
    <div className="flex flex-row gap-[15.4px] items-center">
      <div className="bg-[#fff] h-[23px] rounded-[33.7px] flex items-center border border-[#f2f2f2] px-[5.8px] py-[1.9px]">
        <span className="text-[#6a6a6b] text-[12.5px] font-normal">ℹ️ {source}</span>
      </div>
      <div className="bg-[#fff] h-[23px] rounded-[33.7px] flex items-center border border-[#f2f2f2] px-[5.8px] py-[1.9px]">
        <span className="text-[#6a6a6b] text-[12.5px] font-normal">📄 {updatedLabel} {formatDate(lastUpdated, lang)}</span>
      </div>
    </div>
  </footer>
);
