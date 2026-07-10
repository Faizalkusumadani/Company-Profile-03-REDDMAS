import Link from "next/link";
import { MapPin, Briefcase, Clock } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Job, formatIndonesianDate, isJobOpen } from "@/data/data-karir";

interface JobCardProps {
  job: Job;
  locale: string;
}

export default async function JobCard({ job, locale }: JobCardProps) {
  const t = await getTranslations();
  const open = isJobOpen(job);

  const title = t(`karir.jobs.${job.slug}.title`);
  const department = t(`karir.jobs.${job.slug}.department`);

  return (
    <Link
      href={`/${locale}/karir/${job.slug}`}
      className="group block rounded-xl border-2 border-gray-200 p-6 transition-all hover:border-reddmas-red hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-reddmas-red transition-colors">
            {title}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{department}</p>
        </div>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
            open ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"
          }`}
        >
          {open ? t("karir.badge_open") : t("karir.badge_closed")}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-600">
        <span className="flex items-center gap-1.5">
          <MapPin className="h-4 w-4" />
          {job.location}
        </span>
        <span className="flex items-center gap-1.5">
          <Briefcase className="h-4 w-4" />
          {job.type}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          {formatIndonesianDate(job.postedDate, locale)}
        </span>
      </div>
    </Link>
  );
}
