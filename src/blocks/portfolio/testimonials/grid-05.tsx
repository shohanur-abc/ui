import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Building2 } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar?: string;
	rating: number;
}

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="grid @lg:grid-cols-3 gap-8 @lg:gap-12">
					<Header
						eyebrow="Reviews"
						title="Client Satisfaction"
						description="Hear from the companies that trust us with their digital presence."
						stats={{ total: 200, average: 4.9 }}
					/>

					<div className="@lg:col-span-2">
						<TestimonialGrid
							items={[
								{
									quote:
										'A transformative experience. The team delivered exceptional results.',
									author: 'Christopher Lee',
									role: 'CEO',
									company: 'TechVentures',
									avatar: 'https://i.pravatar.cc/100?img=80',
									rating: 5,
								},
								{
									quote: 'Professional, creative, and technically brilliant.',
									author: 'Amanda Foster',
									role: 'CTO',
									company: 'CloudScale',
									avatar: 'https://i.pravatar.cc/100?img=81',
									rating: 5,
								},
								{
									quote: 'Best decision we made for our digital strategy.',
									author: 'Ryan Mitchell',
									role: 'VP Product',
									company: 'GrowthLab',
									avatar: 'https://i.pravatar.cc/100?img=82',
									rating: 5,
								},
								{
									quote: 'Results that exceeded every expectation we had.',
									author: 'Jennifer Hayes',
									role: 'CMO',
									company: 'BrandFirst',
									avatar: 'https://i.pravatar.cc/100?img=83',
									rating: 5,
								},
							]}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}

const Header = ({
	eyebrow,
	title,
	description,
	stats,
}: {
	eyebrow: string;
	title: string;
	description: string;
	stats: { total: number; average: number };
}) => (
	<div className="@lg:sticky @lg:top-24">
		<Badge className="mb-4">{eyebrow}</Badge>
		<h2 className="text-3xl @sm:text-4xl font-bold tracking-tight mb-4">
			{title}
		</h2>
		<p className="text-muted-foreground leading-relaxed mb-8">{description}</p>
		<div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
			<div>
				<div className="flex items-center gap-1">
					{Array.from({ length: 5 }).map((_, i) => (
						<Star key={i} className="size-4 fill-yellow-400 text-yellow-400" />
					))}
				</div>
				<div className="text-sm text-muted-foreground mt-1">
					{stats.total}+ reviews
				</div>
			</div>
			<div className="h-10 w-px bg-border" />
			<div>
				<div className="text-2xl font-bold">{stats.average}</div>
				<div className="text-sm text-muted-foreground">Average rating</div>
			</div>
		</div>
	</div>
);

const TestimonialGrid = ({ items }: { items: TestimonialItem[] }) => (
	<ul className="grid @sm:grid-cols-2 gap-4">
		{items.map(({ quote, author, role, company, avatar, rating }, i) => (
			<li key={i}>
				<Card className="h-full hover:shadow-lg transition-shadow">
					<CardContent className="p-5">
						<div className="flex items-center justify-between mb-3">
							<div className="flex gap-0.5">
								{Array.from({ length: 5 }).map((_, j) => (
									<Star
										key={j}
										className={`size-3.5 ${j < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`}
									/>
								))}
							</div>
							<div className="flex items-center gap-1 text-muted-foreground">
								<Building2 className="size-3.5" />
								<span className="text-xs">{company}</span>
							</div>
						</div>
						<blockquote className="text-sm leading-relaxed mb-4">
							&ldquo;{quote}&rdquo;
						</blockquote>
						<div className="flex items-center gap-2.5">
							<Avatar className="size-9">
								<AvatarImage src={avatar} />
								<AvatarFallback className="text-xs">{author[0]}</AvatarFallback>
							</Avatar>
							<div>
								<div className="font-medium text-sm">{author}</div>
								<div className="text-xs text-muted-foreground">{role}</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</li>
		))}
	</ul>
);
