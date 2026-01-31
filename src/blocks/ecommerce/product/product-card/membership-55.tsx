import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
	CreditCard,
	Gift,
	Heart,
	Star,
	Sparkles,
	Check,
	Users,
} from 'lucide-react';
import Image from 'next/image';

interface MembershipProps {
	image: string;
	name: string;
	tier: string;
	price: number;
	period: string;
	benefits: string[];
	members: number;
	rating: number;
	reviews: number;
	popular: boolean;
}

const MembershipImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600">
		<Image
			src={src}
			alt={alt}
			fill
			className="object-cover opacity-60 transition-transform duration-500 group-hover:scale-105"
		/>
		<div className="absolute inset-0 flex items-center justify-center">
			<div className="text-center">
				<Sparkles className="mx-auto size-10 text-white" />
			</div>
		</div>
	</div>
);

const TierBadge = ({ tier }: { tier: string }) => {
	const colors: Record<string, string> = {
		Gold: 'bg-amber-500',
		Silver: 'bg-slate-400',
		Platinum: 'bg-slate-700',
		Diamond: 'bg-blue-500',
	};
	return (
		<Badge className={`gap-1 ${colors[tier] || 'bg-primary'}`}>
			<Star className="size-3 fill-current" />
			{tier}
		</Badge>
	);
};

const PopularBadge = () => (
	<Badge variant="destructive" className="absolute right-3 top-3 gap-1">
		<Heart className="size-3 fill-current" />
		Popular
	</Badge>
);

const MembershipName = ({ text }: { text: string }) => (
	<h3 className="text-lg font-semibold text-foreground">{text}</h3>
);

const MemberCount = ({ count }: { count: number }) => (
	<div className="flex items-center gap-1.5 text-sm text-muted-foreground">
		<Users className="size-4" />
		{count.toLocaleString()} members
	</div>
);

const MembershipRating = ({
	rating,
	reviews,
}: {
	rating: number;
	reviews: number;
}) => (
	<div className="flex items-center gap-1.5">
		<Star className="size-4 fill-yellow-400 text-yellow-400" />
		<span className="font-medium">{rating.toFixed(1)}</span>
		<span className="text-sm text-muted-foreground">({reviews})</span>
	</div>
);

const BenefitsList = ({ benefits }: { benefits: string[] }) => (
	<ul className="space-y-2">
		{benefits.map((benefit, i) => (
			<li
				key={i}
				className="flex items-center gap-2 text-sm text-muted-foreground"
			>
				<Check className="size-4 shrink-0 text-green-500" />
				{benefit}
			</li>
		))}
	</ul>
);

const PriceDisplay = ({ price, period }: { price: number; period: string }) => (
	<div className="space-y-0.5">
		<div className="flex items-baseline gap-1">
			<span className="text-2xl font-bold text-foreground">${price}</span>
			<span className="text-sm text-muted-foreground">/{period}</span>
		</div>
	</div>
);

const JoinButton = ({ label }: { label: string }) => (
	<Button className="w-full gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
		<CreditCard className="size-4" />
		{label}
	</Button>
);

export default function Main() {
	const membership: MembershipProps = {
		image:
			'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=280&fit=crop',
		name: 'Creator Pro Membership',
		tier: 'Gold',
		price: 29,
		period: 'month',
		benefits: [
			'Unlimited access to all courses',
			'Priority customer support',
			'Exclusive member events',
			'Monthly credits for tools',
		],
		members: 24500,
		rating: 4.8,
		reviews: 2341,
		popular: true,
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-sm px-4 py-8">
				<Card className="group overflow-hidden">
					<div className="relative">
						<MembershipImage src={membership.image} alt={membership.name} />
						{membership.popular && <PopularBadge />}
					</div>
					<div className="space-y-4 p-4">
						<div className="flex items-center justify-between">
							<TierBadge tier={membership.tier} />
							<MembershipRating
								rating={membership.rating}
								reviews={membership.reviews}
							/>
						</div>
						<div className="space-y-1">
							<MembershipName text={membership.name} />
							<MemberCount count={membership.members} />
						</div>
						<BenefitsList benefits={membership.benefits} />
						<Separator />
						<div className="space-y-3">
							<PriceDisplay
								price={membership.price}
								period={membership.period}
							/>
							<JoinButton label="Join Now" />
						</div>
					</div>
				</Card>
			</div>
		</section>
	);
}
