import { listSchools } from "@/lib/schools";
import { SchoolManager } from "./school-manager";
import { requireAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminSchoolsPage() {
  await requireAdminSession();
  const schools = await listSchools();

  return <SchoolManager schools={schools} />;
}
