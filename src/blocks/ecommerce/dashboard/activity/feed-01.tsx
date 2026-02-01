import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	ShoppingCart,
	Heart,
	Eye,
	MessageCircle,
	Share2,
	MoreHorizontal,
	type LucideIcon,
} from 'lucide-react';

interface FeedItem {
	id: string;
	type: 'purchase' | 'wishlist' | 'view' | 'review' | 'share';
	user: {
		name: string;
		avatar?: string;
		initials: string;
	};
	content: string;
	product?: {
		name: string;
		image?: string;
		price?: string;
	};
	timestamp: string;
	engagement?: {
		likes: number;
		comments: number;
	};
}

interface ActivityFeedProps {
	title: string;
	items: FeedItem[];
}

const FeedTypeIcon = ({ type }: { type: FeedItem['type'] }) => {
	const config: Record<
		FeedItem['type'],
		{ icon: LucideIcon; className: string }
	> = {
		purchase: { icon: ShoppingCart, className: 'text-emerald-400' },
		wishlist: { icon: Heart, className: 'text-pink-400' },
		view: { icon: Eye, className: 'text-blue-400' },
		review: { icon: MessageCircle, className: 'text-purple-400' },
		share: { icon: Share2, className: 'text-amber-400' },
	};

	const { icon: Icon, className } = config[type];

	return <Icon className={`size-4 ${className}`} />;
};

const ProductPreview = ({ product }: { product: FeedItem['product'] }) => {
	if (!product) return null;

	return (
		<div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border/50 mt-3">
			<div className="size-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
				{product.image ? (
					<img
						src={product.image}
						alt={product.name}
						className="size-full object-cover"
					/>
				) : (
					<ShoppingCart className="size-5 text-muted-foreground" />
				)}
			</div>
			<div className="flex flex-col min-w-0">
				<span className="font-medium text-foreground text-sm truncate">
					{product.name}
				</span>
				{product.price && (
					<span className="text-xs text-primary font-semibold">
						{product.price}
					</span>
				)}
			</div>
		</div>
	);
};

const EngagementBar = ({
	engagement,
}: {
	engagement?: FeedItem['engagement'];
}) => {
	if (!engagement) return null;

	return (
		<div className="flex items-center gap-4 mt-3 pt-3 border-t border-border/50">
			<button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
				<Heart className="size-4" />
				<span>{engagement.likes}</span>
			</button>
			<button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
				<MessageCircle className="size-4" />
				<span>{engagement.comments}</span>
			</button>
			<button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors ml-auto">
				<Share2 className="size-4" />
			</button>
		</div>
	);
};

const FeedCard = ({ item }: { item: FeedItem }) => (
	<div className="group rounded-xl border border-border/50 bg-card/80 p-4 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
		<div className="flex items-start gap-3">
			<Avatar className="size-10 ring-2 ring-border">
				<AvatarImage src={item.user.avatar} alt={item.user.name} />
				<AvatarFallback className="bg-primary/20 text-primary">
					{item.user.initials}
				</AvatarFallback>
			</Avatar>
			<div className="flex-1 min-w-0">
				<div className="flex items-start justify-between gap-2">
					<div className="flex items-center gap-2 flex-wrap">
						<span className="font-medium text-foreground">
							{item.user.name}
						</span>
						<FeedTypeIcon type={item.type} />
						<span className="text-xs text-muted-foreground">
							{item.timestamp}
						</span>
					</div>
					<Button
						variant="ghost"
						size="icon-sm"
						className="opacity-0 group-hover:opacity-100 transition-opacity"
					>
						<MoreHorizontal className="size-4" />
					</Button>
				</div>
				<p className="text-sm text-muted-foreground mt-1">{item.content}</p>
				<ProductPreview product={item.product} />
				<EngagementBar engagement={item.engagement} />
			</div>
		</div>
	</div>
);

const ActivityFeed = ({ title, items }: ActivityFeedProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold">{title}</CardTitle>
			<div className="flex items-center gap-2">
				<Badge variant="outline" className="border-primary/30 text-primary">
					{items.length} new
				</Badge>
				<Button variant="ghost" size="sm">
					Mark all read
				</Button>
			</div>
		</CardHeader>
		<CardContent className="p-0">
			<ScrollArea className="h-[600px]">
				<div className="space-y-4 p-6">
					{items.map((item) => (
						<FeedCard key={item.id} item={item} />
					))}
				</div>
			</ScrollArea>
		</CardContent>
	</Card>
);

export default function Main() {
	const feedItems: FeedItem[] = [
		{
			id: '1',
			type: 'purchase',
			user: { name: 'Emma Thompson', initials: 'ET' },
			content: 'Just purchased their first item!',
			product: {
				name: 'Premium Wireless Headphones',
				price: '$299.00',
			},
			timestamp: '2 min ago',
			engagement: { likes: 12, comments: 3 },
		},
		{
			id: '2',
			type: 'review',
			user: { name: 'James Wilson', initials: 'JW' },
			content:
				'Left a 5-star review: "Absolutely love this product! The quality exceeded my expectations."',
			product: {
				name: 'Smart Watch Pro',
				price: '$449.00',
			},
			timestamp: '15 min ago',
			engagement: { likes: 24, comments: 8 },
		},
		{
			id: '3',
			type: 'wishlist',
			user: { name: 'Sarah Chen', initials: 'SC' },
			content: 'Added 3 items to their wishlist',
			timestamp: '32 min ago',
		},
		{
			id: '4',
			type: 'share',
			user: { name: 'Michael Brown', initials: 'MB' },
			content: 'Shared a product with 5 friends',
			product: {
				name: 'Portable Bluetooth Speaker',
				price: '$89.00',
			},
			timestamp: '1 hour ago',
			engagement: { likes: 8, comments: 2 },
		},
		{
			id: '5',
			type: 'view',
			user: { name: 'Lisa Anderson', initials: 'LA' },
			content: 'Viewed your product page 4 times in the last hour',
			product: {
				name: 'Ergonomic Office Chair',
				price: '$549.00',
			},
			timestamp: '1 hour ago',
		},
		{
			id: '6',
			type: 'purchase',
			user: { name: 'David Kim', initials: 'DK' },
			content: 'Completed a bulk order of 10 items',
			product: {
				name: 'USB-C Charging Cable (10-pack)',
				price: '$79.99',
			},
			timestamp: '2 hours ago',
			engagement: { likes: 5, comments: 1 },
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-2xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<ActivityFeed title="Activity Feed" items={feedItems} />
			</div>
		</section>
	);
}
