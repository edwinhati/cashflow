import { DataTable } from "@/features/account/components/data-table";
import { createClient } from "@/features/supabase/lib/server";
import { checkVerification } from "@/features/supabase/hooks";
import { redirect } from "next/navigation";

export default async function AccountsPage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
    return;
  }

  const isVerified = await checkVerification(data.user.id, false, true);
  if (!isVerified) {
    return;
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable />
    </div>
  );
}
