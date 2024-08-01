import { columns } from "@/features/account/components/columns";
import type { Account } from "@/features/account/types/account";
import { DataTable } from "@/features/account/components/data-table";

async function getData(): Promise<Account[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      name: "Bank of America",
      currency: {
        name: "USD",
        locales: "en-US",
      },
      balance: 1000,
    },
    {
      id: "2",
      name: "Barclays",
      currency: {
        name: "GBP",
        locales: "en-UK",
      },
      balance: 2000,
    },
    {
      id: "3",
      name: "Deutsche Bank",
      currency: {
        name: "EUR",
        locales: "de-DE",
      },
      balance: 3000,
    },
    {
      id: "4",
      name: "HSBC",
      currency: {
        name: "HKD",
        locales: "zh-HK",
      },
      balance: 4000,
    },
    {
      id: "5",
      name: "Bank BCA",
      currency: {
        name: "IDR",
        locales: "id-ID",
      },
      balance: 5000,
    },
  ];
}

export default async function AccountsPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
