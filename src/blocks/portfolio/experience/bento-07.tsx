import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Quote, Star, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="max-w-xl mb-12 @md:mb-16">
					<Eyebrow text="Testimonials" />
					<Title text="What People Say" />
					<Description text="Feedback from colleagues and collaborators." />
				</div>

				<div className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-4 auto-rows-[minmax(200px,auto)]">
					<FeaturedTestimonial
						quote="John is the best engineer I've ever worked with. His technical skills are matched only by his ability to mentor and lead others."
						author="Sarah Chen"
						role="VP of Engineering"
						company="TechCorp"
						avatar="https://github.com/shadcn.png"
						className="@md:col-span-2 @xl:col-span-2"
					/>
					<CompactTestimonial
						quote="Transformed our design system."
						author="Michael Park"
						role="Product Designer"
						avatar="https://github.com/shadcn.png"
						rating={5}
					/>
					<CompactTestimonial
						quote="Amazing mentor and leader."
						author="Alex Kim"
						role="Senior Engineer"
						avatar="https://github.com/shadcn.png"
						rating={5}
					/>
					<StatCard count={25} label="Colleagues Recommending" />
					<CompactTestimonial
						quote="Incredible technical depth."
						author="Emily Wang"
						role="Tech Lead"
						avatar="https://github.com/shadcn.png"
						rating={5}
					/>
				</div>

				<div className="mt-8 text-center">
					<Link
						href="/testimonials"
						className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
					>
						View all testimonials <ArrowRight className="size-4" />
					</Link>
				</div>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<Badge variant="outline" className="mb-3 @md:mb-4">
		{text}
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

interface FeaturedTestimonialProps {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	className?: string;
}

const FeaturedTestimonial = ({
	quote,
	author,
	role,
	company,
	avatar,
	className = '',
}: FeaturedTestimonialProps) => (
	<Card className={`group ${className}`}>
		<CardContent className="p-8 h-full flex flex-col justify-between">
			<div>
				<Quote className="size-10 text-primary/20 mb-4" />
				<p className="text-lg @md:text-xl italic leading-relaxed">
					&quot;{quote}&quot;
				</p>
			</div>
			<div className="flex items-center gap-4 mt-6">
				<Avatar className="size-14 ring-2 ring-background">
					<AvatarImage src={avatar} alt={author} />
					<AvatarFallback>
						{author
							.split(' ')
							.map((n) => n[0])
							.join('')}
					</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-bold">{author}</p>
					<p className="text-sm text-muted-foreground">
						{role} · {company}
					</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

interface CompactTestimonialProps {
	quote: string;
	author: string;
	role: string;
	avatar: string;
	rating: number;
}

const CompactTestimonial = ({
	quote,
	author,
	role,
	avatar,
	rating,
}: CompactTestimonialProps) => (
	<Card className="group hover:shadow-md transition-all">
		<CardContent className="p-5 h-full flex flex-col">
			<div className="flex gap-0.5 mb-3">
				{[...Array(rating)].map((_, i) => (
					<Star key={i} className="size-3.5 text-yellow-500 fill-current" />
				))}
			</div>
			<p className="text-sm italic flex-1">&quot;{quote}&quot;</p>
			<div className="flex items-center gap-2 mt-4">
				<Avatar className="size-8">
					<AvatarImage src={avatar} alt={author} />
					<AvatarFallback className="text-xs">
						{author
							.split(' ')
							.map((n) => n[0])
							.join('')}
					</AvatarFallback>
				</Avatar>
				<div>
					<p className="text-xs font-medium">{author}</p>
					<p className="text-xs text-muted-foreground">{role}</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

interface StatCardProps {
	count: number;
	label: string;
}

const StatCard = ({ count, label }: StatCardProps) => (
	<Card className="bg-primary text-primary-foreground">
		<CardContent className="p-6 h-full flex flex-col items-center justify-center text-center">
			<Users className="size-8 mb-2 opacity-80" />
			<p className="text-4xl font-bold">{count}+</p>
			<p className="text-sm opacity-80">{label}</p>
		</CardContent>
	</Card>
);
