import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Bookmark, ChefHat, Clock, Flame, ShoppingCart, Users } from "lucide-react"
import Image from "next/image"

interface MealKitProps {
    image: string
    name: string
    cuisine: string
    prepTime: string
    difficulty: string
    servings: number
    calories: number
    price: number
    ingredients: number
}

const MealImage = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-[16/10] overflow-hidden rounded-t-xl bg-muted">
        <Image src={src} alt={alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <Button size="icon-sm" variant="secondary" className="absolute right-3 top-3">
            <Bookmark className="size-4" />
        </Button>
    </div>
)

const CuisineBadge = ({ text }: { text: string }) => (
    <Badge variant="secondary">{text}</Badge>
)

const MealTitle = ({ text }: { text: string }) => (
    <h3 className="font-semibold text-foreground">{text}</h3>
)

const MealStats = ({ prepTime, difficulty, servings }: { prepTime: string; difficulty: string; servings: number }) => (
    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
            <Clock className="size-4" />
            {prepTime}
        </span>
        <span className="flex items-center gap-1">
            <ChefHat className="size-4" />
            {difficulty}
        </span>
        <span className="flex items-center gap-1">
            <Users className="size-4" />
            {servings} servings
        </span>
    </div>
)

const NutritionInfo = ({ calories, ingredients }: { calories: number; ingredients: number }) => (
    <div className="flex gap-4 text-xs">
        <span className="flex items-center gap-1 text-orange-500">
            <Flame className="size-3" />
            {calories} cal/serving
        </span>
        <span className="text-muted-foreground">{ingredients} ingredients</span>
    </div>
)

const PricePerServing = ({ price, servings }: { price: number; servings: number }) => (
    <div className="space-y-0.5">
        <span className="text-xl font-bold text-foreground">${price.toFixed(2)}</span>
        <p className="text-xs text-muted-foreground">${(price / servings).toFixed(2)}/serving</p>
    </div>
)

const OrderButton = ({ label }: { label: string }) => (
    <Button className="gap-2">
        <ShoppingCart className="size-4" />
        {label}
    </Button>
)

export default function Main() {
    const mealKit: MealKitProps = {
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=375&fit=crop",
        name: "Mediterranean Salmon Bowl",
        cuisine: "Mediterranean",
        prepTime: "25 min",
        difficulty: "Easy",
        servings: 2,
        calories: 520,
        price: 24.99,
        ingredients: 12,
    }

    return (
        <section className="@container">
            <div className="mx-auto max-w-sm px-4 py-8">
                <Card className="group overflow-hidden">
                    <MealImage src={mealKit.image} alt={mealKit.name} />
                    <div className="space-y-3 p-4">
                        <div className="flex items-center justify-between">
                            <CuisineBadge text={mealKit.cuisine} />
                            <NutritionInfo calories={mealKit.calories} ingredients={mealKit.ingredients} />
                        </div>
                        <MealTitle text={mealKit.name} />
                        <MealStats prepTime={mealKit.prepTime} difficulty={mealKit.difficulty} servings={mealKit.servings} />
                        <Separator />
                        <div className="flex items-center justify-between">
                            <PricePerServing price={mealKit.price} servings={mealKit.servings} />
                            <OrderButton label="Order" />
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    )
}
