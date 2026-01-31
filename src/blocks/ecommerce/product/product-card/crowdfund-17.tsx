import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Award, Clock, Gift, ShoppingCart, Trophy, Users } from 'lucide-react';
import Image from 'next/image';

interface CrowdfundProductProps {
	image: string;
	name: string;
	tagline: string;
	pledged: number;
	goal: number;
	backers: number;
	daysLeft: number;
}

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
		<Badge className="absolute left-3 top-3 gap-1.5 bg-primary text-primary-foreground">
			<Award className="size-3" />
			Staff Pick
		</Badge>
	</div>
);

const ProductTitle = ({ name, tagline }: { name: string; tagline: string }) => (
	<div className="space-y-1">
		<h3 className="text-xl font-bold text-foreground">{name}</h3>
		<p className="text-sm text-muted-foreground">{tagline}</p>
	</div>
);

const FundingProgress = ({
	pledged,
	goal,
}: {
	pledged: number;
	goal: number;
}) => {
	const percent = Math.min((pledged / goal) * 100, 100);
	return (
		<div className="space-y-2">
			<Progress value={percent} className="h-3" />
			<div className="flex justify-between text-sm">
				<span className="font-semibold text-primary">
					${pledged.toLocaleString()} raised
				</span>
				<span className="text-muted-foreground">
					{percent.toFixed(0)}% of ${goal.toLocaleString()}
				</span>
			</div>
		</div>
	);
};

const CampaignStats = ({
	backers,
	daysLeft,
}: {
	backers: number;
	daysLeft: number;
}) => (
	<div className="flex gap-6">
		<div className="flex items-center gap-2">
			<Users className="size-5 text-primary" />
			<div>
				<p className="font-semibold text-foreground">
					{backers.toLocaleString()}
				</p>
				<p className="text-xs text-muted-foreground">backers</p>
			</div>
		</div>
		<div className="flex items-center gap-2">
			<Clock className="size-5 text-primary" />
			<div>
				<p className="font-semibold text-foreground">{daysLeft}</p>
				<p className="text-xs text-muted-foreground">days left</p>
			</div>
		</div>
	</div>
);

const PledgeButton = ({ label }: { label: string }) => (
	<Button className="w-full gap-2" size="lg">
		<Gift className="size-4" />
		{label}
	</Button>
);

export default function Main() {
	const campaign: CrowdfundProductProps = {
		image:
			'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=340&fit=crop',
		name: 'The Ultimate Productivity Desk',
		tagline: 'A standing desk that adapts to your workflow',
		pledged: 245680,
		goal: 300000,
		backers: 1847,
		daysLeft: 12,
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-md px-4 py-8">
				<div className="space-y-5 rounded-2xl border border-border bg-card p-5">
					<ProductImage src={campaign.image} alt={campaign.name} />
					<ProductTitle name={campaign.name} tagline={campaign.tagline} />
					<FundingProgress pledged={campaign.pledged} goal={campaign.goal} />
					<CampaignStats
						backers={campaign.backers}
						daysLeft={campaign.daysLeft}
					/>
					<PledgeButton label="Back This Project" />
				</div>
			</div>
		</section>
	);
}
