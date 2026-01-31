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
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Testimonials" />
					<Title text="Categorized Masonry" />
					<Description text="Masonry with category badges." />
				</div>

				<CategorizedMasonry
					items={[
						{
							quote:
								'The website redesign increased our conversion rate by 150%. Incredible ROI.',
							author: 'Robert Chen',
							role: 'CMO',
							company: 'ConvertPro',
							avatar: 'https://i.pravatar.cc/100?img=22',
							category: 'Web Design',
						},
						{
							quote: 'Best app ever!',
							author: 'Jennifer L.',
							role: 'Product Lead',
							company: 'AppBest',
							avatar: 'https://i.pravatar.cc/100?img=23',
							category: 'Mobile',
						},
						{
							quote:
								'Our brand identity is now recognized globally thanks to their creative direction.',
							author: 'David Kim',
							role: 'Brand Director',
							company: 'GlobalBrand',
							avatar: 'https://i.pravatar.cc/100?img=24',
							category: 'Branding',
						},
						{
							quote: 'E-commerce sales tripled.',
							author: 'Amanda W.',
							role: 'CEO',
							company: 'TripleSales',
							avatar: 'https://i.pravatar.cc/100?img=25',
							category: 'E-commerce',
						},
						{
							quote:
								'The custom dashboard saves our team 20+ hours per week. Worth every penny.',
							author: 'Christopher Lee',
							role: 'COO',
							company: 'TimeSaver',
							avatar: 'https://i.pravatar.cc/100?img=26',
							category: 'SaaS',
						},
						{
							quote: 'UI/UX perfection.',
							author: 'Nicole B.',
							role: 'Design Lead',
							company: 'UXPerfect',
							avatar: 'https://i.pravatar.cc/100?img=27',
							category: 'UI/UX',
						},
						{
							quote:
								'The marketing automation platform transformed our lead generation process completely.',
							author: 'Daniel Kim',
							role: 'VP Marketing',
							company: 'LeadGen',
							avatar: 'https://i.pravatar.cc/100?img=28',
							category: 'Marketing',
						},
						{
							quote: 'Outstanding support.',
							author: 'Sarah K.',
							role: 'PM',
							company: 'SupportPro',
							avatar: 'https://i.pravatar.cc/100?img=29',
							category: 'Support',
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

const CategorizedMasonry = ({ items }: { items: TestimonialItem[] }) => (
	<div className="max-w-6xl mx-auto columns-1 @sm:columns-2 @lg:columns-3 gap-5">
		{items.map(({ quote, author, role, company, avatar, category }, i) => (
			<div key={i} className="break-inside-avoid mb-5">
				<div className="bg-card border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
					<Badge variant="secondary" className="mb-3">
						{category}
					</Badge>
					<Quote className="size-5 text-primary/20 mb-2" />
					<blockquote className="text-sm leading-relaxed mb-4">
						&ldquo;{quote}&rdquo;
					</blockquote>
					<div className="flex items-center gap-2.5 pt-3 border-t">
						<Avatar className="size-9">
							<AvatarImage src={avatar} />
							<AvatarFallback className="bg-primary text-primary-foreground">
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
			</div>
		))}
	</div>
);
