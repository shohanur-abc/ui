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
	category: string;
}

export default function Main() {
	return (
		<section className="@container bg-muted/30">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Client Reviews" />
					<Title text="Categorized Grid" />
					<Description text="Testimonials organized by project category." />
				</div>

				<CategorizedGrid
					items={[
						{
							quote: 'The new website drives 3x more leads.',
							author: 'Alex Turner',
							role: 'CMO',
							company: 'LeadGen',
							avatar: 'https://i.pravatar.cc/100?img=33',
							category: 'Web Development',
						},
						{
							quote: 'Mobile app got featured on App Store.',
							author: 'Maria Santos',
							role: 'Product Lead',
							company: 'AppFeatured',
							avatar: 'https://i.pravatar.cc/100?img=34',
							category: 'Mobile App',
						},
						{
							quote: 'Brand redesign was transformative.',
							author: 'David Chen',
							role: 'Brand Director',
							company: 'RebrandCo',
							avatar: 'https://i.pravatar.cc/100?img=35',
							category: 'Branding',
						},
						{
							quote: 'E-commerce sales doubled in 3 months.',
							author: 'Sarah Kim',
							role: 'CEO',
							company: 'ShopDouble',
							avatar: 'https://i.pravatar.cc/100?img=36',
							category: 'E-commerce',
						},
						{
							quote: 'UI/UX improvements boosted engagement.',
							author: 'James Wilson',
							role: 'CPO',
							company: 'EngagePro',
							avatar: 'https://i.pravatar.cc/100?img=37',
							category: 'UI/UX Design',
						},
						{
							quote: 'Dashboard saves us hours every week.',
							author: 'Emily Foster',
							role: 'Operations Lead',
							company: 'TimeSaver',
							avatar: 'https://i.pravatar.cc/100?img=38',
							category: 'SaaS',
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

const CategorizedGrid = ({ items }: { items: TestimonialItem[] }) => (
	<ul className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
		{items.map(({ quote, author, role, company, avatar, category }, i) => (
			<li
				key={i}
				className="bg-background border rounded-xl p-6 shadow-sm group hover:shadow-md transition-shadow"
			>
				<Badge variant="secondary" className="mb-4">
					{category}
				</Badge>
				<Quote className="size-6 text-primary/20 mb-3" />
				<blockquote className="text-base leading-relaxed mb-5">
					&ldquo;{quote}&rdquo;
				</blockquote>
				<div className="flex items-center gap-3 pt-4 border-t">
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
