import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Minus, Plus, Trash2 } from "lucide-react"
import Image from "next/image"

interface CartItemProps {
    image: string
    name: string
    variant: string
    price: number
    quantity: number
    inStock: boolean
}

const ItemImage = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative size-24 shrink-0 overflow-hidden rounded-lg bg-muted @sm:size-28">
        <Image src={src} alt={alt} fill className="object-cover" />
    </div>
)

const ItemDetails = ({ name, variant, inStock }: { name: string; variant: string; inStock: boolean }) => (
    <div className="min-w-0 flex-1 space-y-1">
        <h3 className="truncate font-medium text-foreground">{name}</h3>
        <p className="text-sm text-muted-foreground">{variant}</p>
        <Badge variant={inStock ? "secondary" : "destructive"} className="text-xs">
            {inStock ? "In Stock" : "Low Stock"}
        </Badge>
    </div>
)

const QuantityControls = ({ quantity }: { quantity: number }) => (
    <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 p-1">
        <Button size="icon-sm" variant="ghost" className="size-7">
            <Minus className="size-3" />
        </Button>
        <span className="w-8 text-center text-sm font-medium">{quantity}</span>
        <Button size="icon-sm" variant="ghost" className="size-7">
            <Plus className="size-3" />
        </Button>
    </div>
)

const ItemPrice = ({ amount }: { amount: number }) => (
    <span className="text-lg font-bold text-primary">${amount.toFixed(2)}</span>
)

const RemoveButton = () => (
    <Button size="icon-sm" variant="ghost" className="text-muted-foreground hover:text-destructive">
        <Trash2 className="size-4" />
    </Button>
)

export default function Main() {
    const item: CartItemProps = {
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop",
        name: "Air Max Premium Sneakers",
        variant: "Size: 10 / Color: Red",
        price: 189.99,
        quantity: 2,
        inStock: true,
    }

    return (
        <section className="@container">
            <div className="mx-auto max-w-lg px-4 py-8">
                <Card className="flex gap-4 p-4 @sm:gap-6 @sm:p-6">
                    <ItemImage src={item.image} alt={item.name} />
                    <div className="flex min-w-0 flex-1 flex-col gap-3">
                        <div className="flex items-start justify-between gap-2">
                            <ItemDetails name={item.name} variant={item.variant} inStock={item.inStock} />
                            <RemoveButton />
                        </div>
                        <div className="flex items-center justify-between">
                            <QuantityControls quantity={item.quantity} />
                            <ItemPrice amount={item.price * item.quantity} />
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    )
}
