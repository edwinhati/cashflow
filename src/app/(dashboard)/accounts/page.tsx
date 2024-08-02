import { columns } from "@/features/account/components/columns";
import { DataTable } from "@/features/account/components/data-table";

export default async function AccountsPage() {
  return (
    <div className="container mx-auto py-10">
      <DataTable />
    </div>
  );
}
