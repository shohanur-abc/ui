'use client';

import { Users, ShoppingCart, CreditCard, Package, ArrowUpRight, ArrowDownRight } from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type SegmentProps = {
	segment: string;
	description: string;
	icon: React.ElementType;
	metricsA: { label: string; value: string }[];
	metricsB: { label: string; value: string }[];
	winner: 'A' | 'B' | 'tie';
};

const SegmentCompare = ({ segment, description, icon: Icon, metricsA, metricsB, winner }: SegmentProps) => (
	<Card className="border-border/30 bg-card/60">
		<CardContent className="p-5">
			<div className="mb-4 flex items-center gap-3">
				<div className="rounded-lg bg-primary/10 p-2">
					<Icon className="size-4 text-primary" />
				</div>
				<div>
					<p className="font-bold">{segment}</p>
					<p className="text-xs text-muted-foreground">{description}</p>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-4">
				<div className={`rounded-lg border p-3 ${winner === 'A' ? 'border-primary bg-primary/5' : 'border-border/30 bg-muted/20'}`}>
					<div className="mb-2 flex items-center justify-between">
						<span className="text-xs font-medium text-muted-foreground">Segment A</span>
						{winner === 'A' && <Badge variant="default" className="text-[10px]">Winner</Badge>}
					</div>
					{metricsA.map((m, i) => (
						<div key={i} className="flex justify-between text-sm">
							<span className="text-muted-foreground">{m.label}</span>
							<span className="font-medium">{m.value}</span>
						</div>
					))}
				</div>
				<div className={`rounded-lg border p-3 ${winner === 'B' ? 'border-primary bg-primary/5' : 'border-border/30 bg-muted/20'}`}>
					<div className="mb-2 flex items-center justify-between">
						<span className="text-xs font-medium text-muted-foreground">Segment B</span>
						{winner === 'B' && <Badge variant="default" className="text-[10px]">Winner</Badge>}
					</div>
					{metricsB.map((m, i) => (
						<div key={i} className="flex justify-between text-sm">
							<span className="text-muted-foreground">{m.label}</span>
							<span className="font-medium">{m.value}</span>
						</div>
					))}
				</div>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const segments: SegmentProps[] = [
		{
			segment: 'Homepage Layout',
			description: 'Hero section A/B test',
			icon: Users,
			metricsA: [
				{ label: 'Bounce Rate', value: '32.5%' },
				{ label: 'CTR', value: '4.2%' },
				{ label: 'Sessions', value: '12,450' },
			],
			metricsB: [
				{ label: 'Bounce Rate', value: '28.1%' },
				{ label: 'CTR', value: '5.8%' },
				{ label: 'Sessions', value: '12,280' },
			],
			winner: 'B',
		},
		{
			segment: 'Checkout Flow',
			description: 'Single vs multi-step checkout',
			icon: ShoppingCart,
			metricsA: [
				{ label: 'Completion', value: '78.2%' },
				{ label: 'Time', value: '3m 42s' },
				{ label: 'Drop-off', value: '21.8%' },
			],
			metricsB: [
				{ label: 'Completion', value: '72.5%' },
				{ label: 'Time', value: '5m 18s' },
				{ label: 'Drop-off', value: '27.5%' },
			],
			winner: 'A',
		},
		{
			segment: 'Payment Options',
			description: 'Payment method visibility',
			icon: CreditCard,
			metricsA: [
				{ label: 'Conversion', value: '3.8%' },
				{ label: 'Avg Order', value: '$142' },
				{ label: 'Cart Size', value: '2.4' },
			],
			metricsB: [
				{ label: 'Conversion', value: '4.5%' },
				{ label: 'Avg Order', value: '$138' },
				{ label: 'Cart Size', value: '2.6' },
			],
			winner: 'B',
		},
		{
			segment: 'Product Page',
			description: 'Image gallery vs video hero',
			icon: Package,
			metricsA: [
				{ label: 'Add to Cart', value: '12.4%' },
				{ label: 'Time on Page', value: '1m 52s' },
				{ label: 'Reviews Read', value: '34%' },
			],
			metricsB: [
				{ label: 'Add to Cart', value: '14.8%' },
				{ label: 'Time on Page', value: '2m 28s' },
				{ label: 'Reviews Read', value: '42%' },
			],
			winner: 'B',
		},
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col gap-2 @sm:flex-row @sm:items-center @sm:justify-between">
						<div>
							<CardTitle className="text-lg @sm:text-xl">
								A/B Test Comparison Report
							</CardTitle>
							<CardDescription>
								Live experiment results across key user journeys
							</CardDescription>
						</div>
						<Badge variant="outline" className="w-fit border-primary/20 bg-primary/10 text-primary">
							4 Active Tests
						</Badge>
					</CardHeader>
					<CardContent>
						<div className="grid gap-4 @sm:grid-cols-2">
							{segments.map((seg, i) => (
								<SegmentCompare key={i} {...seg} />
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
