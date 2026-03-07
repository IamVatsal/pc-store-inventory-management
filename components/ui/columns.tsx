"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button"
import UpdateProd  from "@/components/ui/UpdateProd"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "brand",
        header: "Brand",
    },
    {
        accessorKey: "price",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                 >
                Price
                <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const price: number = row.getValue("price");
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(price);
            return <div className="font-medium text-center">{formatted}</div>
        },
    },
    {
        accessorKey: "quantity",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                 >
                Quantity
                <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) =>{
            const quantity: number = row.getValue("quantity");
            return <div className="text-center">{quantity}</div>
        },
    },
    {
        accessorKey: "category",
        header: "Category",
    },
    {
        header: " ",
        cell: ({row}) => {
            return (
                <UpdateProd product={row.original}/>
            )
        },
    }
]