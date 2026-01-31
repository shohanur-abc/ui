import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ExternalLink, Heart, Layers, Star, Wallet, Image as ImageIcon, Verified } from "lucide-react"
import Image from "next/image"

interface NFTProps {
    image: string
    name: string
    collection: string
    creator: string
    creatorVerified: boolean
    price: number
    currency: string
    lastSale: number
    edition: string
    likes: number
    views: number
}

const NFTImage = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/20">
        <Image src={src} alt={alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
    </div>
)

const CollectionBadge = ({ text }: { text: string }) => (
    <Badge className="absolute left-3 top-3 gap-1 bg-black/60 backdrop-blur-sm">
        <Layers className="size-3" />
        {text}
    </Badge>
)

const LikeButton = ({ likes }: { likes: number }) => (
    <Button size="sm" variant="ghost" className="absolute right-3 top-3 gap-1 bg-black/60 text-white backdrop-blur-sm hover:bg-black/80">
        <Heart className="size-4" />
        {likes}
    </Button>
)

const CreatorInfo = ({ name, verified }: { name: string; verified: boolean }) => (
    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <span>by</span>
        <span className="font-medium text-foreground">{name}</span>
        {verified && <Verified className="size-4 fill-blue-500 text-white" />}
    </div>
)

const NFTName = ({ text }: { text: string }) => (
    <h3 className="font-semibold text-foreground">{text}</h3>
)

const EditionInfo = ({ edition }: { edition: string }) => (
    <Badge variant="outline" className="gap-1 text-xs">
        <ImageIcon className="size-3" />
        {edition}
    </Badge>
)

const PriceDisplay = ({ price, currency, lastSale }: { price: number; currency: string; lastSale: number }) => (
    <div className="space-y-1">
        <p className="text-xs text-muted-foreground">Current Price</p>
        <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-foreground">{price} {currency}</span>
            <span className="text-xs text-muted-foreground">(${(price * 3200).toLocaleString()})</span>
        </div>
        <p className="text-xs text-muted-foreground">Last sold: {lastSale} {currency}</p>
    </div>
)

const ActionButtons = () => (
    <div className="grid grid-cols-2 gap-2">
        <Button className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <Wallet className="size-4" />
            Buy Now
        </Button>
        <Button variant="outline" className="gap-2">
            <ExternalLink className="size-4" />
            View
        </Button>
    </div>
)

export default function Main() {
    const nft: NFTProps = {
        image: "https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=400&h=400&fit=crop",
        name: "Cosmic Dreamer #0042",
        collection: "Cosmic Dreams",
        creator: "DigitalArtist",
        creatorVerified: true,
        price: 2.5,
        currency: "ETH",
        lastSale: 1.8,
        edition: "1 of 1",
        likes: 342,
        views: 1234,
    }

    return (
        <section className="@container">
            <div className="mx-auto max-w-xs px-4 py-8">
                <Card className="group overflow-hidden border-purple-500/20 bg-gradient-to-b from-purple-950/20 to-background">
                    <div className="relative p-3">
                        <NFTImage src={nft.image} alt={nft.name} />
                        <CollectionBadge text={nft.collection} />
                        <LikeButton likes={nft.likes} />
                    </div>
                    <div className="space-y-3 p-4 pt-0">
                        <div className="flex items-center justify-between">
                            <CreatorInfo name={nft.creator} verified={nft.creatorVerified} />
                            <EditionInfo edition={nft.edition} />
                        </div>
                        <NFTName text={nft.name} />
                        <Separator />
                        <PriceDisplay price={nft.price} currency={nft.currency} lastSale={nft.lastSale} />
                        <ActionButtons />
                    </div>
                </Card>
            </div>
        </section>
    )
}
