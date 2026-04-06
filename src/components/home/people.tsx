"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { LuLoader2 } from "react-icons/lu";
import { useListHosts } from "~/hooks/useApi";
import {
  POPULAR_CITIES,
  calculateDistance,
  getSavedLocation,
  type CityLocation,
} from "../LocationModal";

interface PeopleCardProps {
  id: string;
  name: string;
  imageUrl: string;
  rating: string;
  isVerified?: boolean;
}

const PeopleCard = ({ id, name, imageUrl, rating, isVerified }: PeopleCardProps) => {
  return (
    <Link
      href={`/host/${id}`}
      className="shrink-0 snap-start overflow-hidden rounded-3xl border border-[#aeddf89e] bg-white shadow-[0_14px_32px_rgba(77,140,190,0.08)] transition hover:-translate-y-1"
    >
      <div className="relative h-56 w-[236px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageUrl || "/assets/home/people1.png"} alt={name} className="h-full w-full object-cover" />
        {isVerified ? (
          <span className="absolute bottom-3 right-3 rounded-full bg-[#0094CA] p-1.5 text-white">
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        ) : null}
      </div>
      <div className="space-y-1 p-4">
        <p className="line-clamp-1 text-base font-bold text-[#16304c]">{name}</p>
        <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#4b94c8]">Local Host</p>
        <p className="text-xs text-[#6f8daa]">Verified community-driven experiences</p>
        <div className="pt-1 text-xs font-bold text-[#5e88ab]">Rating {rating}</div>
      </div>
    </Link>
  );
};

const People = ({ currentHostId }: { currentHostId?: string | null }) => {
  const [location, setLocation] = useState<CityLocation | null>(null);
  const [mounted, setMounted] = useState(false);
  const { data: hosts, isLoading } = useListHosts();

  useEffect(() => {
    setLocation(getSavedLocation());
    setMounted(true);

    const handleStorageChange = () => {
      setLocation(getSavedLocation());
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const filteredHosts = useMemo(() => {
    if (!hosts) return [];

    const hostsWithoutCurrentHost = currentHostId
      ? hosts.filter((host) => host.id !== currentHostId)
      : hosts;

    if (!mounted || !location) {
      return hostsWithoutCurrentHost.slice(0, 8);
    }

    return hostsWithoutCurrentHost
      .map((host) => {
        const hostCity = POPULAR_CITIES.find(
          (city) => city.city.toLowerCase() === host.city.toLowerCase(),
        );

        const distance = hostCity
          ? calculateDistance(location.lat, location.lng, hostCity.lat, hostCity.lng)
          : Number.POSITIVE_INFINITY;

        return { host, distance };
      })
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 8)
      .map(({ host }) => host);
  }, [hosts, location, mounted, currentHostId]);

  return (
    <section className="w-full site-x">
      <div className="mx-auto w-full max-w-[1120px]">
        <div className="mb-4 flex items-end justify-between gap-4">
          <h2 className="font-[Outfit,sans-serif] text-3xl font-bold tracking-[-0.04em] text-[#16304c] sm:text-4xl">
            Interesting People Near You
          </h2>
          <Link href="/hosts" className="text-sm font-extrabold text-[#0e8ae0] hover:text-[#0b6eb1]">
            View All
          </Link>
        </div>

        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 hide-scrollbar">
          {isLoading ? (
            <div className="flex w-full items-center justify-center py-12">
              <LuLoader2 className="h-8 w-8 animate-spin text-[#0094CA]" />
            </div>
          ) : filteredHosts.length === 0 ? (
            <div className="flex w-full items-center justify-center rounded-3xl border border-dashed border-sky-200 bg-white/80 py-12 text-sm text-[#6f8daa]">
              No hosts found in your area.
            </div>
          ) : (
            filteredHosts.map((host) => (
              <PeopleCard
                key={host.id}
                id={host.id}
                name={host.first_name}
                imageUrl={host.avatar_url ?? "/assets/home/people1.png"}
                rating={(host.avg_rating ?? 4.5).toFixed(1)}
                isVerified={host.is_identity_verified}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default People;
