import type { Metadata } from "next";
import UTMBuilderClient from "./UTMBuilderClient";

export const metadata: Metadata = {
  title: "UTM Builder",
  description:
    "Free UTM URL generator for marketing campaigns. Create multiple UTM parameters at once with our easy-to-use table interface.",
  keywords: [
    "UTM builder",
    "UTM generator",
    "UTM parameters",
    "Google Analytics",
    "campaign URL builder",
    "marketing analytics",
  ],
  openGraph: {
    title: "UTM Builder - Free UTM Parameter Generator",
    description:
      "Create and manage UTM URLs for your marketing campaigns. Table-based interface for bulk UTM generation.",
  },
};

export default function UTMBuilderPage() {
  return <UTMBuilderClient />;
}
