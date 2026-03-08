"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button"
import UpdateProd  from "@/components/ui/UpdateProd"
import DeleteProd from "@/components/ui/DeleteProd"
import DetailProd from "@/components/ui/DetailProd"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Product>[] = [
    // {
    //     accessorKey: "id",
    //     header: "ID",
    // },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            return (
                <DetailProd product={row.original}/>
            )
        }
    },
    {
        accessorKey: "brand",
        header: "Brand",
    },
    {
        accessorKey: "category",
        header: "Category",
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
        header: "Edit",
        cell: ({row}) => {
            return (
                <UpdateProd product={row.original}/>
            )
        },
    },
    {
        header: "Delete",
        cell: ({row}) => {
            return (
                <DeleteProd product={row.original}/>
            )
        },
    }
]