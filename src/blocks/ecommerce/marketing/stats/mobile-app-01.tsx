import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Smartphone, Download, Star, Users, TrendingUp } from 'lucide-react';

interface AppStatProps {
	icon: React.ElementType;
	label: string;
	value: string;
	change: string;
	positive: boolean;
}

const AppStat = ({
	icon: Icon,
	label,
	value,
	change,
	positive,
}: AppStatProps) => (
	<Card className="group p-5 transition-all duration-300 hover:shadow-md">
		<div className="flex items-center gap-3">
			<div className="rounded-lg bg-primary/10 p-2">
				<Icon className="size-4 text-primary" />
			</div>
			<span className="text-sm text-muted-foreground">{label}</span>
		</div>
		<div className="mt-4 flex items-end justify-between">
			<p className="text-2xl font-bold">{value}</p>
			<Badge variant={positive ? 'default' : 'destructive'}>{change}</Badge>
		</div>
	</Card>
);

export default function Main() {
	const stats: AppStatProps[] = [
		{
			icon: Download,
			label: 'Total Downloads',
			value: '248K',
			change: '+18%',
			positive: true,
		},
		{
			icon: Users,
			label: 'Active Users',
			value: '84,294',
			change: '+24%',
			positive: true,
		},
		{
			icon: Star,
			label: 'App Rating',
			value: '4.8',
			change: '+0.2',
			positive: true,
		},
		{
			icon: TrendingUp,
			label: 'DAU/MAU',
			value: '42%',
			change: '+5%',
			positive: true,
		},
		{
			icon: Smartphone,
			label: 'Sessions/User',
			value: '8.4',
			change: '+1.2',
			positive: true,
		},
	];

	const platforms = [
		{ name: 'iOS', downloads: '148K', percentage: 60 },
		{ name: 'Android', downloads: '100K', percentage: 40 },
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-6 @lg:grid-cols-4">
					<div className="grid gap-4 @sm:grid-cols-2 @lg:col-span-3 @xl:grid-cols-3">
						{stats.slice(0, 3).map((stat, i) => (
							<AppStat key={i} {...stat} />
						))}
					</div>
					<Card className="row-span-2 p-5">
						<h3 className="font-semibold">Platform Split</h3>
						<div className="mt-6 space-y-4">
							{platforms.map((platform, i) => (
								<div key={i}>
									<div className="flex justify-between text-sm">
										<span>{platform.name}</span>
										<span className="font-medium">{platform.downloads}</span>
									</div>
									<Progress value={platform.percentage} className="mt-1 h-2" />
								</div>
							))}
						</div>
					</Card>
					<div className="grid gap-4 @sm:grid-cols-2 @lg:col-span-3">
						{stats.slice(3).map((stat, i) => (
							<AppStat key={i} {...stat} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
