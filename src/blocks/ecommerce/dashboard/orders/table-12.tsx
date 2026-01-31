import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Star, MessageSquare, ThumbsUp, ThumbsDown, Flag } from 'lucide-react';

interface Order {
	id: string;
	customer: { name: string; avatar: string; initials: string };
	product: string;
	rating: number;
	review?: string;
	sentiment: 'positive' | 'neutral' | 'negative';
	date: string;
}

interface RatingStarsProps {
	rating: number;
	maxRating?: number;
}

interface SentimentBadgeProps {
	sentiment: Order['sentiment'];
}

interface CustomerCellProps {
	customer: Order['customer'];
}

const RatingStars = ({ rating, maxRating = 5 }: RatingStarsProps) => (
	<div className="flex items-center gap-0.5">
		{Array.from({ length: maxRating }, (_, i) => (
			<Star
				key={i}
				className={`size-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'}`}
			/>
		))}
		<span className="ml-1.5 text-sm font-medium">{rating}.0</span>
	</div>
);

const SentimentBadge = ({ sentiment }: SentimentBadgeProps) => {
	const config: Record<Order['sentiment'], { icon: typeof ThumbsUp; variant: 'default' | 'secondary' | 'destructive'; label: string }> = {
		positive: { icon: ThumbsUp, variant: 'default', label: 'Positive' },
		neutral: { icon: MessageSquare, variant: 'secondary', label: 'Neutral' },
		negative: { icon: ThumbsDown, variant: 'destructive', label: 'Negative' },
	};
	const { icon: Icon, variant, label } = config[sentiment];
	return (
		<Badge variant={variant} className="gap-1">
			<Icon className="size-3" />
			{label}
		</Badge>
	);
};

const CustomerCell = ({ customer }: CustomerCellProps) => (
	<div className="flex items-center gap-3">
		<Avatar className="size-8">
			<AvatarImage src={customer.avatar} alt={customer.name} />
			<AvatarFallback className="bg-primary/10 text-primary text-xs">
				{customer.initials}
			</AvatarFallback>
		</Avatar>
		<span className="font-medium">{customer.name}</span>
	</div>
);

const ReviewCell = ({ review }: { review?: string }) => (
	<div className="max-w-xs">
		{review ? (
			<p className="text-sm text-muted-foreground line-clamp-2">{review}</p>
		) : (
			<span className="text-sm text-muted-foreground/50 italic">No review provided</span>
		)}
	</div>
);

const OrderRow = ({ order }: { order: Order }) => (
	<TableRow className="hover:bg-muted/30 transition-colors">
		<TableCell className="font-mono text-sm">{order.id}</TableCell>
		<TableCell>
			<CustomerCell customer={order.customer} />
		</TableCell>
		<TableCell className="font-medium">{order.product}</TableCell>
		<TableCell>
			<RatingStars rating={order.rating} />
		</TableCell>
		<TableCell>
			<ReviewCell review={order.review} />
		</TableCell>
		<TableCell>
			<SentimentBadge sentiment={order.sentiment} />
		</TableCell>
		<TableCell className="text-muted-foreground">{order.date}</TableCell>
		<TableCell>
			<Button variant="ghost" size="icon-sm" className="hover:bg-destructive/10 hover:text-destructive">
				<Flag className="size-4" />
			</Button>
		</TableCell>
	</TableRow>
);

export default function Main() {
	const orders: Order[] = [
		{
			id: 'REV-001',
			customer: { name: 'Amanda Foster', avatar: '', initials: 'AF' },
			product: 'Wireless Headphones Pro',
			rating: 5,
			review: 'Absolutely love these headphones! The sound quality is incredible and the battery life exceeds expectations.',
			sentiment: 'positive',
			date: 'Jan 28',
		},
		{
			id: 'REV-002',
			customer: { name: 'Brian Murphy', avatar: '', initials: 'BM' },
			product: 'Smart Watch Ultra',
			rating: 4,
			review: 'Great watch overall. The fitness tracking is accurate but the app could use some improvements.',
			sentiment: 'positive',
			date: 'Jan 28',
		},
		{
			id: 'REV-003',
			customer: { name: 'Catherine Lee', avatar: '', initials: 'CL' },
			product: 'USB-C Hub',
			rating: 3,
			review: 'Does the job but nothing special. Wish it had more ports.',
			sentiment: 'neutral',
			date: 'Jan 27',
		},
		{
			id: 'REV-004',
			customer: { name: 'Daniel Kim', avatar: '', initials: 'DK' },
			product: 'Laptop Stand',
			rating: 2,
			review: 'Disappointed with the build quality. Started wobbling after a week of use.',
			sentiment: 'negative',
			date: 'Jan 27',
		},
		{
			id: 'REV-005',
			customer: { name: 'Elena Rossi', avatar: '', initials: 'ER' },
			product: 'Mechanical Keyboard',
			rating: 5,
			sentiment: 'positive',
			date: 'Jan 26',
		},
	];

	const headers = ['Order', 'Customer', 'Product', 'Rating', 'Review', 'Sentiment', 'Date', ''];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<div className="rounded-xl border border-border/50 overflow-hidden bg-card/50 backdrop-blur-sm">
					<div className="p-4 border-b border-border/50">
						<h2 className="text-lg font-semibold">Order Reviews</h2>
						<p className="text-sm text-muted-foreground">Customer feedback for completed orders</p>
					</div>
					<Table>
						<TableHeader>
							<TableRow className="bg-muted/20 hover:bg-muted/20 border-border/50">
								{headers.map((header) => (
									<TableHead key={header}>{header}</TableHead>
								))}
							</TableRow>
						</TableHeader>
						<TableBody>
							{orders.map((order) => (
								<OrderRow key={order.id} order={order} />
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</section>
	);
}
