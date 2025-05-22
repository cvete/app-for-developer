"use client";
import React, { useEffect, useRef, useState } from "react";
import { Header } from "@/components/Header";
import { PropTechBrokers } from "@/components/PropTechBrokers";
import { TraditionalAgents } from "@/components/TraditionalAgents";
import { HeroSection } from "@/components/HeroSection";
import { Footer } from "@/components/Footer";
import Image from "next/image";

interface Broker {
  broker: string;
  rent: number;
  sale: number;
  total: number;
  category: "proptech" | "traditional";
}

interface BrokerData {
  updatedOn: string;
  brokers: Broker[];
}

const translations = {
  EN: {
    headline: "The Leading Real Estate\nTech Agent in 2030.",
    rent: "Rent",
    sale: "Sale",
    proptech: "PropTech Agents",
    traditional: "Traditional Agents",
    totalListings: "Total Listings",
    source: "Source: homegate.ch",
    updated: "Updated:",
    download: "Download",
    logout: "Logout",
    autoRefresh: "Data auto-refreshes each time you open this page.",
    hoverForDetails: "Hover over charts for details.",
  },
  DE: {
    headline: "Der führende Immobilien-Tech-Agent im Jahr 2030.",
    rent: "Miete",
    sale: "Kauf",
    proptech: "PropTech-Agenten",
    traditional: "Traditionelle Agenten",
    totalListings: "Gesamtangebote",
    source: "Quelle: homegate.ch",
    updated: "Aktualisiert:",
    download: "Herunterladen",
    logout: "Abmelden",
    autoRefresh: "Daten werden bei jedem Öffnen der Seite automatisch aktualisiert.",
    hoverForDetails: "Für Details über die Diagramme fahren.",
  },
  FR: {
    headline: "Le principal agent immobilier tech en 2030.",
    rent: "Location",
    sale: "Vente",
    proptech: "Agents PropTech",
    traditional: "Agents traditionnels",
    totalListings: "Annonces totales",
    source: "Source : homegate.ch",
    updated: "Mis à jour :",
    download: "Télécharger",
    logout: "Se déconnecter",
    autoRefresh: "Les données sont automatiquement actualisées à chaque ouverture de la page.",
    hoverForDetails: "Survolez les graphiques pour plus de détails.",
  },
  IT: {
    headline: "Il principale agente immobiliare tech nel 2030.",
    rent: "Affitto",
    sale: "Vendita",
    proptech: "Agenti PropTech",
    traditional: "Agenti tradizionali",
    totalListings: "Annunci totali",
    source: "Fonte: homegate.ch",
    updated: "Aggiornato:",
    download: "Scarica",
    logout: "Disconnetti",
    autoRefresh: "I dati vengono aggiornati automaticamente ogni volta che apri questa pagina.",
    hoverForDetails: "Passa il mouse sui grafici per i dettagli.",
  },
};

export default function Home() {
  const [data, setData] = useState<BrokerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<"EN" | "DE" | "FR" | "IT">("EN");
  const chartRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    fetch("/api/broker-data", { method: "GET" })
      .then((res) => res.json())
      .then((d: BrokerData) => {
        setData(d);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const checkWidth = () => setIsDesktop(window.innerWidth >= 1200);
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/login";
  };

  const t = translations[lang];

  // Find the max total listings across both proptech and traditional
  const maxTotal = React.useMemo(() => {
    if (!data || !Array.isArray(data.brokers)) return 1;
    const all = data.brokers;
    return Math.max(...all.map((d) => d.total), 1);
  }, [data]);

  const proptechBrokers = React.useMemo(() => {
    if (!data || !Array.isArray(data.brokers)) return [];
    return data.brokers.filter(b => b.category === "proptech");
  }, [data]);

  const traditionalBrokers = React.useMemo(() => {
    if (!data || !Array.isArray(data.brokers)) return [];
    return data.brokers.filter(b => b.category === "traditional");
  }, [data]);

  // Find the 'properti' broker from proptechBrokers (if present)
  const propertiBroker = proptechBrokers.find(b => b.broker.trim().toLowerCase() === "properti");

  const showNoData = !loading && proptechBrokers.length === 0 && traditionalBrokers.length === 0;

  if (!isDesktop) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-white text-black text-xl font-semibold">
        This is a desktop only app. Please visit on desktop
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <Header
        chartRef={chartRef as React.RefObject<HTMLDivElement>}
        onLogout={handleLogout}
        lang={lang}
        setLang={setLang}
        downloadLabel={t.download}
        logoutLabel={t.logout}
      />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-6xl bg-white rounded-xl shadow p-12 flex flex-col" ref={chartRef}>
          {showNoData ? (
            <div className="text-center py-24 text-lg text-gray-500 font-semibold">
              No data available. Please reload the page to refresh data.
            </div>
          ) : (
            <div className="flex flex-row items-end gap-12 flex-1 min-h-[520px]">
              {/* Left column: logo, title, legend, PropTech Agents */}
              <div className="flex flex-col flex-1 basis-1/2 h-full min-w-0 max-w-full">
                <Image src="/logo.svg" alt="Properti Logo" width={150} height={38} className="mb-6" />
                <HeroSection headline={t.headline.replace(/\n/g, ' ')} rentLabel={t.rent} saleLabel={t.sale} />
                <div className="flex-1 flex flex-col justify-end">
                  {loading ? (
                    <div className="text-center py-12">Loading...</div>
                  ) : (
                    <PropTechBrokers 
                      data={proptechBrokers} 
                      title={t.proptech} 
                      maxTotal={maxTotal} 
                      rentLabel={t.rent} 
                      saleLabel={t.sale} 
                    />
                  )}
                </div>
              </div>
              {/* Right column: Traditional Agents */}
              <div className="flex flex-col flex-1 basis-1/2 h-full min-w-0 max-w-full">
                <div className="flex-1 flex flex-col justify-end">
                  {loading ? (
                    <div className="text-center py-12">Loading...</div>
                  ) : (
                    <TraditionalAgents 
                      data={traditionalBrokers} 
                      title={t.traditional} 
                      maxTotal={maxTotal} 
                      rentLabel={t.rent} 
                      saleLabel={t.sale} 
                      propertiBroker={propertiBroker}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
          {/* Source and updated pills, always left-aligned at the bottom */}
          <div className="mt-8">
            <Footer lastUpdated={data?.updatedOn} source={t.source} updatedLabel={t.updated} lang={lang} />
          </div>
        </div>
        {/* Auto-refresh note moved outside the chart box */}
        <div className="mt-10 text-center text-sm text-gray-500 flex flex-row items-center justify-center gap-4">
          <span>{t.autoRefresh}</span>
          <span>•</span>
          <span>{t.hoverForDetails}</span>
        </div>
      </main>
    </div>
  );
}
