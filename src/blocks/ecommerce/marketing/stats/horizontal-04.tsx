import { Separator } from '@/components/ui/separator';
import { Store, Globe, Smartphone, Mail, type LucideIcon } from 'lucide-react';

interface StatItemProps {
	icon: LucideIcon;
	value: string;
	label: string;
}

const StatItem = ({ icon: Icon, value, label }: StatItemProps) => (
	<div className="group flex flex-col items-center gap-3 text-center">
		<div className="rounded-full bg-secondary p-3 ring-1 ring-border transition-all duration-300 group-hover:ring-primary/30 group-hover:bg-primary/5">
			<Icon className="size-5 text-primary" />
		</div>
		<div>
			<p className="text-3xl font-bold tracking-tight @sm:text-4xl">{value}</p>
			<p className="mt-1 text-sm text-muted-foreground">{label}</p>
		</div>
	</div>
);

export default function Main() {
	const stats: StatItemProps[] = [
		{ icon: Store, value: '847', label: 'Retail Partners' },
		{ icon: Globe, value: '42M', label: 'Website Visits' },
		{ icon: Smartphone, value: '8.4M', label: 'App Downloads' },
		{ icon: Mail, value: '2.1M', label: 'Subscribers' },
	];

	return (
		<section className="@container bg-secondary/30" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="flex flex-col items-center justify-between gap-8 @md:flex-row @md:gap-12">
					{stats.map((stat, i) => (
						<div key={i} className="flex flex-1 items-center gap-8 @md:gap-12">
							<StatItem {...stat} />
							{i < stats.length - 1 && (
								<Separator
									orientation="vertical"
									className="hidden h-20 @md:block"
								/>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
