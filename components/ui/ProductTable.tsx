import { columns } from "./columns"
import { DataTable } from "./data-table"
import { Product } from "@/lib/types"
import prisma from "@/lib/prisma"

async function getData(): Promise<Product[]> {
  // Fetch data from your API here.
  const data : Product[] = await prisma.product.findMany()
  return data;
}

export default async function DemoPage() {
  const data = await getData()
 
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}