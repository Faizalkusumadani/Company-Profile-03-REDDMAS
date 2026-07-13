import type { ReactNode } from "react";
import "../globals.css";

export default function OfflineLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
