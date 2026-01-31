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
	gradient: string;
}

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Reviews" />
					<Title text="Gradient Cards" />
					<Description text="Colorful gradient backgrounds for each card." />
				</div>

				<GradientGrid
					items={[
						{
							quote: 'Exceptional work quality and attention to detail.',
							author: 'Alex Turner',
							role: 'CEO',
							company: 'TechStart',
							avatar: 'https://i.pravatar.cc/100?img=61',
							gradient: 'from-pink-500/10 to-rose-500/10',
						},
						{
							quote: "Best agency partnership we've ever had.",
							author: 'Maria Santos',
							role: 'CTO',
							company: 'CloudFirst',
							avatar: 'https://i.pravatar.cc/100?img=62',
							gradient: 'from-blue-500/10 to-cyan-500/10',
						},
						{
							quote: 'Transformed our digital presence completely.',
							author: 'David Chen',
							role: 'VP Product',
							company: 'TransformCo',
							avatar: 'https://i.pravatar.cc/100?img=63',
							gradient: 'from-green-500/10 to-emerald-500/10',
						},
						{
							quote: 'Professional, creative, and reliable team.',
							author: 'Sarah Kim',
							role: 'CMO',
							company: 'ReliablePro',
							avatar: 'https://i.pravatar.cc/100?img=64',
							gradient: 'from-purple-500/10 to-violet-500/10',
						},
						{
							quote: 'Outstanding results that exceeded expectations.',
							author: 'James Wilson',
							role: 'Director',
							company: 'ExceedCo',
							avatar: 'https://i.pravatar.cc/100?img=65',
							gradient: 'from-orange-500/10 to-amber-500/10',
						},
						{
							quote: 'A true partner in our growth journey.',
							author: 'Emily Foster',
							role: 'Founder',
							company: 'GrowthPro',
							avatar: 'https://i.pravatar.cc/100?img=66',
							gradient: 'from-teal-500/10 to-cyan-500/10',
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

const GradientGrid = ({ items }: { items: TestimonialItem[] }) => (
	<ul className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
		{items.map(({ quote, author, role, company, avatar, gradient }, i) => (
			<li
				key={i}
				className={`bg-gradient-to-br ${gradient} border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow`}
			>
				<Quote className="size-7 text-primary/30 mb-4" />
				<blockquote className="text-base leading-relaxed mb-6">
					&ldquo;{quote}&rdquo;
				</blockquote>
				<div className="flex items-center gap-3">
					<Avatar className="size-11 ring-2 ring-background">
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
			</li>
		))}
	</ul>
);
