import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	ArrowUpRight,
	Calendar,
	Heart,
	Package,
	RefreshCcw,
	Star,
	Truck,
} from 'lucide-react';
import Link from 'next/link';

const ProfileIdentity = ({
	src,
	fallback,
	name,
	memberSince,
	level,
}: {
	src: string;
	fallback: string;
	name: string;
	memberSince: string;
	level: string;
}) => (
	<div className="flex items-start gap-4">
		<Avatar className="size-16 @md:size-20">
			<AvatarImage src={src} alt={name} />
			<AvatarFallback className="bg-primary text-primary-foreground">
				{fallback}
			</AvatarFallback>
		</Avatar>
		<div className="flex-1 space-y-1">
			<div className="flex items-center gap-2 flex-wrap">
				<h2 className="text-lg font-semibold">{name}</h2>
				<Badge variant="outline" className="text-xs">
					{level}
				</Badge>
			</div>
			<div className="flex items-center gap-1 text-sm text-muted-foreground">
				<Calendar className="size-3" />
				<span>Member since {memberSince}</span>
			</div>
		</div>
	</div>
);

const RecentActivity = ({
	items,
}: {
	items: { icon: React.ElementType; title: string; description: string; time: string; status?: string; statusColor?: string }[];
}) => (
	<div className="space-y-3">
		<div className="flex items-center justify-between">
			<h3 className="text-sm font-medium">Recent Activity</h3>
			<Button variant="ghost" size="sm" className="gap-1 text-xs" asChild>
				<Link href="/activity">
					View All <ArrowUpRight className="size-3" />
				</Link>
			</Button>
		</div>
		<div className="space-y-3">
			{items.map((activity, i) => (
				<div
					key={i}
					className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
				>
					<div className="p-2 rounded-md bg-background">
						<activity.icon className="size-4 text-muted-foreground" />
					</div>
					<div className="flex-1 min-w-0">
						<p className="text-sm font-medium truncate">{activity.title}</p>
						<p className="text-xs text-muted-foreground">{activity.description}</p>
					</div>
					<div className="text-right shrink-0">
						<p className="text-xs text-muted-foreground">{activity.time}</p>
						{activity.status && (
							<Badge variant="secondary" className={`text-xs mt-1 ${activity.statusColor}`}>
								{activity.status}
							</Badge>
						)}
					</div>
				</div>
			))}
		</div>
	</div>
);

const QuickLinks = ({
	items,
}: {
	items: { icon: React.ElementType; label: string; value: string; href: string }[];
}) => (
	<div className="grid grid-cols-2 @sm:grid-cols-4 gap-3">
		{items.map((link, i) => (
			<Link
				key={i}
				href={link.href}
				className="group flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/30 hover:bg-muted transition-colors"
			>
				<link.icon className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
				<div className="text-center">
					<p className="text-lg font-bold">{link.value}</p>
					<p className="text-xs text-muted-foreground">{link.label}</p>
				</div>
			</Link>
		))}
	</div>
);

export default function Main() {
	const profileData = {
		identity: {
			src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
			fallback: 'DP',
			name: 'David Park',
			memberSince: 'Mar 2023',
			level: 'VIP',
		},
		recentActivity: [
			{
				icon: Package,
				title: 'Order #12847',
				description: 'Premium Wireless Headphones',
				time: '2h ago',
				status: 'Shipped',
				statusColor: 'bg-green-500/20 text-green-600',
			},
			{
				icon: Star,
				title: 'Review Submitted',
				description: 'Smart Watch Pro - 5 stars',
				time: '1d ago',
			},
			{
				icon: RefreshCcw,
				title: 'Return Initiated',
				description: 'Laptop Stand - Size exchange',
				time: '3d ago',
				status: 'Processing',
				statusColor: 'bg-amber-500/20 text-amber-600',
			},
		],
		quickLinks: [
			{ icon: Package, label: 'Orders', value: '24', href: '/orders' },
			{ icon: Heart, label: 'Wishlist', value: '8', href: '/wishlist' },
			{ icon: Star, label: 'Reviews', value: '15', href: '/reviews' },
			{ icon: Truck, label: 'Tracking', value: '2', href: '/tracking' },
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-lg px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<Card>
					<CardHeader>
						<ProfileIdentity {...profileData.identity} />
					</CardHeader>
					<CardContent className="space-y-6">
						<QuickLinks items={profileData.quickLinks} />
						<Separator />
						<RecentActivity items={profileData.recentActivity} />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
