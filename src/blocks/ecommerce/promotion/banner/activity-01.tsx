import Link from 'next/link';
import { ArrowRight, Users, Eye, ShoppingCart, Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ActivityItem = ({
	icon: Icon,
	text,
	time,
	type,
}: {
	icon: React.ElementType;
	text: string;
	time: string;
	type: 'purchase' | 'view' | 'cart';
}) => (
	<div className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border/50">
		<div
			className={`size-8 rounded-full flex items-center justify-center ${
				type === 'purchase'
					? 'bg-green-500/10 text-green-500'
					: type === 'cart'
						? 'bg-blue-500/10 text-blue-500'
						: 'bg-yellow-500/10 text-yellow-500'
			}`}
		>
			<Icon className="size-4" />
		</div>
		<span className="text-sm flex-1">{text}</span>
		<span className="text-xs text-muted-foreground">{time}</span>
	</div>
);

const LiveActivityContent = ({
	badge,
	headline,
	activities,
}: {
	badge: { icon: React.ElementType; text: string };
	headline: string;
	activities: {
		icon: React.ElementType;
		text: string;
		time: string;
		type: 'purchase' | 'view' | 'cart';
	}[];
}) => (
	<div className="max-w-md mx-auto">
		<div className="flex items-center justify-center gap-2 mb-6">
			<span className="relative flex size-3">
				<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
				<span className="relative inline-flex rounded-full size-3 bg-green-500" />
			</span>
			<Badge className="bg-green-500/10 text-green-500 border-green-500/30 gap-1.5">
				<badge.icon className="size-3" />
				{badge.text}
			</Badge>
		</div>
		<h2 className="text-xl @sm:text-2xl font-bold text-center mb-6">
			{headline}
		</h2>
		<div className="space-y-2">
			{activities.map((activity, i) => (
				<ActivityItem key={i} {...activity} />
			))}
		</div>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="bg-background py-12 @md:py-16 px-4 @sm:px-6 @2xl:px-8 border-y border-border/50">
				<LiveActivityContent
					badge={{ icon: Zap, text: 'Live Activity' }}
					headline="Happening Right Now"
					activities={[
						{
							icon: ShoppingCart,
							text: 'Sarah just purchased Smart Watch Pro',
							time: 'Just now',
							type: 'purchase',
						},
						{
							icon: Eye,
							text: '24 people viewing Wireless Earbuds',
							time: '2 min ago',
							type: 'view',
						},
						{
							icon: ShoppingCart,
							text: 'Michael added Fitness Band to cart',
							time: '3 min ago',
							type: 'cart',
						},
						{
							icon: ShoppingCart,
							text: 'Emily just purchased Power Bank',
							time: '5 min ago',
							type: 'purchase',
						},
					]}
				/>
			</div>
		</section>
	);
}
