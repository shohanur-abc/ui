import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Calendar,
	Edit,
	Heart,
	Mail,
	MapPin,
	Package,
	Phone,
	Settings,
	Star,
} from 'lucide-react';
import Link from 'next/link';

const ProfileSidebar = ({
	src,
	fallback,
	name,
	status,
	memberSince,
}: {
	src: string;
	fallback: string;
	name: string;
	status: string;
	memberSince: string;
}) => (
	<div className="flex flex-col items-center text-center space-y-4 p-6 bg-gradient-to-b from-primary/10 to-transparent rounded-xl">
		<Avatar className="size-24 @lg:size-32 ring-4 ring-background shadow-xl">
			<AvatarImage src={src} alt={name} />
			<AvatarFallback className="bg-primary text-primary-foreground text-2xl @lg:text-3xl">
				{fallback}
			</AvatarFallback>
		</Avatar>
		<div className="space-y-2">
			<h2 className="text-xl @lg:text-2xl font-bold">{name}</h2>
			<Badge variant="secondary">{status}</Badge>
		</div>
		<div className="flex items-center gap-1 text-sm text-muted-foreground">
			<Calendar className="size-4" />
			<span>Member since {memberSince}</span>
		</div>
		<div className="flex gap-2 w-full">
			<Button variant="default" className="flex-1 gap-2" asChild>
				<Link href="/profile/edit">
					<Edit className="size-4" />
					Edit
				</Link>
			</Button>
			<Button variant="outline" size="icon" asChild>
				<Link href="/settings">
					<Settings className="size-4" />
				</Link>
			</Button>
		</div>
	</div>
);

const StatsGrid = ({
	items,
}: {
	items: {
		icon: React.ElementType;
		label: string;
		value: string;
		color: string;
	}[];
}) => (
	<div className="grid grid-cols-3 gap-3">
		{items.map((stat, i) => (
			<div
				key={i}
				className="text-center p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
			>
				<stat.icon className={`size-5 mx-auto mb-2 ${stat.color}`} />
				<p className="text-lg font-bold">{stat.value}</p>
				<p className="text-xs text-muted-foreground">{stat.label}</p>
			</div>
		))}
	</div>
);

const ContactInfo = ({
	items,
}: {
	items: { icon: React.ElementType; label: string; value: string }[];
}) => (
	<div className="space-y-3">
		<h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
			Contact Information
		</h3>
		<div className="space-y-2">
			{items.map((item, i) => (
				<div
					key={i}
					className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors"
				>
					<div className="p-2 rounded-md bg-muted">
						<item.icon className="size-4 text-muted-foreground" />
					</div>
					<div className="flex-1 min-w-0">
						<p className="text-xs text-muted-foreground">{item.label}</p>
						<p className="text-sm font-medium truncate">{item.value}</p>
					</div>
				</div>
			))}
		</div>
	</div>
);

export default function Main() {
	const profileData = {
		sidebar: {
			src: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
			fallback: 'JB',
			name: 'James Bennett',
			status: 'Premium Member',
			memberSince: 'Jan 2023',
		},
		stats: [
			{ icon: Package, label: 'Orders', value: '47', color: 'text-blue-500' },
			{ icon: Heart, label: 'Wishlist', value: '12', color: 'text-pink-500' },
			{ icon: Star, label: 'Reviews', value: '28', color: 'text-amber-500' },
		],
		contact: [
			{ icon: Mail, label: 'Email', value: 'james.b@example.com' },
			{ icon: Phone, label: 'Phone', value: '+1 (555) 987-6543' },
			{
				icon: MapPin,
				label: 'Address',
				value: '123 Main St, Boston, MA 02101',
			},
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<Card>
					<CardContent className="p-6">
						<div className="grid @lg:grid-cols-[280px_1fr] gap-6 @lg:gap-8">
							<ProfileSidebar {...profileData.sidebar} />
							<div className="space-y-6">
								<StatsGrid items={profileData.stats} />
								<Separator />
								<ContactInfo items={profileData.contact} />
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
