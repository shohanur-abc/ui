import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Sparkles,
	Gift,
	Star,
	ArrowRight,
	Copy,
	PartyPopper,
} from 'lucide-react';
import Link from 'next/link';

interface BonusCardProps {
	icon: React.ElementType;
	title: string;
	description: string;
	value: string;
	color: string;
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
		icon?: React.ElementType;
	}[];
}

const CelebrationCard = ({
	orderNumber,
	total,
	currency,
}: {
	orderNumber: string;
	total: number;
	currency: string;
}) => (
	<Card className="border-amber-200 dark:border-amber-800/30 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 overflow-hidden">
		<div className="absolute top-0 right-0 size-32 bg-amber-200/30 dark:bg-amber-800/10 rounded-full -translate-y-1/2 translate-x-1/2" />
		<CardHeader className="text-center relative">
			<div className="size-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/25">
				<PartyPopper className="size-8 text-white" />
			</div>
			<h1 className="text-2xl @lg:text-3xl font-bold">Order Complete!</h1>
			<p className="text-muted-foreground">Here's what you earned</p>
		</CardHeader>
		<CardContent className="space-y-4">
			<div className="flex items-center justify-between p-4 rounded-xl bg-background/80 backdrop-blur-sm">
				<div>
					<p className="text-sm text-muted-foreground">Order Number</p>
					<div className="flex items-center gap-2">
						<span className="font-mono font-bold">{orderNumber}</span>
						<Button variant="ghost" size="icon" className="size-6">
							<Copy className="size-3" />
						</Button>
					</div>
				</div>
				<Separator orientation="vertical" className="h-10" />
				<div className="text-right">
					<p className="text-sm text-muted-foreground">Total Spent</p>
					<p className="text-2xl font-bold">
						{currency}
						{total.toFixed(2)}
					</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const BonusCard = ({
	icon: Icon,
	title,
	description,
	value,
	color,
}: BonusCardProps) => (
	<Card className={`${color} border-0`}>
		<CardContent className="pt-6">
			<div className="flex items-center gap-4">
				<div className="size-12 rounded-xl bg-background/50 backdrop-blur-sm flex items-center justify-center">
					<Icon className="size-6" />
				</div>
				<div className="flex-1">
					<p className="font-semibold">{title}</p>
					<p className="text-sm opacity-80">{description}</p>
				</div>
				<Badge
					variant="secondary"
					className="bg-background/50 backdrop-blur-sm"
				>
					{value}
				</Badge>
			</div>
		</CardContent>
	</Card>
);

const PromoCodeCard = ({
	code,
	discount,
}: {
	code: string;
	discount: string;
}) => (
	<Card className="border-dashed">
		<CardContent className="pt-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Gift className="size-6 text-primary" />
					<div>
						<p className="font-semibold">Your Next Order Discount</p>
						<p className="text-sm text-muted-foreground">
							{discount} off your next purchase
						</p>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<code className="px-3 py-1.5 rounded-lg bg-primary/10 font-mono font-bold text-primary">
						{code}
					</code>
					<Button variant="ghost" size="icon">
						<Copy className="size-4" />
					</Button>
				</div>
			</div>
		</CardContent>
	</Card>
);

const SummaryCard = ({
	items,
}: {
	items: { label: string; value: string }[];
}) => (
	<Card>
		<CardHeader className="pb-2">
			<p className="font-semibold text-sm text-muted-foreground">
				Order Summary
			</p>
		</CardHeader>
		<CardContent className="space-y-2">
			{items.map((item, i) => (
				<div key={i} className="flex justify-between text-sm">
					<span className="text-muted-foreground">{item.label}</span>
					<span className="font-medium">{item.value}</span>
				</div>
			))}
		</CardContent>
	</Card>
);

const CTA = ({ items }: CTAProps) => (
	<div className="flex flex-col @sm:flex-row gap-3">
		{items.map(({ label, href, variant, icon: Icon }, i) => (
			<Button
				key={i}
				size="lg"
				variant={variant || 'default'}
				className="flex-1 gap-2"
				asChild
			>
				<Link href={href}>
					{label}
					{Icon && <Icon className="size-4" />}
				</Link>
			</Button>
		))}
	</div>
);

export default function Main() {
	const bonuses: BonusCardProps[] = [
		{
			icon: Sparkles,
			title: 'Points Earned',
			description: 'Added to your account',
			value: '+350 pts',
			color:
				'bg-gradient-to-r from-violet-500/10 to-purple-500/10 text-violet-700 dark:text-violet-400',
		},
		{
			icon: Star,
			title: 'Level Progress',
			description: 'Towards Gold status',
			value: '+15%',
			color:
				'bg-gradient-to-r from-amber-500/10 to-yellow-500/10 text-amber-700 dark:text-amber-400',
		},
	];

	const summaryItems = [
		{ label: 'Items', value: '3 products' },
		{ label: 'Shipping', value: 'Express (Free)' },
		{ label: 'Delivery', value: 'Jan 20-22, 2024' },
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 space-y-6">
				<CelebrationCard
					orderNumber="ORD-2024-78432"
					total={459.99}
					currency="$"
				/>

				<div className="grid gap-4">
					{bonuses.map((bonus, i) => (
						<BonusCard key={i} {...bonus} />
					))}
				</div>

				<PromoCodeCard code="THANKYOU15" discount="15%" />

				<SummaryCard items={summaryItems} />

				<CTA
					items={[
						{ label: 'Track Order', href: '/track', icon: ArrowRight },
						{ label: 'View Rewards', href: '/rewards', variant: 'outline' },
					]}
				/>
			</div>
		</section>
	);
}
