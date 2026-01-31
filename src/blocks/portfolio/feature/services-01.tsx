import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Services" />
					<Title text="What I Offer" />
					<Description text="Comprehensive development services tailored to your needs." />
				</div>

				<ServiceCards
					items={[
						{
							name: 'Web Development',
							description:
								'Custom web applications built with modern frameworks.',
							price: 'From $5,000',
							features: [
								'React/Next.js',
								'Responsive design',
								'API integration',
								'SEO optimization',
							],
							cta: { label: 'Get Started', href: '#contact' },
						},
						{
							name: 'Full-Stack Projects',
							description:
								'End-to-end development from database to deployment.',
							price: 'From $10,000',
							features: [
								'Backend APIs',
								'Database design',
								'Cloud hosting',
								'CI/CD pipeline',
								'Documentation',
							],
							cta: { label: 'Get Started', href: '#contact' },
							highlighted: true,
						},
						{
							name: 'Consulting',
							description: 'Technical guidance and code reviews for your team.',
							price: '$200/hour',
							features: [
								'Architecture review',
								'Code audits',
								'Performance optimization',
								'Team training',
							],
							cta: { label: 'Book a Call', href: '#calendly' },
						},
					]}
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<Badge variant="outline" className="mb-3 @md:mb-4">
		{text}
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground leading-relaxed">
		{text}
	</p>
);

interface ServiceItem {
	name: string;
	description: string;
	price: string;
	features: string[];
	cta: { label: string; href: string };
	highlighted?: boolean;
}

const ServiceCards = ({ items }: { items: ServiceItem[] }) => (
	<div className="grid @md:grid-cols-3 gap-4 @md:gap-6">
		{items.map(
			({ name, description, price, features, cta, highlighted }, i) => (
				<Card
					key={i}
					className={`py-0 relative ${highlighted ? 'border-primary shadow-xl' : ''}`}
				>
					{highlighted && (
						<div className="absolute -top-3 left-1/2 -translate-x-1/2">
							<Badge variant="default">Most Popular</Badge>
						</div>
					)}
					<CardContent className="p-6 @md:p-8">
						<h3 className="font-bold text-lg @md:text-xl mb-2">{name}</h3>
						<p className="text-sm text-muted-foreground mb-4">{description}</p>
						<div className="text-2xl @md:text-3xl font-bold text-primary mb-6">
							{price}
						</div>

						<ul className="space-y-3 mb-8">
							{features.map((feature, j) => (
								<li key={j} className="flex items-center gap-2 text-sm">
									<Check className="size-4 text-primary shrink-0" />
									{feature}
								</li>
							))}
						</ul>

						<Button
							variant={highlighted ? 'default' : 'outline'}
							className="w-full"
							asChild
						>
							<Link href={cta.href}>
								{cta.label}
								<ArrowRight className="size-4" />
							</Link>
						</Button>
					</CardContent>
				</Card>
			),
		)}
	</div>
);
