import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	ArrowUpRight,
	BarChart3,
	Building2,
	Globe,
	Lightbulb,
	Shield,
	Users,
} from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="grid @xl:grid-cols-3 gap-8 @xl:gap-12">
					<div className="@xl:col-span-1">
						<Eyebrow text="Business Services" />
						<Title text="Strategic Expertise" />
						<Description text="Partner with us to unlock new opportunities and drive sustainable growth through proven business strategies." />
					</div>

					<div className="@xl:col-span-2">
						<BentoGrid
							items={[
								{
									icon: Lightbulb,
									title: 'Innovation Consulting',
									description:
										'Transform ideas into market-ready products with our innovation framework.',
									size: 'wide',
									href: '/services/innovation',
								},
								{
									icon: Globe,
									title: 'Market Expansion',
									description: 'Enter new markets confidently.',
									size: 'normal',
									href: '/services/expansion',
								},
								{
									icon: Users,
									title: 'Team Building',
									description: 'Scale your team strategically.',
									size: 'normal',
									href: '/services/team',
								},
								{
									icon: Building2,
									title: 'Operations',
									description: 'Optimize business operations.',
									size: 'normal',
									href: '/services/operations',
								},
								{
									icon: Shield,
									title: 'Risk Management',
									description: 'Protect your business assets.',
									size: 'normal',
									href: '/services/risk',
								},
								{
									icon: BarChart3,
									title: 'Performance Analytics',
									description:
										'Data-driven insights to measure and optimize business performance.',
									size: 'wide',
									href: '/services/analytics',
								},
							]}
						/>
					</div>
				</div>
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
	<h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight mb-4 @md:mb-6">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground leading-relaxed">
		{text}
	</p>
);

interface BentoItem {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
	size: 'normal' | 'wide';
	href: string;
}

const BentoGrid = ({ items }: { items: BentoItem[] }) => (
	<div className="grid @sm:grid-cols-2 gap-4">
		{items.map(({ icon: Icon, title, description, size, href }, i) => (
			<Link
				key={i}
				href={href}
				className={`group block ${size === 'wide' ? '@sm:col-span-2' : ''}`}
			>
				<Card className="h-full py-0 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 group-focus-visible:ring-2 group-focus-visible:ring-ring">
					<CardContent className="p-5 @md:p-6">
						<div className="flex items-start justify-between gap-4">
							<div className="flex items-start gap-4">
								<div className="size-10 @md:size-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
									<Icon className="size-5" />
								</div>
								<div>
									<h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
										{title}
									</h3>
									<p className="text-sm text-muted-foreground leading-relaxed">
										{description}
									</p>
								</div>
							</div>
							<ArrowUpRight className="size-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
						</div>
					</CardContent>
				</Card>
			</Link>
		))}
	</div>
);
