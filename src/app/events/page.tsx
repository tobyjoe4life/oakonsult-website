import { EditorialDetailPage } from "@/components/EditorialDetailPage";
import { editorialPages } from "@/lib/editorial-pages";

export default function Page() {
  return <EditorialDetailPage data={editorialPages.events} />;
}
