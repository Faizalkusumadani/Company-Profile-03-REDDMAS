export type JobType = "Full-time" | "Part-time" | "Kontrak" | "Magang";

export interface Job {
  slug: string;
  location: string;
  type: JobType;
  postedDate: string;
  deadline: string;
}

export const jobs: Job[] = [
  {
    slug: "svp-accounting",
    location: "Jakarta Barat, Indonesia",
    type: "Full-time",
    postedDate: "2026-05-21",
    deadline: "2026-08-31",
  },
  {
    slug: "sales-retail",
    location: "Jakarta Barat, Tangerang & Kota Serang",
    type: "Full-time",
    postedDate: "2026-06-25",
    deadline: "2026-07-25",
  },
  {
    slug: "sales-project",
    location: "Jakarta Barat, Tangerang & Kota Serang",
    type: "Full-time",
    postedDate: "2026-06-25",
    deadline: "2026-07-25",
  },
];

// --- Helpers ---

export function getAllJobs(): Job[] {
  return [...jobs].sort(
    (a, b) =>
      new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime(),
  );
}

export function getJobBySlug(slug: string): Job | undefined {
  return jobs.find((job) => job.slug === slug);
}

export function getAllJobSlugs(): string[] {
  return jobs.map((job) => job.slug);
}

export function isJobOpen(job: Job): boolean {
  return new Date(job.deadline) >= new Date();
}

export function formatIndonesianDate(
  dateString: string,
  locale: string = "id",
): string {
  return new Date(dateString).toLocaleDateString(
    locale === "id" ? "id-ID" : "en-US",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  );
}
