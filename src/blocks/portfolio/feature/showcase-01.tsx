import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<ShowcaseLayout
					eyebrow={{ icon: Star, text: 'Case Study' }}
					title="Building a Modern E-Commerce Platform"
					description="How I helped a retail brand increase online sales by 150% through a complete digital transformation."
					image="https://picsum.photos/seed/showcase1/1200/700"
					stats={[
						{ value: '150%', label: 'Sales Increase' },
						{ value: '2.5s', label: 'Load Time' },
						{ value: '98', label: 'Lighthouse Score' },
					]}
					tags={['Next.js', 'Shopify', 'Stripe', 'Tailwind CSS']}
					cta={{ label: 'Read Case Study', href: '#case-study' }}
				/>
			</div>
		</section>
	);
}

interface EyebrowProps {
	icon: React.ComponentType<{ className?: string }>;
	text: string;
}

interface StatItem {
	value: string;
	label: string;
}

interface ShowcaseLayoutProps {
	eyebrow: EyebrowProps;
	title: string;
	description: string;
	image: string;
	stats: StatItem[];
	tags: string[];
	cta: { label: string; href: string };
}

const ShowcaseLayout = ({
	eyebrow,
	title,
	description,
	image,
	stats,
	tags,
	cta,
}: ShowcaseLayoutProps) => {
	const EyebrowIcon = eyebrow.icon;
	return (
		<div>
			<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
				<Badge variant="secondary" className="mb-3 @md:mb-4 gap-1.5">
					<EyebrowIcon className="size-3.5" />
					{eyebrow.text}
				</Badge>
				<h2 className="text-2xl @sm:text-3xl @md:text-4xl @xl:text-5xl font-bold tracking-tight mb-4 @md:mb-6">
					{title}
				</h2>
				<p className="text-base @md:text-lg text-muted-foreground leading-relaxed">
					{description}
				</p>
			</div>

			<Card className="py-0 overflow-hidden">
				<div className="relative aspect-video">
					<Image src={image} alt={title} fill className="object-cover" />
					<div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />

					<div className="absolute bottom-0 left-0 right-0 p-6 @md:p-8">
						<div className="flex flex-wrap items-end justify-between gap-6">
							<div className="flex gap-6 @md:gap-10">
								{stats.map(({ value, label }, i) => (
									<div key={i}>
										<div className="text-2xl @md:text-3xl @xl:text-4xl font-bold">
											{value}
										</div>
										<div className="text-sm text-muted-foreground">{label}</div>
									</div>
								))}
							</div>

							<Button size="lg" asChild>
								<Link href={cta.href}>
									{cta.label}
									<ArrowRight className="size-4" />
								</Link>
							</Button>
						</div>
					</div>
				</div>

				<CardContent className="p-5 @md:p-6 flex flex-wrap gap-2">
					{tags.map((tag, i) => (
						<Badge key={i} variant="outline" className="text-xs">
							{tag}
						</Badge>
					))}
				</CardContent>
			</Card>
		</div>
	);
};
