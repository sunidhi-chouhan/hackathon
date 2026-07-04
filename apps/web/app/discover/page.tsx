import { redirect } from "next/navigation";

/** Legacy route — journey results now live on /plan with session restore. */
export default function DiscoverPage() {
  redirect("/plan");
}
