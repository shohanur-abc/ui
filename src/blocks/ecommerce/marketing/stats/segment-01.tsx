import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
	Users,
	DollarSign,
	ShoppingCart,
	TrendingUp,
	Star,
} from 'lucide-react';

interface SegmentStatProps {
	name: string;
	avatar: string;
	customers: string;
	revenue: string;
	avgOrder: string;
	growth: string;
}

const SegmentCard = ({
	name,
	avatar,
	customers,
	revenue,
	avgOrder,
	growth,
}: SegmentStatProps) => (
	<Card className="group p-5 transition-all duration-300 hover:shadow-md">
		<div className="flex items-center gap-3">
			<Avatar className="size-10">
				<AvatarImage src={avatar} alt={name} />
				<AvatarFallback>{name[0]}</AvatarFallback>
			</Avatar>
			<div className="flex-1">
				<p className="font-semibold">{name}</p>
				<p className="text-xs text-muted-foreground">{customers} customers</p>
			</div>
			<Badge variant="outline">{growth}</Badge>
		</div>
		<Separator className="my-4" />
		<div className="grid grid-cols-2 gap-4">
			<div>
				<p className="text-xs text-muted-foreground">Revenue</p>
				<p className="text-lg font-bold">{revenue}</p>
			</div>
			<div>
				<p className="text-xs text-muted-foreground">Avg. Order</p>
				<p className="text-lg font-bold">{avgOrder}</p>
			</div>
		</div>
	</Card>
);

export default function Main() {
	const segments: SegmentStatProps[] = [
		{
			name: 'VIP Customers',
			avatar: '/avatars/vip.jpg',
			customers: '847',
			revenue: '$284K',
			avgOrder: '$335',
			growth: '+24%',
		},
		{
			name: 'Regular Shoppers',
			avatar: '/avatars/regular.jpg',
			customers: '4,284',
			revenue: '$524K',
			avgOrder: '$122',
			growth: '+12%',
		},
		{
			name: 'New Customers',
			avatar: '/avatars/new.jpg',
			customers: '2,847',
			revenue: '$184K',
			avgOrder: '$65',
			growth: '+42%',
		},
		{
			name: 'At-Risk',
			avatar: '/avatars/risk.jpg',
			customers: '1,284',
			revenue: '$42K',
			avgOrder: '$33',
			growth: '-8%',
		},
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-4 @sm:grid-cols-2 @lg:gap-6 @2xl:grid-cols-4">
					{segments.map((segment, i) => (
						<SegmentCard key={i} {...segment} />
					))}
				</div>
			</div>
		</section>
	);
}
