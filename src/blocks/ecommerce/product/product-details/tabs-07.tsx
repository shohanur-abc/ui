'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
	Star,
	ShoppingCart,
	Heart,
	Play,
	BookOpen,
	Clock,
	Users,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface CourseThumbnailProps {
	src: string;
	alt: string;
	duration: string;
}

interface CourseTitleProps {
	category: string;
	name: string;
	tagline: string;
}

interface InstructorProps {
	name: string;
	avatar: string;
	initials: string;
	title: string;
	students: number;
}

interface RatingProps {
	rating: number;
	reviews: number;
	students: number;
}

interface PriceProps {
	current: string;
	original?: string;
}

interface CurriculumProps {
	sections: { title: string; lessons: number; duration: string }[];
}

interface OutcomesProps {
	items: string[];
}

interface RequirementsProps {
	items: string[];
}

interface ActionsProps {
	buttons: {
		label: string;
		href: string;
		icon?: LucideIcon;
		variant?: 'default' | 'outline';
	}[];
}

const CourseThumbnail = ({ src, alt, duration }: CourseThumbnailProps) => (
	<div className="relative aspect-video overflow-hidden rounded-2xl bg-muted group">
		<Image src={src} alt={alt} fill className="object-cover" />
		<div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
			<div className="size-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
				<Play className="size-8 text-white fill-white" />
			</div>
		</div>
		<Badge className="absolute bottom-4 right-4">{duration}</Badge>
	</div>
);

const CourseTitle = ({ category, name, tagline }: CourseTitleProps) => (
	<div className="space-y-1">
		<Badge variant="secondary">{category}</Badge>
		<h1 className="text-2xl @sm:text-3xl font-bold tracking-tight">{name}</h1>
		<p className="text-muted-foreground">{tagline}</p>
	</div>
);

const Instructor = ({
	name,
	avatar,
	initials,
	title,
	students,
}: InstructorProps) => (
	<div className="flex items-center gap-3">
		<Avatar className="size-12">
			<AvatarImage src={avatar} alt={name} />
			<AvatarFallback>{initials}</AvatarFallback>
		</Avatar>
		<div>
			<p className="font-medium">{name}</p>
			<p className="text-sm text-muted-foreground">
				{title} • {students.toLocaleString()} students
			</p>
		</div>
	</div>
);

const Rating = ({ rating, reviews, students }: RatingProps) => (
	<div className="flex flex-wrap items-center gap-4">
		<div className="flex items-center gap-2">
			<div className="flex">
				{Array.from({ length: 5 }).map((_, i) => (
					<Star
						key={i}
						className={`size-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-muted text-muted'}`}
					/>
				))}
			</div>
			<span className="font-medium">{rating}</span>
			<span className="text-sm text-muted-foreground">
				({reviews.toLocaleString()} reviews)
			</span>
		</div>
		<div className="flex items-center gap-2 text-sm text-muted-foreground">
			<Users className="size-4" />
			<span>{students.toLocaleString()} enrolled</span>
		</div>
	</div>
);

const Price = ({ current, original }: PriceProps) => (
	<div className="flex items-baseline gap-3">
		<span className="text-3xl font-bold text-primary">{current}</span>
		{original && (
			<span className="text-lg text-muted-foreground line-through">
				{original}
			</span>
		)}
	</div>
);

const Curriculum = ({ sections }: CurriculumProps) => (
	<div className="space-y-2">
		{sections.map((section, i) => (
			<Card key={i} className="bg-muted/30 border-muted">
				<CardContent className="p-4 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
							{i + 1}
						</div>
						<div>
							<p className="font-medium text-sm">{section.title}</p>
							<p className="text-xs text-muted-foreground">
								{section.lessons} lessons
							</p>
						</div>
					</div>
					<div className="flex items-center gap-1 text-sm text-muted-foreground">
						<Clock className="size-3" />
						{section.duration}
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);

const Outcomes = ({ items }: OutcomesProps) => (
	<ul className="grid gap-2">
		{items.map((item, i) => (
			<li key={i} className="flex items-start gap-2 text-sm">
				<span className="size-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
					<span className="size-2 rounded-full bg-green-500" />
				</span>
				{item}
			</li>
		))}
	</ul>
);

const Requirements = ({ items }: RequirementsProps) => (
	<ul className="grid gap-2">
		{items.map((item, i) => (
			<li key={i} className="flex items-start gap-2 text-sm">
				<BookOpen className="size-4 text-muted-foreground flex-shrink-0 mt-0.5" />
				{item}
			</li>
		))}
	</ul>
);

const Actions = ({ buttons }: ActionsProps) => (
	<div className="flex gap-3">
		{buttons.map((btn, i) => (
			<Button
				key={i}
				variant={btn.variant || 'default'}
				size="lg"
				className={`gap-2 ${i === 0 ? 'flex-1' : ''}`}
				asChild
			>
				<Link href={btn.href}>
					{btn.icon && <btn.icon className="size-4" />}
					{btn.label}
				</Link>
			</Button>
		))}
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="grid @lg:grid-cols-2 gap-8 @xl:gap-12">
					{/* Thumbnail */}
					<CourseThumbnail
						src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800"
						alt="Course preview"
						duration="24h 30m"
					/>

					{/* Content */}
					<div className="flex flex-col gap-5">
						<CourseTitle
							category="Web Development"
							name="Complete Full-Stack JavaScript Mastery"
							tagline="From zero to deployment - build real-world applications"
						/>

						<Instructor
							name="Alex Chen"
							avatar="https://avatars.githubusercontent.com/u/252440198?v=4"
							initials="AC"
							title="Senior Software Engineer"
							students={45000}
						/>

						<Rating rating={5} reviews={8934} students={45892} />

						<Price current="$89" original="$199" />

						<Separator />

						{/* Tabs */}
						<Tabs defaultValue="curriculum" className="w-full">
							<TabsList className="w-full grid grid-cols-3">
								<TabsTrigger value="curriculum">Curriculum</TabsTrigger>
								<TabsTrigger value="outcomes">
									What You&apos;ll Learn
								</TabsTrigger>
								<TabsTrigger value="requirements">Requirements</TabsTrigger>
							</TabsList>

							<TabsContent value="curriculum" className="mt-4">
								<Curriculum
									sections={[
										{
											title: 'Getting Started with JavaScript',
											lessons: 12,
											duration: '2h 15m',
										},
										{
											title: 'Advanced JavaScript Concepts',
											lessons: 18,
											duration: '4h 30m',
										},
										{
											title: 'React Fundamentals',
											lessons: 24,
											duration: '5h 45m',
										},
										{
											title: 'Node.js & Express Backend',
											lessons: 20,
											duration: '4h 00m',
										},
										{
											title: 'Database Integration',
											lessons: 16,
											duration: '3h 30m',
										},
										{
											title: 'Full-Stack Projects',
											lessons: 10,
											duration: '4h 30m',
										},
									]}
								/>
							</TabsContent>

							<TabsContent value="outcomes" className="mt-4">
								<Outcomes
									items={[
										'Build production-ready full-stack applications',
										'Master React with hooks, context, and advanced patterns',
										'Create RESTful APIs with Node.js and Express',
										'Work with MongoDB and PostgreSQL databases',
										'Deploy applications to cloud platforms',
										'Implement authentication and authorization',
										'Write clean, maintainable, and testable code',
									]}
								/>
							</TabsContent>

							<TabsContent value="requirements" className="mt-4">
								<Requirements
									items={[
										'Basic understanding of HTML and CSS',
										'A computer with internet access',
										'No prior JavaScript experience required',
										'Willingness to learn and practice',
									]}
								/>
							</TabsContent>
						</Tabs>

						<Actions
							buttons={[
								{ label: 'Enroll Now', href: '#enroll', icon: ShoppingCart },
								{
									label: 'Save',
									href: '#wishlist',
									icon: Heart,
									variant: 'outline',
								},
							]}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
