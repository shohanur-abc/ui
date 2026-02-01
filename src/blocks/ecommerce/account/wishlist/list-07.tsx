import Link from 'next/link';
import {
	Heart,
	ShoppingCart,
	X,
	Calendar,
	Clock,
	AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	addedDate: string;
	daysAgo: number;
	urgency?: 'expiring' | 'limited';
	href: string;
}

interface GroupedItems {
	today: WishlistItem[];
	thisWeek: WishlistItem[];
	thisMonth: WishlistItem[];
	older: WishlistItem[];
}

const UrgencyIndicator = ({
	urgency,
}: {
	urgency?: 'expiring' | 'limited';
}) => {
	if (!urgency) return null;

	const config = {
		expiring: {
			label: 'Deal Expiring',
			className: 'text-amber-600 bg-amber-100',
		},
		limited: { label: 'Low Stock', className: 'text-red-600 bg-red-100' },
	};

	return (
		<Badge variant="outline" className={config[urgency].className}>
			<AlertCircle className="size-3 mr-1" />
			{config[urgency].label}
		</Badge>
	);
};

const TimelineItem = ({ item }: { item: WishlistItem }) => (
	<div className="flex gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors group">
		<div className="size-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
			<img
				src={item.image}
				alt={item.name}
				className="size-full object-cover"
			/>
		</div>
		<div className="flex-1 min-w-0">
			<div className="flex items-start justify-between gap-2">
				<div>
					<Link href={item.href}>
						<h4 className="font-medium line-clamp-1 group-hover:text-primary transition-colors">
							{item.name}
						</h4>
					</Link>
					<div className="flex items-center gap-2 mt-1">
						<span className="text-lg font-bold">${item.price.toFixed(2)}</span>
						<UrgencyIndicator urgency={item.urgency} />
					</div>
				</div>
				<div className="flex gap-1">
					<Button size="icon-sm" variant="ghost">
						<ShoppingCart className="size-4" />
					</Button>
					<Button size="icon-sm" variant="ghost" className="text-destructive">
						<X className="size-4" />
					</Button>
				</div>
			</div>
		</div>
	</div>
);

const TimelineGroup = ({
	title,
	items,
	icon: Icon,
}: {
	title: string;
	items: WishlistItem[];
	icon: React.ElementType;
}) => {
	if (items.length === 0) return null;

	return (
		<div className="mb-6">
			<div className="flex items-center gap-2 mb-3">
				<div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
					<Icon className="size-4 text-primary" />
				</div>
				<h3 className="font-semibold">{title}</h3>
				<Badge variant="secondary">{items.length}</Badge>
			</div>
			<Card className="divide-y">
				{items.map((item) => (
					<TimelineItem key={item.id} item={item} />
				))}
			</Card>
		</div>
	);
};

const Timeline = ({ groups }: { groups: GroupedItems }) => (
	<div>
		<TimelineGroup title="Added Today" items={groups.today} icon={Clock} />
		<TimelineGroup title="This Week" items={groups.thisWeek} icon={Calendar} />
		<TimelineGroup
			title="This Month"
			items={groups.thisMonth}
			icon={Calendar}
		/>
		<TimelineGroup title="Older Items" items={groups.older} icon={Calendar} />
	</div>
);

export default function Main() {
	const groupedItems: GroupedItems = {
		today: [
			{
				id: '1',
				name: 'Wireless Gaming Mouse',
				price: 79.99,
				image:
					'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop',
				addedDate: 'Today',
				daysAgo: 0,
				urgency: 'limited',
				href: '/product/1',
			},
		],
		thisWeek: [
			{
				id: '2',
				name: 'Mechanical Keyboard',
				price: 149.99,
				image:
					'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=100&h=100&fit=crop',
				addedDate: '3 days ago',
				daysAgo: 3,
				href: '/product/2',
			},
			{
				id: '3',
				name: 'USB-C Hub',
				price: 49.99,
				image:
					'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop',
				addedDate: '5 days ago',
				daysAgo: 5,
				urgency: 'expiring',
				href: '/product/3',
			},
		],
		thisMonth: [
			{
				id: '4',
				name: '27" 4K Monitor',
				price: 449.99,
				image:
					'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=100&h=100&fit=crop',
				addedDate: '2 weeks ago',
				daysAgo: 14,
				href: '/product/4',
			},
		],
		older: [
			{
				id: '5',
				name: 'Standing Desk',
				price: 599.99,
				image:
					'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=100&h=100&fit=crop',
				addedDate: '2 months ago',
				daysAgo: 60,
				href: '/product/5',
			},
		],
	};

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<h1 className="text-2xl @md:text-3xl font-bold mb-2">
					Wishlist Timeline
				</h1>
				<p className="text-muted-foreground mb-6">
					Organized by when you added them
				</p>
				<Timeline groups={groupedItems} />
			</div>
		</section>
	);
}
