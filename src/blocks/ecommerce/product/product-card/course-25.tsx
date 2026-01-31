import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Clock, Heart, Play, Star, User } from "lucide-react"
import Image from "next/image"

interface CourseProps {
    thumbnail: string
    title: string
    instructor: string
    rating: number
    students: number
    duration: string
    lessons: number
    price: number
    originalPrice: number
    bestseller: boolean
}

const CourseThumbnail = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
        <Image src={src} alt={alt} fill className="object-cover" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
            <div className="rounded-full bg-white/90 p-4 shadow-xl">
                <Play className="size-8 fill-primary text-primary" />
            </div>
        </div>
        <Button size="icon-sm" variant="secondary" className="absolute right-3 top-3 bg-white/90">
            <Heart className="size-4" />
        </Button>
    </div>
)

const BestsellerBadge = () => (
    <Badge className="bg-yellow-500 text-yellow-950">Bestseller</Badge>
)

const CourseTitle = ({ text }: { text: string }) => (
    <h3 className="line-clamp-2 font-semibold text-foreground group-hover:text-primary transition-colors">{text}</h3>
)

const InstructorName = ({ name }: { name: string }) => (
    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <User className="size-4" />
        {name}
    </div>
)

const CourseStats = ({ rating, students }: { rating: number; students: number }) => (
    <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
            <Star className="size-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
        </div>
        <span className="text-sm text-muted-foreground">({students.toLocaleString()} students)</span>
    </div>
)

const CourseMeta = ({ duration, lessons }: { duration: string; lessons: number }) => (
    <div className="flex gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
            <Clock className="size-3" />
            {duration}
        </span>
        <span>{lessons} lessons</span>
    </div>
)

const PriceDisplay = ({ price, originalPrice }: { price: number; originalPrice: number }) => (
    <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-foreground">${price.toFixed(2)}</span>
        <span className="text-sm text-muted-foreground line-through">${originalPrice.toFixed(2)}</span>
    </div>
)

const EnrollButton = ({ label }: { label: string }) => (
    <Button className="w-full">{label}</Button>
)

export default function Main() {
    const course: CourseProps = {
        thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=340&fit=crop",
        title: "Complete Machine Learning & Data Science Bootcamp",
        instructor: "Dr. Sarah Chen",
        rating: 4.8,
        students: 45320,
        duration: "42 hours",
        lessons: 320,
        price: 12.99,
        originalPrice: 94.99,
        bestseller: true,
    }

    return (
        <section className="@container">
            <div className="mx-auto max-w-sm px-4 py-8">
                <Card className="group cursor-pointer overflow-hidden">
                    <CourseThumbnail src={course.thumbnail} alt={course.title} />
                    <div className="space-y-3 p-4">
                        {course.bestseller && <BestsellerBadge />}
                        <CourseTitle text={course.title} />
                        <InstructorName name={course.instructor} />
                        <CourseStats rating={course.rating} students={course.students} />
                        <CourseMeta duration={course.duration} lessons={course.lessons} />
                        <Separator />
                        <div className="flex items-center justify-between">
                            <PriceDisplay price={course.price} originalPrice={course.originalPrice} />
                        </div>
                        <EnrollButton label="Enroll Now" />
                    </div>
                </Card>
            </div>
        </section>
    )
}
