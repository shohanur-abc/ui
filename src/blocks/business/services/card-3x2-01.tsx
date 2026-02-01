import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	ArrowRight,
	Compass,
	Gem,
	Layers,
	Sparkles,
	Target,
	Wand2,
} from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Services" />
					<Title text="Crafted for Excellence" />
					<Description text="Premium services designed to elevate your business above the competition." />
				</div>

				<ServiceGrid
					items={[
						{
							icon: Target,
							title: 'Strategic Advisory',
							description: 'Expert guidance for critical decisions.',
							href: '/services/advisory',
						},
						{
							icon: Wand2,
							title: 'Product Design',
							description: 'Intuitive experiences that delight users.',
							href: '/services/design',
						},
						{
							icon: Layers,
							title: 'Full-Stack Development',
							description: 'End-to-end application building.',
							href: '/services/development',
						},
						{
							icon: Compass,
							title: 'Digital Transformation',
							description: 'Modernize legacy systems seamlessly.',
							href: '/services/transformation',
						},
						{
							icon: Sparkles,
							title: 'AI Integration',
							description: 'Intelligent automation solutions.',
							href: '/services/ai',
						},
						{
							icon: Gem,
							title: 'Premium Support',
							description: 'Dedicated 24/7 expert assistance.',
							href: '/services/support',
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
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
	href: string;
}

const ServiceGrid = ({ items }: { items: ServiceItem[] }) => (
	<div className="grid @sm:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-5">
		{items.map(({ icon: Icon, title, description, href }, i) => (
			<Link key={i} href={href} className="group block">
				<Card className="h-full py-0 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 group-focus-visible:ring-2 group-focus-visible:ring-ring">
					<CardContent className="p-6 @md:p-7 text-center">
						<div className="size-14 @md:size-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-110">
							<Icon className="size-7 @md:size-8" />
						</div>
						<h3 className="text-lg font-semibold mb-1.5 group-hover:text-primary transition-colors">
							{title}
						</h3>
						<p className="text-sm text-muted-foreground mb-3">{description}</p>
						<span className="inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
							Explore
							<ArrowRight className="size-3" />
						</span>
					</CardContent>
				</Card>
			</Link>
		))}
	</div>
);
