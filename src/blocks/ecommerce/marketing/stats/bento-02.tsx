import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Wallet, Users, Star, ShoppingCart } from 'lucide-react';

interface MainStatProps {
	label: string;
	value: string;
	subtitle: string;
	progress: number;
}

interface SmallStatProps {
	icon: React.ElementType;
	label: string;
	value: string;
	badge: string;
}

const MainStatCard = ({ label, value, subtitle, progress }: MainStatProps) => (
	<Card className="group relative overflow-hidden p-8 @md:col-span-2 @md:row-span-2">
		<div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/[0.02] to-transparent" />
		<div className="relative flex h-full flex-col justify-between">
			<Badge variant="secondary" className="w-fit">
				{label}
			</Badge>
			<div className="my-8 space-y-4">
				<p className="text-6xl font-bold tracking-tighter @lg:text-7xl">
					{value}
				</p>
				<Progress value={progress} className="h-2 w-full max-w-xs" />
				<p className="text-sm text-muted-foreground">{subtitle}</p>
			</div>
		</div>
	</Card>
);

const SmallStatCard = ({ icon: Icon, label, value, badge }: SmallStatProps) => (
	<Card className="group relative overflow-hidden p-5 transition-all duration-300 hover:border-primary/30">
		<div className="flex flex-col gap-3">
			<div className="flex items-center justify-between">
				<div className="rounded-lg bg-secondary p-2">
					<Icon className="size-4 text-primary" />
				</div>
				<Badge variant="outline" className="text-[10px]">
					{badge}
				</Badge>
			</div>
			<div className="space-y-1">
				<p className="text-2xl font-bold tracking-tight">{value}</p>
				<p className="text-xs text-muted-foreground">{label}</p>
			</div>
		</div>
	</Card>
);

export default function Main() {
	const mainStat: MainStatProps = {
		label: 'Total Revenue',
		value: '$2.4M',
		subtitle: '87% of annual target achieved',
		progress: 87,
	};

	const smallStats: SmallStatProps[] = [
		{ icon: Wallet, label: 'Avg. Order Value', value: '$284', badge: '+12%' },
		{ icon: Users, label: 'New Customers', value: '4,821', badge: '+28%' },
		{ icon: Star, label: 'Reviews', value: '12.4K', badge: '+8%' },
		{ icon: ShoppingCart, label: 'Orders', value: '8,492', badge: '+15%' },
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-4 @md:grid-cols-2 @lg:gap-6 @xl:grid-cols-4">
					<MainStatCard {...mainStat} />
					{smallStats.map((stat, i) => (
						<SmallStatCard key={i} {...stat} />
					))}
				</div>
			</div>
		</section>
	);
}
