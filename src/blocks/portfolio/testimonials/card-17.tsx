'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Quote, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar?: string;
	companyLogo?: string;
	caseStudyUrl?: string;
}

export default function Main() {
	return (
		<section className="@container bg-muted/30">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Case Studies" />
					<Title text="With Case Studies" />
					<Description text="Testimonials linked to detailed case studies." />
				</div>

				<CaseStudyCards
					items={[
						{
							quote:
								'The platform handles 10,000+ daily transactions flawlessly. A game-changer for our business.',
							author: 'Patricia Lane',
							role: 'CEO',
							company: 'ShopMaster',
							avatar: 'https://i.pravatar.cc/100?img=78',
							caseStudyUrl: '#',
						},
						{
							quote:
								'50% reduction in customer support tickets after the dashboard redesign.',
							author: 'Kevin Zhang',
							role: 'COO',
							company: 'SupportLess',
							avatar: 'https://i.pravatar.cc/100?img=79',
							caseStudyUrl: '#',
						},
						{
							quote: 'App Store featured within the first week of launch.',
							author: 'Maria Santos',
							role: 'Product Lead',
							company: 'AppFeatured',
							avatar: 'https://i.pravatar.cc/100?img=80',
							caseStudyUrl: '#',
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

const CaseStudyCards = ({ items }: { items: TestimonialItem[] }) => (
	<ul className="grid @md:grid-cols-3 gap-6 max-w-5xl mx-auto">
		{items.map(({ quote, author, role, company, avatar, caseStudyUrl }, i) => (
			<li key={i}>
				<Card className="h-full flex flex-col">
					<CardHeader className="pb-0">
						<Quote className="size-8 text-primary/20" />
					</CardHeader>
					<CardContent className="flex-1 flex flex-col">
						<blockquote className="text-base leading-relaxed mb-6 flex-1">
							&ldquo;{quote}&rdquo;
						</blockquote>
						<div className="flex items-center gap-3 mb-4 pb-4 border-b">
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
						{caseStudyUrl && (
							<Button
								variant="ghost"
								size="sm"
								className="w-full justify-between"
								asChild
							>
								<a href={caseStudyUrl}>
									View Case Study <ExternalLink className="size-3.5" />
								</a>
							</Button>
						)}
					</CardContent>
				</Card>
			</li>
		))}
	</ul>
);
