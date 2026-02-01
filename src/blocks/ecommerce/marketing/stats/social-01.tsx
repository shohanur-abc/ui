import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, TrendingUp, Heart, Share2 } from 'lucide-react';

interface SocialStatProps {
	platform: string;
	followers: string;
	engagement: string;
	growth: string;
	color: string;
}

const SocialCard = ({
	platform,
	followers,
	engagement,
	growth,
	color,
}: SocialStatProps) => (
	<Card className="group overflow-hidden transition-all duration-300 hover:shadow-md">
		<div className="p-5">
			<div className="flex items-center justify-between">
				<span className="font-semibold" style={{ color }}>
					{platform}
				</span>
				<Badge variant="outline">{growth}</Badge>
			</div>
			<p className="mt-4 text-3xl font-bold">{followers}</p>
			<p className="text-sm text-muted-foreground">Followers</p>
		</div>
		<div className="flex border-t divide-x bg-secondary/30">
			<div className="flex-1 p-3 text-center">
				<Heart className="mx-auto size-4 text-muted-foreground" />
				<p className="mt-1 text-sm font-medium">{engagement}</p>
				<p className="text-[10px] text-muted-foreground">Engagement</p>
			</div>
			<div className="flex-1 p-3 text-center">
				<Share2 className="mx-auto size-4 text-muted-foreground" />
				<p className="mt-1 text-sm font-medium">4.2%</p>
				<p className="text-[10px] text-muted-foreground">Share Rate</p>
			</div>
		</div>
	</Card>
);

export default function Main() {
	const socials: SocialStatProps[] = [
		{
			platform: 'Instagram',
			followers: '248K',
			engagement: '5.8%',
			growth: '+12%',
			color: '#E4405F',
		},
		{
			platform: 'Facebook',
			followers: '184K',
			engagement: '3.2%',
			growth: '+8%',
			color: '#1877F2',
		},
		{
			platform: 'Twitter/X',
			followers: '92K',
			engagement: '2.4%',
			growth: '+15%',
			color: '#1DA1F2',
		},
		{
			platform: 'TikTok',
			followers: '524K',
			engagement: '8.4%',
			growth: '+42%',
			color: '#000000',
		},
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-4 @sm:grid-cols-2 @lg:gap-6 @2xl:grid-cols-4">
					{socials.map((social, i) => (
						<SocialCard key={i} {...social} />
					))}
				</div>
			</div>
		</section>
	);
}
