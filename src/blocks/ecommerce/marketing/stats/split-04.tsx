import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Truck, RefreshCcw, Star } from 'lucide-react';

interface StatItemProps {
	icon: React.ElementType;
	value: string;
	label: string;
}

interface ContentProps {
	badge: string;
	title: string;
	description: string;
}

const Content = ({ badge, title, description }: ContentProps) => (
	<div className="space-y-6">
		<Badge variant="outline">{badge}</Badge>
		<h2 className="text-3xl font-bold tracking-tight @sm:text-4xl">{title}</h2>
		<p className="text-muted-foreground leading-relaxed">{description}</p>
	</div>
);

const StatItem = ({ icon: Icon, value, label }: StatItemProps) => (
	<div className="group flex items-center gap-4">
		<div className="rounded-full bg-secondary p-3 ring-1 ring-border transition-all duration-300 group-hover:ring-primary/30">
			<Icon className="size-5 text-primary" />
		</div>
		<div>
			<p className="text-2xl font-bold tracking-tight @sm:text-3xl">{value}</p>
			<p className="text-sm text-muted-foreground">{label}</p>
		</div>
	</div>
);

export default function Main() {
	const content: ContentProps = {
		badge: 'Why Choose Us',
		title: 'Built for scale, designed for success',
		description: 'Our platform handles millions of transactions daily while maintaining the highest standards of reliability and customer satisfaction.',
	};

	const stats: StatItemProps[] = [
		{ icon: ShoppingCart, value: '12M+', label: 'Orders Processed' },
		{ icon: Truck, value: '2.1 days', label: 'Avg. Delivery Time' },
		{ icon: RefreshCcw, value: '< 2%', label: 'Return Rate' },
		{ icon: Star, value: '4.9/5', label: 'Customer Rating' },
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid items-center gap-12 @lg:grid-cols-2 @lg:gap-16">
					<Content {...content} />
					<div className="grid gap-6 @sm:grid-cols-2">
						{stats.map((stat, i) => (
							<StatItem key={i} {...stat} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
