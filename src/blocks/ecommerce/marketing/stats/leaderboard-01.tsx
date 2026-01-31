import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Crown, Medal, Award } from 'lucide-react';

interface LeaderStatProps {
	rank: number;
	name: string;
	avatar: string;
	sales: string;
	orders: number;
	badge?: string;
}

const LeaderStat = ({ rank, name, avatar, sales, orders, badge }: LeaderStatProps) => {
	const RankIcon = rank === 1 ? Crown : rank === 2 ? Medal : Award;
	const rankColors = {
		1: 'text-yellow-500',
		2: 'text-gray-400',
		3: 'text-amber-600',
	};

	return (
		<Card className={`group relative overflow-hidden p-6 transition-all duration-300 hover:shadow-lg ${rank === 1 ? 'border-primary/30 bg-primary/5' : ''}`}>
			{rank <= 3 && (
				<RankIcon className={`absolute right-4 top-4 size-6 ${rankColors[rank as keyof typeof rankColors]}`} />
			)}
			<div className="flex items-center gap-4">
				<div className="relative">
					<Avatar className="size-14">
						<AvatarImage src={avatar} alt={name} />
						<AvatarFallback>{name[0]}</AvatarFallback>
					</Avatar>
					<div className="absolute -bottom-1 -right-1 flex size-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
						{rank}
					</div>
				</div>
				<div className="flex-1">
					<p className="font-semibold">{name}</p>
					<p className="text-sm text-muted-foreground">{orders} orders</p>
				</div>
				<div className="text-right">
					<p className="text-xl font-bold">{sales}</p>
					{badge && <Badge variant="secondary" className="mt-1 text-[10px]">{badge}</Badge>}
				</div>
			</div>
		</Card>
	);
};

export default function Main() {
	const stats: LeaderStatProps[] = [
		{ rank: 1, name: 'Sarah Johnson', avatar: '/placeholder.svg', sales: '$48,294', orders: 284, badge: 'Top Seller' },
		{ rank: 2, name: 'Mike Chen', avatar: '/placeholder.svg', sales: '$42,847', orders: 247 },
		{ rank: 3, name: 'Emily Davis', avatar: '/placeholder.svg', sales: '$38,294', orders: 198 },
		{ rank: 4, name: 'Alex Rivera', avatar: '/placeholder.svg', sales: '$32,847', orders: 167 },
		{ rank: 5, name: 'Jordan Lee', avatar: '/placeholder.svg', sales: '$28,294', orders: 142 },
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="space-y-3">
					{stats.map((stat, i) => (
						<LeaderStat key={i} {...stat} />
					))}
				</div>
			</div>
		</section>
	);
}
