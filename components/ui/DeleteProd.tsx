'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Product } from "@/lib/types"
import { deleteProduct } from "@/app/actions"
import { useState } from "react"

export default function DeleteProd( prop : { product: Product }) {
    const [isOpen, setIsOpen] = useState(false);

    async function deleteProductHandler() {
            try {
                setIsOpen(false);
                await deleteProduct(prop.product.id);
            }catch (error) {
                console.error("Error deleting product:", error);
            }
    }

 
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline">Delete</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Delete Product</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this product? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" onClick={deleteProductHandler}>Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}