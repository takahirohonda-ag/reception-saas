import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reception",
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

export default function ReceptionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
