'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Quote, Star } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar?: string;
	rating: number;
	projectType: string;
}

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Reviews" />
					<Title text="Split Tab View" />
					<Description text="Vertical tabs with detailed testimonials." />
				</div>

				<SplitTabs
					items={[
						{
							quote:
								'The e-commerce platform they built handles 10,000 transactions daily without a hitch. Performance and reliability are outstanding.',
							author: 'Marcus Johnson',
							role: 'COO',
							company: 'ShopMaster',
							avatar: 'https://i.pravatar.cc/100?img=47',
							rating: 5,
							projectType: 'E-commerce',
						},
						{
							quote:
								'Our SaaS dashboard is now a competitive advantage. Users consistently praise the intuitive interface and fast load times.',
							author: 'Emily Rodriguez',
							role: 'CEO',
							company: 'SaaSPro',
							avatar: 'https://i.pravatar.cc/100?img=48',
							rating: 5,
							projectType: 'SaaS Platform',
						},
						{
							quote:
								'The mobile app launch was flawless. 50,000 downloads in the first week with a 4.8 star rating.',
							author: 'David Kim',
							role: 'Product Lead',
							company: 'AppVenture',
							avatar: 'https://i.pravatar.cc/100?img=49',
							rating: 5,
							projectType: 'Mobile App',
						},
						{
							quote:
								'Our corporate website now reflects our brand perfectly. The custom animations and interactions are stunning.',
							author: 'Lisa Chen',
							role: 'Brand Director',
							company: 'CorpBrand',
							avatar: 'https://i.pravatar.cc/100?img=50',
							rating: 5,
							projectType: 'Corporate Site',
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

const SplitTabs = ({ items }: { items: TestimonialItem[] }) => {
	const [active, setActive] = useState(0);
	const current = items[active];

	if (!current) return null;

	return (
		<div className="max-w-5xl mx-auto">
			<div className="grid @lg:grid-cols-[200px_1fr] gap-6">
				<nav className="flex @lg:flex-col gap-2">
					{items.map(({ author, projectType }, i) => (
						<Button
							key={i}
							variant={i === active ? 'secondary' : 'ghost'}
							className="justify-start h-auto py-3 px-4"
							onClick={() => setActive(i)}
						>
							<div className="text-left">
								<div className="font-medium">{author.split(' ')[0]}</div>
								<div className="text-xs text-muted-foreground">
									{projectType}
								</div>
							</div>
						</Button>
					))}
				</nav>

				<div className="bg-muted/50 rounded-2xl p-8 @md:p-10">
					<div className="flex items-center gap-4 mb-6">
						<Avatar className="size-16 ring-2 ring-primary/20">
							<AvatarImage src={current.avatar} />
							<AvatarFallback className="bg-primary text-primary-foreground text-lg">
								{current.author[0]}
							</AvatarFallback>
						</Avatar>
						<div>
							<div className="font-bold text-xl">{current.author}</div>
							<div className="text-muted-foreground">
								{current.role}, {current.company}
							</div>
							<div className="flex gap-0.5 mt-1">
								{Array.from({ length: 5 }).map((_, j) => (
									<Star
										key={j}
										className={`size-4 ${j < current.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`}
									/>
								))}
							</div>
						</div>
					</div>

					<Badge className="mb-4">{current.projectType}</Badge>

					<Quote className="size-8 text-primary/20 mb-4" />
					<blockquote className="text-lg @md:text-xl leading-relaxed">
						&ldquo;{current.quote}&rdquo;
					</blockquote>
				</div>
			</div>
		</div>
	);
};
