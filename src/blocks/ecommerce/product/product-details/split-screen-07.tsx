import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Star, ShoppingCart, Heart, Play, Users, Clock, Globe, type LucideIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface VideoPreviewProps {
  thumbnail: string
  duration: string
}

interface CourseTagsProps {
  tags: { text: string; variant?: "default" | "secondary" | "outline" }[]
}

interface CourseTitleProps {
  title: string
  subtitle: string
}

interface InstructorProps {
  avatar: string
  name: string
  title: string
  initials: string
}

interface CourseStatsProps {
  items: { icon: LucideIcon; value: string; label: string }[]
}

interface RatingDetailProps {
  rating: number
  reviews: number
  students: string
}

interface PriceCardProps {
  price: string
  originalPrice: string
  discount: string
}

interface ModuleListProps {
  modules: { title: string; lessons: number; duration: string }[]
}

interface EnrollButtonsProps {
  primary: { label: string; href: string }
  secondary: { label: string; href: string; icon: LucideIcon }
}

const VideoPreview = ({ thumbnail, duration }: VideoPreviewProps) => (
  <div className="group relative aspect-video overflow-hidden rounded-xl bg-muted">
    <Image src={thumbnail} alt="Course preview" fill className="object-cover" />
    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
      <button className="p-4 rounded-full bg-primary/90 text-primary-foreground hover:bg-primary transition-transform hover:scale-110">
        <Play className="size-8 fill-current" />
      </button>
    </div>
    <Badge className="absolute bottom-3 right-3 bg-black/70">{duration}</Badge>
  </div>
)

const CourseTags = ({ tags }: CourseTagsProps) => (
  <div className="flex flex-wrap gap-2">
    {tags.map((tag, i) => (
      <Badge key={i} variant={tag.variant || "secondary"}>{tag.text}</Badge>
    ))}
  </div>
)

const CourseTitle = ({ title, subtitle }: CourseTitleProps) => (
  <div className="space-y-2">
    <h1 className="text-2xl @sm:text-3xl @lg:text-4xl font-bold tracking-tight leading-tight">{title}</h1>
    <p className="text-muted-foreground text-lg">{subtitle}</p>
  </div>
)

const Instructor = ({ avatar, name, title, initials }: InstructorProps) => (
  <div className="flex items-center gap-3">
    <Avatar className="size-12">
      <AvatarImage src={avatar} alt={name} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
    <div>
      <p className="font-medium">{name}</p>
      <p className="text-sm text-muted-foreground">{title}</p>
    </div>
  </div>
)

const CourseStats = ({ items }: CourseStatsProps) => (
  <div className="flex flex-wrap gap-6">
    {items.map((item, i) => (
      <div key={i} className="flex items-center gap-2">
        <item.icon className="size-5 text-primary" />
        <div>
          <p className="font-medium">{item.value}</p>
          <p className="text-xs text-muted-foreground">{item.label}</p>
        </div>
      </div>
    ))}
  </div>
)

const RatingDetail = ({ rating, reviews, students }: RatingDetailProps) => (
  <div className="flex flex-wrap items-center gap-4">
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`size-5 ${i < rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"}`} />
      ))}
    </div>
    <span className="font-bold">{rating.toFixed(1)}</span>
    <span className="text-muted-foreground">({reviews.toLocaleString()} reviews)</span>
    <Separator orientation="vertical" className="h-5" />
    <span className="text-muted-foreground">{students} students enrolled</span>
  </div>
)

const PriceCard = ({ price, originalPrice, discount }: PriceCardProps) => (
  <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
    <CardContent className="p-4 flex items-center justify-between">
      <div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold">{price}</span>
          <span className="text-lg text-muted-foreground line-through">{originalPrice}</span>
        </div>
        <p className="text-sm text-primary font-medium">{discount}</p>
      </div>
      <Badge variant="destructive">Limited Offer</Badge>
    </CardContent>
  </Card>
)

const ModuleList = ({ modules }: ModuleListProps) => (
  <div className="space-y-3">
    <h3 className="font-semibold">Course Content</h3>
    <div className="space-y-2">
      {modules.map((module, i) => (
        <div key={i} className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/30">
          <div className="flex items-center gap-3">
            <span className="size-6 rounded-full bg-primary/20 text-primary text-xs font-medium flex items-center justify-center">
              {i + 1}
            </span>
            <span className="text-sm">{module.title}</span>
          </div>
          <div className="text-xs text-muted-foreground">
            {module.lessons} lessons • {module.duration}
          </div>
        </div>
      ))}
    </div>
  </div>
)

const EnrollButtons = ({ primary, secondary }: EnrollButtonsProps) => (
  <div className="grid @sm:grid-cols-2 gap-3">
    <Button size="lg" className="w-full" asChild>
      <Link href={primary.href}>{primary.label}</Link>
    </Button>
    <Button size="lg" variant="outline" className="w-full gap-2" asChild>
      <Link href={secondary.href}>
        <secondary.icon className="size-4" />
        {secondary.label}
      </Link>
    </Button>
  </div>
)

export default function Main() {
  return (
    <section className="@container relative overflow-hidden" data-theme="neon">
      <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
        <div className="grid @lg:grid-cols-[1.2fr_1fr] gap-8 @xl:gap-12">
          {/* Media Side */}
          <div className="space-y-6">
            <VideoPreview
              thumbnail="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800"
              duration="24 hours"
            />
            
            <CourseStats
              items={[
                { icon: Clock, value: "24h", label: "Total duration" },
                { icon: Users, value: "45K+", label: "Students" },
                { icon: Globe, value: "12", label: "Languages" },
              ]}
            />
          </div>

          {/* Content Side */}
          <div className="flex flex-col gap-5">
            <CourseTags
              tags={[
                { text: "Bestseller", variant: "default" },
                { text: "Updated 2026" },
                { text: "Certificate" },
              ]}
            />

            <CourseTitle
              title="Complete Full-Stack Web Development Bootcamp"
              subtitle="Master React, Node.js, MongoDB, and modern deployment with hands-on projects"
            />

            <Instructor
              avatar="https://avatars.githubusercontent.com/u/252440198?v=4"
              name="Sarah Chen"
              title="Senior Software Engineer at Google"
              initials="SC"
            />

            <RatingDetail rating={4.8} reviews={12847} students="185K+" />

            <PriceCard price="$49.99" originalPrice="$199.99" discount="75% off - 2 days left!" />

            <Separator />

            <ModuleList
              modules={[
                { title: "Getting Started with Web Dev", lessons: 8, duration: "2h 30m" },
                { title: "HTML & CSS Fundamentals", lessons: 12, duration: "4h 15m" },
                { title: "JavaScript Deep Dive", lessons: 18, duration: "6h 45m" },
                { title: "React & Modern Frameworks", lessons: 15, duration: "5h 30m" },
              ]}
            />

            <EnrollButtons
              primary={{ label: "Enroll Now", href: "#checkout" }}
              secondary={{ label: "Add to Wishlist", href: "#wishlist", icon: Heart }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
