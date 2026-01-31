'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Quote, Building2 } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar?: string;
	industry: string;
}

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Client Stories" />
					<Title text="Industry Cards" />
					<Description text="Testimonials organized by client industry." />
				</div>

				<IndustryCards
					items={[
						{
							quote:
								'Our fintech platform now processes millions in transactions securely.',
							author: 'Amanda Wright',
							role: 'CEO',
							company: 'FinSecure',
							avatar: 'https://i.pravatar.cc/100?img=8',
							industry: 'Fintech',
						},
						{
							quote:
								'Healthcare compliance handled perfectly. Patients love the new portal.',
							author: 'Christopher Lee',
							role: 'CTO',
							company: 'HealthTech',
							avatar: 'https://i.pravatar.cc/100?img=9',
							industry: 'Healthcare',
						},
						{
							quote:
								'Our e-learning platform serves 100,000+ students seamlessly.',
							author: 'Nicole Brown',
							role: 'Founder',
							company: 'EduScale',
							avatar: 'https://i.pravatar.cc/100?img=10',
							industry: 'Education',
						},
						{
							quote:
								'Retail operations transformed with the new inventory system.',
							author: 'Daniel Kim',
							role: 'COO',
							company: 'RetailPro',
							avatar: 'https://i.pravatar.cc/100?img=11',
							industry: 'Retail',
						},
						{
							quote: 'Real estate listings now reach 5x more potential buyers.',
							author: 'Jennifer Park',
							role: 'CMO',
							company: 'PropTech',
							avatar: 'https://i.pravatar.cc/100?img=12',
							industry: 'Real Estate',
						},
						{
							quote:
								'Manufacturing efficiency increased by 40% with the new system.',
							author: 'Robert Taylor',
							role: 'VP Operations',
							company: 'ManufactPro',
							avatar: 'https://i.pravatar.cc/100?img=13',
							industry: 'Manufacturing',
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

const IndustryCards = ({ items }: { items: TestimonialItem[] }) => (
	<ul className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
		{items.map(({ quote, author, role, company, avatar, industry }, i) => (
			<li
				key={i}
				className="bg-card border rounded-xl p-6 shadow-sm hover:border-primary/50 transition-colors"
			>
				<div className="flex items-center gap-2 mb-4">
					<Building2 className="size-4 text-primary" />
					<Badge variant="secondary">{industry}</Badge>
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
