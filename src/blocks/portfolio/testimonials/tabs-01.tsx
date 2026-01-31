'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Quote, Star } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar?: string;
	rating: number;
}

interface CategoryItem {
	label: string;
	value: string;
	testimonials: TestimonialItem[];
}

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Testimonials" />
					<Title text="By Category" />
					<Description text="Filter testimonials by project type." />
				</div>

				<TabbedTestimonials
					categories={[
						{
							label: 'All',
							value: 'all',
							testimonials: [
								{
									quote: 'Exceptional work across all dimensions.',
									author: 'Alex Turner',
									role: 'CEO',
									company: 'TechStart',
									avatar: 'https://i.pravatar.cc/100?img=26',
									rating: 5,
								},
								{
									quote: 'Professional and highly skilled team.',
									author: 'Maria Santos',
									role: 'CTO',
									company: 'CloudFirst',
									avatar: 'https://i.pravatar.cc/100?img=27',
									rating: 5,
								},
							],
						},
						{
							label: 'Web Design',
							value: 'web',
							testimonials: [
								{
									quote: 'The website redesign doubled our leads.',
									author: 'David Chen',
									role: 'CMO',
									company: 'GrowthCo',
									avatar: 'https://i.pravatar.cc/100?img=28',
									rating: 5,
								},
								{
									quote: 'Beautiful, fast, and conversion-focused.',
									author: 'Sarah Kim',
									role: 'VP Marketing',
									company: 'ConvertPro',
									avatar: 'https://i.pravatar.cc/100?img=29',
									rating: 5,
								},
							],
						},
						{
							label: 'Mobile App',
							value: 'mobile',
							testimonials: [
								{
									quote: "Best app we've ever launched.",
									author: 'James Wilson',
									role: 'Product Lead',
									company: 'AppMasters',
									avatar: 'https://i.pravatar.cc/100?img=30',
									rating: 5,
								},
								{
									quote: 'Downloads exceeded projections by 200%.',
									author: 'Emily Foster',
									role: 'CEO',
									company: 'MobileFirst',
									avatar: 'https://i.pravatar.cc/100?img=31',
									rating: 5,
								},
							],
						},
						{
							label: 'Branding',
							value: 'branding',
							testimonials: [
								{
									quote: 'Complete brand transformation success.',
									author: 'Michael Park',
									role: 'Brand Director',
									company: 'IdentityPro',
									avatar: 'https://i.pravatar.cc/100?img=32',
									rating: 5,
								},
								{
									quote: '40% improvement in brand recognition.',
									author: 'Lisa Wang',
									role: 'CMO',
									company: 'BrandForce',
									avatar: 'https://i.pravatar.cc/100?img=33',
									rating: 5,
								},
							],
						},
					]}
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<div className="flex justify-center mb-3 @md:mb-4">
		<Badge variant="outline">{text}</Badge>
	</div>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

const TabbedTestimonials = ({ categories }: { categories: CategoryItem[] }) => (
	<Tabs defaultValue={categories[0]?.value} className="w-full">
		<TabsList className="flex justify-center mb-8">
			{categories.map(({ label, value }) => (
				<TabsTrigger key={value} value={value}>
					{label}
				</TabsTrigger>
			))}
		</TabsList>
		{categories.map(({ value, testimonials }) => (
			<TabsContent key={value} value={value}>
				<ul className="grid @md:grid-cols-2 gap-6 max-w-4xl mx-auto">
					{testimonials.map(
						({ quote, author, role, company, avatar, rating }, i) => (
							<li key={i}>
								<Card className="h-full">
									<CardContent className="p-6">
										<div className="flex gap-0.5 mb-4">
											{Array.from({ length: 5 }).map((_, j) => (
												<Star
													key={j}
													className={`size-4 ${j < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`}
												/>
											))}
										</div>
										<Quote className="size-8 text-primary/20 mb-3" />
										<blockquote className="text-base leading-relaxed mb-6">
											&ldquo;{quote}&rdquo;
										</blockquote>
										<div className="flex items-center gap-3">
											<Avatar className="size-11">
												<AvatarImage src={avatar} />
												<AvatarFallback className="bg-primary text-primary-foreground">
													{author[0]}
												</AvatarFallback>
											</Avatar>
											<div>
												<div className="font-semibold">{author}</div>
												<div className="text-sm text-muted-foreground">
													{role}, {company}
												</div>
											</div>
										</div>
									</CardContent>
								</Card>
							</li>
						),
					)}
				</ul>
			</TabsContent>
		))}
	</Tabs>
);
