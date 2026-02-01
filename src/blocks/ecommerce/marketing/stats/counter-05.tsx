import { Card } from '@/components/ui/card';
import { ArrowRight, type LucideIcon } from 'lucide-react';
import { ShoppingBag, Users, Globe, Award } from 'lucide-react';

interface CounterStatProps {
	icon: LucideIcon;
	value: string;
	label: string;
}

const CounterStat = ({ icon: Icon, value, label }: CounterStatProps) => (
	<Card className="group relative overflow-hidden p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 @md:p-8">
		<div className="absolute -right-6 -top-6 size-24 rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:from-primary/20" />
		<div className="relative">
			<div className="mb-4 inline-flex rounded-xl bg-secondary p-3 ring-1 ring-border transition-all duration-300 group-hover:ring-primary/30">
				<Icon className="size-5 text-primary" />
			</div>
			<p className="text-4xl font-bold tracking-tighter @sm:text-5xl">
				{value}
			</p>
			<div className="mt-3 flex items-center gap-2">
				<p className="text-sm text-muted-foreground">{label}</p>
				<ArrowRight className="size-4 text-primary opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
			</div>
		</div>
	</Card>
);

export default function Main() {
	const stats: CounterStatProps[] = [
		{ icon: ShoppingBag, value: '8.4M', label: 'Orders Completed' },
		{ icon: Users, value: '2.1M', label: 'Active Customers' },
		{ icon: Globe, value: '195', label: 'Countries Served' },
		{ icon: Award, value: '4.9', label: 'Average Rating' },
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-4 @sm:grid-cols-2 @lg:gap-6 @xl:grid-cols-4">
					{stats.map((stat, i) => (
						<CounterStat key={i} {...stat} />
					))}
				</div>
			</div>
		</section>
	);
}
