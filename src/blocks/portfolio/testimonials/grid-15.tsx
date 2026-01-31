'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Quote, MapPin } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar?: string;
	location: string;
}

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Global Clients" />
					<Title text="Location Grid" />
					<Description text="Testimonials from clients around the world." />
				</div>

				<LocationGrid
					items={[
						{
							quote: 'Outstanding work from start to finish.',
							author: 'Alex Turner',
							role: 'CEO',
							company: 'TechStart',
							avatar: 'https://i.pravatar.cc/100?img=73',
							location: 'San Francisco, USA',
						},
						{
							quote: 'Best agency in the industry.',
							author: 'Maria Santos',
							role: 'CTO',
							company: 'CloudFirst',
							avatar: 'https://i.pravatar.cc/100?img=74',
							location: 'London, UK',
						},
						{
							quote: 'Transformed our digital presence.',
							author: 'David Chen',
							role: 'VP Product',
							company: 'TransformCo',
							avatar: 'https://i.pravatar.cc/100?img=75',
							location: 'Singapore',
						},
						{
							quote: 'Exceptional quality and professionalism.',
							author: 'Sarah Kim',
							role: 'CMO',
							company: 'QualityPro',
							avatar: 'https://i.pravatar.cc/100?img=76',
							location: 'Tokyo, Japan',
						},
						{
							quote: 'A true partner in our success.',
							author: 'James Wilson',
							role: 'Director',
							company: 'SuccessCo',
							avatar: 'https://i.pravatar.cc/100?img=77',
							location: 'Sydney, Australia',
						},
						{
							quote: 'Creative solutions that work.',
							author: 'Emily Foster',
							role: 'Founder',
							company: 'SolutionLab',
							avatar: 'https://i.pravatar.cc/100?img=78',
							location: 'Berlin, Germany',
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

const LocationGrid = ({ items }: { items: TestimonialItem[] }) => (
	<ul className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
		{items.map(({ quote, author, role, company, avatar, location }, i) => (
			<li
				key={i}
				className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
			>
				<div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
					<MapPin className="size-3.5" />
					<span>{location}</span>
				</div>
				<Quote className="size-6 text-primary/20 mb-3" />
				<blockquote className="text-base leading-relaxed mb-5">
					&ldquo;{quote}&rdquo;
				</blockquote>
				<div className="flex items-center gap-3">
					<Avatar className="size-10">
						<AvatarImage src={avatar} />
						<AvatarFallback className="bg-primary text-primary-foreground">
							{author[0]}
						</AvatarFallback>
					</Avatar>
					<div>
						<div className="font-semibold text-sm">{author}</div>
						<div className="text-xs text-muted-foreground">
							{role}, {company}
						</div>
					</div>
				</div>
			</li>
		))}
	</ul>
);
