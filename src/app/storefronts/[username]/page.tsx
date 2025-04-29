import { Metadata } from "next";
import { StorefrontContent } from "./StorefrontContent";

export const metadata: Metadata = {
  title: "Storefront",
  description: "View products in this storefront",
};

type Props = {
  params: { username: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Page({ params }: Props) {
  return <StorefrontContent username={params.username} />;
}
