import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, Heart, MapPin, ShoppingCart, Star, Video, Users } from "lucide-react"
import Image from "next/image"

interface ClassProps {
    image: string
    title: string
    instructor: string
    instructorAvatar: string
    price: number
    duration: string
    schedule: string
    location: string
    rating: number
    reviews: number
    spots: number
    totalSpots: number
    isOnline: boolean
}

const ClassImage = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
        <Image src={src} alt={alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <Button size="icon-sm" variant="secondary" className="absolute right-3 top-3 bg-white/90">
            <Heart className="size-4" />
        </Button>
    </div>
)

const OnlineBadge = () => (
    <Badge className="absolute left-3 top-3 gap-1 bg-green-600">
        <Video className="size-3" />
        Online
    </Badge>
)

const InstructorInfo = ({ name, avatar }: { name: string; avatar: string }) => (
    <div className="flex items-center gap-2">
        <div className="relative size-8 overflow-hidden rounded-full">
            <Image src={avatar} alt={name} fill className="object-cover" />
        </div>
        <span className="text-sm text-muted-foreground">{name}</span>
    </div>
)

const ClassTitle = ({ text }: { text: string }) => (
    <h3 className="font-semibold text-foreground">{text}</h3>
)

const ClassRating = ({ rating, reviews }: { rating: number; reviews: number }) => (
    <div className="flex items-center gap-1.5">
        <Star className="size-4 fill-yellow-400 text-yellow-400" />
        <span className="font-medium">{rating.toFixed(1)}</span>
        <span className="text-sm text-muted-foreground">({reviews})</span>
    </div>
)

const ClassDetails = ({ duration, schedule, location }: { duration: string; schedule: string; location: string }) => (
    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
            <Clock className="size-4" />
            {duration}
        </span>
        <span className="flex items-center gap-1.5">
            <Calendar className="size-4" />
            {schedule}
        </span>
        <span className="flex items-center gap-1.5">
            <MapPin className="size-4" />
            {location}
        </span>
    </div>
)

const SpotsAvailable = ({ spots, total }: { spots: number; total: number }) => (
    <div className="flex items-center gap-2 text-sm">
        <Users className="size-4 text-muted-foreground" />
        <span className={spots < 5 ? "text-destructive" : "text-muted-foreground"}>
            {spots} of {total} spots left
        </span>
    </div>
)

const PriceTag = ({ amount }: { amount: number }) => (
    <span className="text-xl font-bold text-foreground">${amount}</span>
)

const EnrollButton = ({ label, disabled }: { label: string; disabled: boolean }) => (
    <Button className="gap-2" disabled={disabled}>
        <Calendar className="size-4" />
        {label}
    </Button>
)

export default function Main() {
    const classItem: ClassProps = {
        image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=340&fit=crop",
        title: "Advanced Yoga & Meditation",
        instructor: "Emma Williams",
        instructorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
        price: 45,
        duration: "90 min",
        schedule: "Mon, Wed, Fri",
        location: "Online",
        rating: 4.9,
        reviews: 456,
        spots: 3,
        totalSpots: 20,
        isOnline: true,
    }

    return (
        <section className="@container">
            <div className="mx-auto max-w-sm px-4 py-8">
                <Card className="group overflow-hidden">
                    <div className="relative">
                        <ClassImage src={classItem.image} alt={classItem.title} />
                        {classItem.isOnline && <OnlineBadge />}
                    </div>
                    <div className="space-y-3 p-4">
                        <div className="flex items-center justify-between">
                            <InstructorInfo name={classItem.instructor} avatar={classItem.instructorAvatar} />
                            <ClassRating rating={classItem.rating} reviews={classItem.reviews} />
                        </div>
                        <ClassTitle text={classItem.title} />
                        <ClassDetails 
                            duration={classItem.duration} 
                            schedule={classItem.schedule} 
                            location={classItem.location} 
                        />
                        <SpotsAvailable spots={classItem.spots} total={classItem.totalSpots} />
                        <Separator />
                        <div className="flex items-center justify-between">
                            <PriceTag amount={classItem.price} />
                            <EnrollButton label="Enroll" disabled={classItem.spots === 0} />
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    )
}
