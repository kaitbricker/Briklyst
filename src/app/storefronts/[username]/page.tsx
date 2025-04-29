import { Metadata } from "next";
import { StorefrontContent } from "./StorefrontContent";

export const metadata: Metadata = {
  title: "Storefront",
  description: "View products in this storefront",
};

type Props = {
  params: Promise<{ username: string }>;
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  return <StorefrontContent username={resolvedParams.username} />;
}
