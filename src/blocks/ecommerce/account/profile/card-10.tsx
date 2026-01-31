import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardHeader,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
	Activity,
	Award,
	BarChart3,
	Calendar,
	Flame,
	Heart,
	Medal,
	ShoppingBag,
	Star,
	TrendingUp,
} from 'lucide-react';

const ProfileWithBadge = ({
	src,
	fallback,
	name,
	tier,
	tierIcon: TierIcon,
	tierColor,
}: {
	src: string;
	fallback: string;
	name: string;
	tier: string;
	tierIcon: React.ElementType;
	tierColor: string;
}) => (
	<div className="flex items-center gap-4">
		<Avatar className="size-16">
			<AvatarImage src={src} alt={name} />
			<AvatarFallback className="bg-primary text-primary-foreground text-lg">
				{fallback}
			</AvatarFallback>
		</Avatar>
		<div>
			<h2 className="text-lg font-semibold">{name}</h2>
			<Badge className={`gap-1 ${tierColor}`}>
				<TierIcon className="size-3" />
				{tier}
			</Badge>
		</div>
	</div>
);

const MonthlyStats = ({
	stats,
}: {
	stats: { label: string; value: string; change: string; positive: boolean }[];
}) => (
	<div className="grid grid-cols-2 gap-4">
		{stats.map((stat, i) => (
			<div key={i} className="p-3 rounded-lg bg-muted/30 space-y-1">
				<p className="text-xs text-muted-foreground">{stat.label}</p>
				<p className="text-xl font-bold">{stat.value}</p>
				<div className={`flex items-center gap-1 text-xs ${stat.positive ? 'text-green-500' : 'text-red-500'}`}>
					<TrendingUp className={`size-3 ${!stat.positive && 'rotate-180'}`} />
					{stat.change}
				</div>
			</div>
		))}
	</div>
);

const ShoppingInsights = ({
	categories,
}: {
	categories: { name: string; percentage: number; color: string }[];
}) => (
	<div className="space-y-3">
		<h3 className="text-sm font-medium">Shopping Insights</h3>
		<div className="space-y-3">
			{categories.map((cat, i) => (
				<div key={i} className="space-y-1">
					<div className="flex justify-between text-sm">
						<span>{cat.name}</span>
						<span className="text-muted-foreground">{cat.percentage}%</span>
					</div>
					<div className="h-2 bg-muted rounded-full overflow-hidden">
						<div
							className={`h-full rounded-full ${cat.color}`}
							style={{ width: `${cat.percentage}%` }}
						/>
					</div>
				</div>
			))}
		</div>
	</div>
);

const ActivityGraph = ({
	data,
}: {
	data: { day: string; value: number }[];
}) => {
	const max = Math.max(...data.map(d => d.value));
	return (
		<div className="space-y-3">
			<h3 className="text-sm font-medium">Weekly Activity</h3>
			<div className="flex items-end justify-between gap-2 h-20">
				{data.map((item, i) => (
					<div key={i} className="flex-1 flex flex-col items-center gap-1">
						<div
							className="w-full bg-primary/20 rounded-sm hover:bg-primary/40 transition-colors"
							style={{ height: `${(item.value / max) * 100}%`, minHeight: '4px' }}
						/>
						<span className="text-xs text-muted-foreground">{item.day}</span>
					</div>
				))}
			</div>
		</div>
	);
};

const Milestones = ({
	items,
}: {
	items: { icon: React.ElementType; label: string; current: number; target: number }[];
}) => (
	<div className="space-y-3">
		<h3 className="text-sm font-medium">Milestones</h3>
		<div className="space-y-4">
			{items.map((milestone, i) => (
				<div key={i} className="flex items-center gap-3">
					<div className="p-2 rounded-lg bg-muted">
						<milestone.icon className="size-4 text-muted-foreground" />
					</div>
					<div className="flex-1 space-y-1">
						<div className="flex justify-between text-sm">
							<span>{milestone.label}</span>
							<span className="text-muted-foreground">{milestone.current}/{milestone.target}</span>
						</div>
						<Progress value={(milestone.current / milestone.target) * 100} className="h-1.5" />
					</div>
				</div>
			))}
		</div>
	</div>
);

export default function Main() {
	const profileData = {
		profile: {
			src: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
			fallback: 'AN',
			name: 'Amanda Nelson',
			tier: 'Power Shopper',
			tierIcon: Flame,
			tierColor: 'bg-orange-500/20 text-orange-600 border-orange-500/30',
		},
		monthlyStats: [
			{ label: 'Total Spent', value: '$1,247', change: '+12%', positive: true },
			{ label: 'Orders', value: '8', change: '+2', positive: true },
			{ label: 'Points Earned', value: '2.4k', change: '+18%', positive: true },
			{ label: 'Savings', value: '$186', change: '+25%', positive: true },
		],
		categories: [
			{ name: 'Fashion', percentage: 45, color: 'bg-pink-500' },
			{ name: 'Electronics', percentage: 28, color: 'bg-blue-500' },
			{ name: 'Home & Living', percentage: 18, color: 'bg-green-500' },
			{ name: 'Other', percentage: 9, color: 'bg-gray-400' },
		],
		weeklyActivity: [
			{ day: 'M', value: 3 },
			{ day: 'T', value: 7 },
			{ day: 'W', value: 2 },
			{ day: 'T', value: 5 },
			{ day: 'F', value: 8 },
			{ day: 'S', value: 12 },
			{ day: 'S', value: 6 },
		],
		milestones: [
			{ icon: ShoppingBag, label: 'Complete 100 Orders', current: 78, target: 100 },
			{ icon: Star, label: 'Write 50 Reviews', current: 32, target: 50 },
			{ icon: Heart, label: 'Add 25 to Wishlist', current: 25, target: 25 },
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-md px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<Card>
					<CardHeader>
						<ProfileWithBadge {...profileData.profile} />
					</CardHeader>
					<CardContent className="space-y-6">
						<MonthlyStats stats={profileData.monthlyStats} />
						<Separator />
						<ShoppingInsights categories={profileData.categories} />
						<ActivityGraph data={profileData.weeklyActivity} />
						<Separator />
						<Milestones items={profileData.milestones} />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
