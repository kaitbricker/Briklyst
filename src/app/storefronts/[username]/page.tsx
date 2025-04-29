import { Metadata } from "next";
import { StorefrontContent } from "./StorefrontContent";

export const metadata: Metadata = {
  title: "Storefront",
  description: "View products in this storefront",
};

export default function Page({
  params,
}: {
  params: { username: string };
}) {
  return <StorefrontContent username={params.username} />;
}
