import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Gift, Leaf, Heart, Recycle, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
};

type EcoOptionProps = {
	id: string;
	icon: LucideIcon;
	title: string;
	description: string;
	price?: string;
	impact: string;
	enabled?: boolean;
};

const SummaryRow = ({ label, value }: SummaryRowProps) => (
	<div className="flex items-center justify-between text-sm">
		<span className="text-muted-foreground">{label}</span>
		<span className="font-medium">{value}</span>
	</div>
);

const TotalRow = ({
	label,
	value,
	carbonOffset,
}: {
	label: string;
	value: string;
	carbonOffset: string;
}) => (
	<div className="space-y-2">
		<div className="flex items-center justify-between">
			<span className="text-lg font-semibold">{label}</span>
			<span className="text-2xl font-bold">{value}</span>
		</div>
		<div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
			<Leaf className="size-3" />
			<span>{carbonOffset}</span>
		</div>
	</div>
);

const EcoOption = ({
	id,
	icon: Icon,
	title,
	description,
	price,
	impact,
	enabled,
}: EcoOptionProps) => (
	<div className="flex items-start gap-3 rounded-lg border border-green-500/30 bg-green-500/5 p-4">
		<div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-green-500/20">
			<Icon className="size-5 text-green-600 dark:text-green-400" />
		</div>
		<div className="flex-1 space-y-1">
			<div className="flex items-center justify-between">
				<span className="text-sm font-medium">{title}</span>
				{price && (
					<span className="text-sm text-muted-foreground">{price}</span>
				)}
			</div>
			<p className="text-xs text-muted-foreground">{description}</p>
			<p className="text-xs text-green-600 dark:text-green-400">{impact}</p>
		</div>
		<Switch id={id} defaultChecked={enabled} />
	</div>
);

const DonationOption = ({
	icon: Icon,
	title,
	description,
	amount,
}: {
	icon: LucideIcon;
	title: string;
	description: string;
	amount: string;
}) => (
	<div className="flex items-center gap-3 rounded-lg border p-4">
		<div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-pink-500/20">
			<Icon className="size-5 text-pink-600 dark:text-pink-400" />
		</div>
		<div className="flex-1">
			<span className="text-sm font-medium">{title}</span>
			<p className="text-xs text-muted-foreground">{description}</p>
		</div>
		<Button variant="outline" size="sm">
			{amount}
		</Button>
	</div>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$245.00' },
		{ label: 'Carbon Neutral Shipping', value: '$3.99' },
		{ label: 'Tax', value: '$19.92' },
	];

	const ecoOptions: EcoOptionProps[] = [
		{
			id: 'carbon',
			icon: Leaf,
			title: 'Carbon Neutral Delivery',
			description: 'Offset the carbon footprint of your delivery',
			price: '+$3.99',
			impact: 'Saves 2.4kg of CO₂ emissions',
			enabled: true,
		},
		{
			id: 'packaging',
			icon: Recycle,
			title: 'Eco-Friendly Packaging',
			description: '100% recyclable and plastic-free packaging',
			price: 'Free',
			impact: 'Reduces plastic waste by 150g',
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-4xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-6 @lg:grid-cols-2">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Leaf className="size-5 text-green-600 dark:text-green-400" />
								Sustainable Options
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							{ecoOptions.map((option) => (
								<EcoOption key={option.id} {...option} />
							))}
							<Separator />
							<DonationOption
								icon={Heart}
								title="Round up for charity"
								description="Donate to environmental causes"
								amount="+$0.09"
							/>
						</CardContent>
					</Card>
					<Card className="h-fit">
						<CardHeader className="border-b">
							<CardTitle>Order Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								{summaryItems.map((item, i) => (
									<SummaryRow key={i} {...item} />
								))}
							</div>
							<Separator />
							<TotalRow
								label="Total"
								value="$268.91"
								carbonOffset="This order is carbon neutral!"
							/>
							<Button className="w-full gap-2" size="lg" asChild>
								<Link href="/checkout">
									<Leaf className="size-4" />
									Checkout Sustainably
								</Link>
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
