import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
	ArrowRight,
	Cloud,
	Code2,
	Cpu,
	Database,
	Globe,
	Layers,
	Shield,
	Zap,
} from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="flex flex-col @xl:flex-row @xl:items-end @xl:justify-between gap-6 mb-10 @md:mb-14">
					<div className="max-w-2xl">
						<Eyebrow text="Service Catalog" />
						<Title text="Complete Solutions" />
						<Description text="A comprehensive portfolio of services to address every aspect of your digital journey." />
					</div>
					<Button variant="outline" size="lg" asChild>
						<Link href="/services">
							All Services
							<ArrowRight className="size-4" />
						</Link>
					</Button>
				</div>

				<BentoGrid
					items={[
						{
							icon: Code2,
							title: 'Development',
							description:
								'Full-stack development with modern technologies and best practices for scalable applications.',
							size: 'large',
							variant: 'primary',
						},
						{
							icon: Cloud,
							title: 'Cloud',
							description: 'Multi-cloud infrastructure.',
							size: 'small',
							variant: 'default',
						},
						{
							icon: Database,
							title: 'Data',
							description: 'Analytics and engineering.',
							size: 'small',
							variant: 'default',
						},
						{
							icon: Shield,
							title: 'Security',
							description: 'Enterprise protection.',
							size: 'small',
							variant: 'default',
						},
						{
							icon: Cpu,
							title: 'AI/ML',
							description: 'Intelligent automation.',
							size: 'small',
							variant: 'default',
						},
						{
							icon: Globe,
							title: 'Strategy',
							description:
								'Digital transformation consulting to align technology initiatives with business objectives.',
							size: 'large',
							variant: 'secondary',
						},
						{
							icon: Layers,
							title: 'Integration',
							description: 'System connectivity.',
							size: 'small',
							variant: 'default',
						},
						{
							icon: Zap,
							title: 'Performance',
							description: 'Speed optimization.',
							size: 'small',
							variant: 'default',
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
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
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
	size: 'small' | 'large';
	variant: 'default' | 'primary' | 'secondary';
}

const BentoGrid = ({ items }: { items: BentoItem[] }) => (
	<div className="grid @sm:grid-cols-2 @xl:grid-cols-4 gap-4">
		{items.map(({ icon: Icon, title, description, size, variant }, i) => (
			<Card
				key={i}
				className={`group py-0 transition-all duration-300 hover:-translate-y-0.5 ${
					size === 'large' ? '@sm:col-span-2' : ''
				} ${
					variant === 'primary'
						? 'bg-primary text-primary-foreground hover:shadow-xl hover:shadow-primary/20'
						: variant === 'secondary'
							? 'bg-secondary hover:shadow-lg'
							: 'hover:shadow-lg hover:shadow-primary/5'
				}`}
			>
				<CardContent className="p-5 @md:p-6">
					<div className="flex items-start gap-4">
						<div
							className={`size-11 @md:size-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
								variant === 'primary'
									? 'bg-primary-foreground/20'
									: variant === 'secondary'
										? 'bg-background group-hover:bg-primary group-hover:text-primary-foreground'
										: 'bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground'
							}`}
						>
							<Icon className="size-5 @md:size-6" />
						</div>
						<div>
							<h3 className="font-semibold mb-1">{title}</h3>
							<p
								className={`text-sm leading-relaxed ${
									variant === 'primary'
										? 'text-primary-foreground/80'
										: 'text-muted-foreground'
								}`}
							>
								{description}
							</p>
						</div>
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);
