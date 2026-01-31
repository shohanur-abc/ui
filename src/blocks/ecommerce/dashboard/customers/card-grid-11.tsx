import {
	ArrowRight,
	Check,
	ChevronRight,
	Clock,
	ExternalLink,
	Flame,
	Gift,
	MessageCircle,
	MoreHorizontal,
	Percent,
	ShoppingBag,
	Sparkles,
	Star,
	Tag,
	Ticket,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface RecommendationCustomer {
	id: string;
	name: string;
	email: string;
	avatar?: string;
	initials: string;
	lastPurchase: string;
	totalSpent: string;
	recommendations: Array<{
		type: 'product' | 'offer' | 'reward' | 'message';
		title: string;
		description: string;
		confidence: number;
		priority: 'high' | 'medium' | 'low';
	}>;
	predictedNextPurchase: string;
	preferredCategories: string[];
	engagementScore: number;
}

const PriorityIcon = ({ priority }: { priority: 'high' | 'medium' | 'low' }) => {
	if (priority === 'high') return <Flame className="size-3.5 text-red-500" />;
	if (priority === 'medium') return <Sparkles className="size-3.5 text-amber-500" />;
	return <Tag className="size-3.5 text-muted-foreground" />;
};

const RecommendationTypeIcon = ({ type }: { type: 'product' | 'offer' | 'reward' | 'message' }) => {
	const icons = {
		product: ShoppingBag,
		offer: Percent,
		reward: Gift,
		message: MessageCircle,
	};
	const Icon = icons[type];
	return <Icon className="size-4" />;
};

const RecommendationItem = ({
	recommendation,
}: {
	recommendation: RecommendationCustomer['recommendations'][0];
}) => (
	<div className="flex items-start gap-3 rounded-lg border bg-muted/30 p-3">
		<div className="bg-primary/10 text-primary rounded-lg p-2">
			<RecommendationTypeIcon type={recommendation.type} />
		</div>
		<div className="flex-1 min-w-0">
			<div className="flex items-start justify-between gap-2">
				<p className="text-sm font-medium truncate">{recommendation.title}</p>
				<PriorityIcon priority={recommendation.priority} />
			</div>
			<p className="text-muted-foreground text-xs mt-0.5 line-clamp-2">
				{recommendation.description}
			</p>
			<div className="mt-1.5 flex items-center gap-2">
				<Progress value={recommendation.confidence} className="h-1 flex-1" />
				<span className="text-muted-foreground text-xs">{recommendation.confidence}%</span>
			</div>
		</div>
	</div>
);

const EngagementMeter = ({ score }: { score: number }) => (
	<div className="flex items-center gap-2">
		<div className="flex gap-0.5">
			{[1, 2, 3, 4, 5].map((level) => (
				<div
					key={level}
					className={`h-3 w-1.5 rounded-full ${
						score >= level * 20
							? 'bg-primary'
							: 'bg-muted'
					}`}
				/>
			))}
		</div>
		<span className="text-muted-foreground text-xs">{score}%</span>
	</div>
);

const RecommendationCard = ({ customer }: { customer: RecommendationCustomer }) => (
	<Card className="group flex flex-col transition-shadow hover:shadow-lg">
		<CardHeader className="pb-3">
			<div className="flex items-start justify-between">
				<div className="flex items-center gap-3">
					<Avatar className="size-11">
						<AvatarImage src={customer.avatar} alt={customer.name} />
						<AvatarFallback className="bg-primary/10 text-primary">
							{customer.initials}
						</AvatarFallback>
					</Avatar>
					<div>
						<p className="font-semibold">{customer.name}</p>
						<p className="text-muted-foreground text-xs">{customer.email}</p>
					</div>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon-sm" className="opacity-0 group-hover:opacity-100">
							<MoreHorizontal className="size-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem>
							<ExternalLink className="mr-2 size-4" />
							View profile
						</DropdownMenuItem>
						<DropdownMenuItem>Apply recommendations</DropdownMenuItem>
						<DropdownMenuItem>Dismiss all</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</CardHeader>
		<CardContent className="flex-1 space-y-4">
			<div className="flex items-center justify-between text-sm">
				<div>
					<span className="text-muted-foreground">Last purchase: </span>
					<span className="font-medium">{customer.lastPurchase}</span>
				</div>
				<EngagementMeter score={customer.engagementScore} />
			</div>
			<div className="flex items-center gap-2 rounded-lg bg-violet-500/10 px-3 py-2">
				<Clock className="text-violet-400 size-4" />
				<span className="text-muted-foreground text-xs">Predicted next purchase:</span>
				<span className="text-sm font-medium text-violet-400">{customer.predictedNextPurchase}</span>
			</div>
			<div className="space-y-2">
				<p className="text-muted-foreground text-xs font-medium">AI Recommendations</p>
				{customer.recommendations.slice(0, 2).map((rec, index) => (
					<RecommendationItem key={index} recommendation={rec} />
				))}
			</div>
			<div className="flex flex-wrap gap-1">
				<span className="text-muted-foreground text-xs mr-1">Interests:</span>
				{customer.preferredCategories.map((cat) => (
					<Badge key={cat} variant="secondary" className="text-xs">
						{cat}
					</Badge>
				))}
			</div>
		</CardContent>
		<CardFooter className="border-t bg-muted/20 px-4 py-3">
			<Button variant="outline" size="sm" className="w-full gap-1.5">
				<Check className="size-4" />
				Apply Top Recommendation
			</Button>
		</CardFooter>
	</Card>
);

export default function Main() {
	const customers: RecommendationCustomer[] = [
		{
			id: '1',
			name: 'Natalie Brooks',
			email: 'natalie.b@email.com',
			initials: 'NB',
			lastPurchase: '5 days ago',
			totalSpent: '$2,450',
			recommendations: [
				{ type: 'product', title: 'Wireless Earbuds Pro', description: 'Based on browsing history and similar customers', confidence: 92, priority: 'high' },
				{ type: 'offer', title: '15% Off Next Order', description: 'High likelihood of conversion with discount', confidence: 85, priority: 'medium' },
			],
			predictedNextPurchase: '3-5 days',
			preferredCategories: ['Electronics', 'Audio', 'Tech'],
			engagementScore: 88,
		},
		{
			id: '2',
			name: 'Oscar Grant',
			email: 'oscar.g@email.com',
			initials: 'OG',
			lastPurchase: '12 days ago',
			totalSpent: '$1,890',
			recommendations: [
				{ type: 'message', title: 'Re-engagement Email', description: 'Customer shows signs of declining activity', confidence: 78, priority: 'high' },
				{ type: 'reward', title: 'Loyalty Points Bonus', description: 'Offer 2x points to encourage return visit', confidence: 72, priority: 'medium' },
			],
			predictedNextPurchase: '7-10 days',
			preferredCategories: ['Sports', 'Fitness', 'Outdoor'],
			engagementScore: 65,
		},
		{
			id: '3',
			name: 'Patricia Young',
			email: 'patricia.y@email.com',
			initials: 'PY',
			lastPurchase: '2 days ago',
			totalSpent: '$4,120',
			recommendations: [
				{ type: 'product', title: 'Premium Skincare Set', description: 'Frequently purchased with recent items', confidence: 95, priority: 'high' },
				{ type: 'offer', title: 'VIP Early Access', description: 'New collection matching preferences', confidence: 90, priority: 'high' },
			],
			predictedNextPurchase: '1-2 days',
			preferredCategories: ['Beauty', 'Skincare', 'Wellness'],
			engagementScore: 95,
		},
		{
			id: '4',
			name: 'Quinn Harper',
			email: 'quinn.h@email.com',
			initials: 'QH',
			lastPurchase: '8 days ago',
			totalSpent: '$950',
			recommendations: [
				{ type: 'reward', title: 'Free Shipping Upgrade', description: 'Low-cost incentive with high impact', confidence: 82, priority: 'medium' },
				{ type: 'product', title: 'Smart Home Starter Kit', description: 'Trending in customer segment', confidence: 68, priority: 'low' },
			],
			predictedNextPurchase: '5-7 days',
			preferredCategories: ['Home', 'Smart Devices'],
			engagementScore: 72,
		},
		{
			id: '5',
			name: 'Rebecca Stone',
			email: 'rebecca.s@email.com',
			initials: 'RS',
			lastPurchase: '20 days ago',
			totalSpent: '$680',
			recommendations: [
				{ type: 'offer', title: 'Win-Back Offer: 25% Off', description: 'At-risk customer, aggressive discount recommended', confidence: 75, priority: 'high' },
				{ type: 'message', title: 'Personal Check-in', description: 'High-touch outreach may improve retention', confidence: 65, priority: 'medium' },
			],
			predictedNextPurchase: '10-14 days',
			preferredCategories: ['Fashion', 'Accessories'],
			engagementScore: 45,
		},
		{
			id: '6',
			name: 'Samuel Turner',
			email: 'samuel.t@email.com',
			initials: 'ST',
			lastPurchase: '1 day ago',
			totalSpent: '$3,200',
			recommendations: [
				{ type: 'product', title: 'Premium Headphones', description: 'Perfect upsell opportunity post-purchase', confidence: 88, priority: 'high' },
				{ type: 'reward', title: 'Refer-a-Friend Bonus', description: 'High satisfaction, ideal for referral program', confidence: 80, priority: 'medium' },
			],
			predictedNextPurchase: '2-4 days',
			preferredCategories: ['Electronics', 'Gaming'],
			engagementScore: 92,
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="flex items-center gap-3">
					<div className="bg-primary/10 text-primary rounded-lg p-2.5">
						<Sparkles className="size-5" />
					</div>
					<div>
						<h1 className="text-2xl font-bold tracking-tight">AI Recommendations</h1>
						<p className="text-muted-foreground text-sm">Personalized suggestions for each customer</p>
					</div>
				</div>
				<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-3">
					{customers.map((customer) => (
						<RecommendationCard key={customer.id} customer={customer} />
					))}
				</div>
			</div>
		</section>
	);
}
