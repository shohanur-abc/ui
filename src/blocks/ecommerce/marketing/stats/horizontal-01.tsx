import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { TrendingUp } from 'lucide-react';

interface StatItemProps {
	value: string;
	label: string;
	change: string;
}

interface HeaderProps {
	badge: string;
	title: string;
}

const Header = ({ badge, title }: HeaderProps) => (
	<div className="flex flex-col items-center gap-4 text-center @md:flex-row @md:text-left">
		<Badge variant="secondary" className="gap-1.5">
			<TrendingUp className="size-3" />
			{badge}
		</Badge>
		<h2 className="text-2xl font-bold @sm:text-3xl">{title}</h2>
	</div>
);

const StatItem = ({ value, label, change }: StatItemProps) => (
	<div className="flex flex-col items-center gap-1 @md:items-start">
		<div className="flex items-baseline gap-2">
			<span className="text-3xl font-bold tracking-tight @sm:text-4xl">{value}</span>
			<Badge variant="outline" className="text-[10px] text-accent">{change}</Badge>
		</div>
		<span className="text-sm text-muted-foreground">{label}</span>
	</div>
);

export default function Main() {
	const header: HeaderProps = {
		badge: 'Live Stats',
		title: 'Real-time Performance',
	};

	const stats: StatItemProps[] = [
		{ value: '$847K', label: 'Today\'s Revenue', change: '+24%' },
		{ value: '4,284', label: 'Orders', change: '+18%' },
		{ value: '12.4K', label: 'Visitors', change: '+32%' },
		{ value: '3.8%', label: 'Conversion', change: '+0.6%' },
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="flex flex-col gap-8 @lg:flex-row @lg:items-center @lg:justify-between">
					<Header {...header} />
					<div className="flex flex-wrap items-center justify-center gap-8 @lg:gap-12">
						{stats.map((stat, i) => (
							<div key={i} className="flex items-center gap-8 @lg:gap-12">
								<StatItem {...stat} />
								{i < stats.length - 1 && (
									<Separator orientation="vertical" className="hidden h-12 @lg:block" />
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
