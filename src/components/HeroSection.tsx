import React from "react";

interface HeroSectionProps {
  headline: string;
  subheadline?: string;
  rentLabel: string;
  saleLabel: string;
}

export function HeroSection({ headline, subheadline, rentLabel, saleLabel }: HeroSectionProps) {
  return (
    <section className="flex flex-col gap-6 items-start mb-8">
      <h1
        className="text-[48px] leading-tight mb-4"
        style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600, color: '#000' }}
      >
        {headline.split("\n").map((line, i) => (
          <span key={i} className="block">{line}</span>
        ))}
      </h1>
      {subheadline && (
        <h2 className="text-lg text-gray-600 mb-2">{subheadline}</h2>
      )}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#0c56bc] inline-block" />
          <span className="text-base font-medium text-[#0c56bc]">{rentLabel}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#69c29d] inline-block" />
          <span className="text-base font-medium text-[#69c29d]">{saleLabel}</span>
        </div>
      </div>
    </section>
  );
}
