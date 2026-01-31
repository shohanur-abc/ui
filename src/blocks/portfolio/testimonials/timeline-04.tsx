'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Quote } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar?: string;
	month: string;
	year: string;
}

export default function Main() {
	return (
		<section className="@container bg-gradient-to-b from-background to-muted/30">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Recent Reviews" />
					<Title text="Monthly Timeline" />
					<Description text="Recent testimonials organized by month." />
				</div>

				<MonthlyTimeline
					items={[
						{
							quote: 'January project launched with incredible results.',
							author: 'Alex Thompson',
							role: 'CEO',
							company: 'JanCo',
							avatar: 'https://i.pravatar.cc/100?img=65',
							month: 'Jan',
							year: '2024',
						},
						{
							quote: 'February redesign increased conversions by 150%.',
							author: 'Maria Santos',
							role: 'CMO',
							company: 'FebTech',
							avatar: 'https://i.pravatar.cc/100?img=66',
							month: 'Feb',
							year: '2024',
						},
						{
							quote: 'March mobile app launched to rave reviews.',
							author: 'James Wilson',
							role: 'Product Lead',
							company: 'MarApp',
							avatar: 'https://i.pravatar.cc/100?img=67',
							month: 'Mar',
							year: '2024',
						},
						{
							quote: 'April AI integration transformed our business.',
							author: 'Emily Chen',
							role: 'CTO',
							company: 'AprAI',
							avatar: 'https://i.pravatar.cc/100?img=68',
							month: 'Apr',
							year: '2024',
						},
						{
							quote: 'May launch was our biggest success yet.',
							author: 'Robert Kim',
							role: 'Founder',
							company: 'MayStart',
							avatar: 'https://i.pravatar.cc/100?img=69',
							month: 'May',
							year: '2024',
						},
						{
							quote: 'June optimization improved performance by 300%.',
							author: 'Sarah Davis',
							role: 'VP Engineering',
							company: 'JunScale',
							avatar: 'https://i.pravatar.cc/100?img=70',
							month: 'Jun',
							year: '2024',
						},
					]}
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<div className="flex justify-center mb-3 @md:mb-4">
		<Badge>{text}</Badge>
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

const MonthlyTimeline = ({ items }: { items: TestimonialItem[] }) => (
	<div className="max-w-5xl mx-auto">
		<ul className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-6">
			{items.map(({ quote, author, role, company, avatar, month, year }, i) => (
				<li key={i} className="relative">
					<div className="absolute -top-3 left-4 z-10">
						<div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold">
							{month} {year}
						</div>
					</div>
					<div className="bg-card border rounded-xl p-5 pt-8 shadow-sm h-full">
						<Quote className="size-5 text-primary/20 mb-3" />
						<blockquote className="text-sm leading-relaxed mb-4">
							&ldquo;{quote}&rdquo;
						</blockquote>
						<div className="flex items-center gap-2.5">
							<Avatar className="size-8">
								<AvatarImage src={avatar} />
								<AvatarFallback className="bg-muted text-xs">
									{author[0]}
								</AvatarFallback>
							</Avatar>
							<div>
								<div className="font-medium text-sm">{author}</div>
								<div className="text-xs text-muted-foreground">
									{role}, {company}
								</div>
							</div>
						</div>
					</div>
				</li>
			))}
		</ul>
	</div>
);
