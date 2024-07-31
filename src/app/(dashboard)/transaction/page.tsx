import { columns } from "@/features/transaction/components/data-table/columns";
import { DataTable } from "@/features/transaction/components/data-table/data-table";

export default async function TransactionPage() {
  const transactions = [
    {
      id: "1",
      description: "Payment from client",
      category: "food",
      type: "income",
      amount: 1000,
      currency: "IDR",
    },
    {
      id: "2",
      description: "Payment from client",
      category: "food",
      type: "income",
      amount: 1000,
      currency: "IDR",
    },
    {
      id: "3",
      description: "Payment from client",
      category: "food",
      type: "income",
      amount: 1000,
      currency: "IDR",
    },
    {
      id: "4",
      description: "Payment from client",
      category: "food",
      type: "income",
      amount: 1000,
      currency: "IDR",
    },
    {
      id: "5",
      description: "Payment from client",
      category: "food",
      type: "expense",
      amount: 2000,
      currency: "IDR",
    },
  ];

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <DataTable data={transactions} columns={columns} />
      </div>
    </>
  );
}
