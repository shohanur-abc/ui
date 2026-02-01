import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	ArrowRight,
	BarChart3,
	Cloud,
	Code2,
	Database,
	Globe,
	Shield,
} from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Our Offerings" />
					<Title text="Comprehensive Service Suite" />
					<Description text="Every solution you need to build, scale, and protect your digital business." />
				</div>

				<ServiceGrid
					items={[
						{
							icon: Code2,
							title: 'Software Development',
							description:
								'Custom applications built with modern architecture and clean code.',
							href: '/services/development',
						},
						{
							icon: Cloud,
							title: 'Cloud Services',
							description:
								'Migrate, optimize, and manage cloud infrastructure at any scale.',
							href: '/services/cloud',
						},
						{
							icon: Database,
							title: 'Data Solutions',
							description:
								'Unlock insights with advanced analytics and data platforms.',
							href: '/services/data',
						},
						{
							icon: Shield,
							title: 'Security Services',
							description:
								'Comprehensive security assessments and implementation.',
							href: '/services/security',
						},
						{
							icon: Globe,
							title: 'Digital Strategy',
							description:
								'Align technology with business goals for maximum impact.',
							href: '/services/strategy',
						},
						{
							icon: BarChart3,
							title: 'Analytics & BI',
							description:
								'Transform data into actionable business intelligence.',
							href: '/services/analytics',
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
	<div className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-5 @md:gap-6">
		{items.map(({ icon: Icon, title, description, href }, i) => (
			<Card
				key={i}
				className="group py-0 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
			>
				<CardContent className="p-6 @md:p-8 flex flex-col h-full">
					<div className="size-12 @md:size-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-5 group-hover:from-primary group-hover:to-primary/80 group-hover:text-primary-foreground transition-all duration-300">
						<Icon className="size-6 @md:size-7" />
					</div>
					<h3 className="text-lg @md:text-xl font-semibold mb-2">{title}</h3>
					<p className="text-sm @md:text-base text-muted-foreground leading-relaxed flex-1 mb-4">
						{description}
					</p>
					<Button
						variant="ghost"
						size="sm"
						className="self-start px-0 text-primary hover:text-primary hover:bg-transparent"
						asChild
					>
						<Link href={href}>
							Learn more
							<ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
						</Link>
					</Button>
				</CardContent>
			</Card>
		))}
	</div>
);
