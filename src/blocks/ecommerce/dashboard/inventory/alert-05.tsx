'use client';

import * as React from 'react';
import {
	AlertTriangle,
	Clock,
	Package,
	TrendingDown,
	Calendar,
	ArrowRight,
	CheckCircle,
	X,
} from 'lucide-react';

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

type RiskItem = {
	id: string;
	name: string;
	sku: string;
	riskType: 'stockout' | 'expiry' | 'overstock' | 'slow-moving';
	riskLevel: 'high' | 'medium' | 'low';
	metric: string;
	deadline: string;
	suggestedAction: string;
};

type RiskCardProps = {
	item: RiskItem;
	onAction: (id: string) => void;
	onDismiss: (id: string) => void;
};

const RiskCard = ({ item, onAction, onDismiss }: RiskCardProps) => {
	const riskConfig = {
		stockout: { icon: Package, label: 'Stockout Risk' },
		expiry: { icon: Calendar, label: 'Expiry Risk' },
		overstock: { icon: TrendingDown, label: 'Overstock' },
		'slow-moving': { icon: Clock, label: 'Slow Moving' },
	};

	const levelConfig = {
		high: {
			bg: 'bg-destructive/10',
			border: 'border-destructive/30',
			text: 'text-destructive',
			badge: 'destructive' as const,
		},
		medium: {
			bg: 'bg-amber-500/10',
			border: 'border-amber-500/30',
			text: 'text-amber-500',
			badge: 'secondary' as const,
		},
		low: {
			bg: 'bg-primary/10',
			border: 'border-primary/30',
			text: 'text-primary',
			badge: 'outline' as const,
		},
	};

	const typeConfig = riskConfig[item.riskType];
	const levelStyle = levelConfig[item.riskLevel];
	const Icon = typeConfig.icon;

	return (
		<Card className={`${levelStyle.bg} ${levelStyle.border}`}>
			<CardContent className="p-4">
				<div className="flex items-start justify-between">
					<div className="flex items-center gap-3">
						<div
							className={`flex size-10 items-center justify-center rounded-lg bg-background ${levelStyle.text}`}
						>
							<Icon className="size-5" />
						</div>
						<div>
							<p className="font-medium">{item.name}</p>
							<p className="text-xs text-muted-foreground">{item.sku}</p>
						</div>
					</div>
					<Badge variant={levelStyle.badge}>{item.riskLevel}</Badge>
				</div>
				<div className="mt-4 space-y-2">
					<div className="flex items-center justify-between text-sm">
						<span className="text-muted-foreground">{typeConfig.label}</span>
						<span className="font-medium">{item.metric}</span>
					</div>
					<div className="flex items-center justify-between text-sm">
						<span className="text-muted-foreground">Action needed by</span>
						<span className={`font-medium ${levelStyle.text}`}>
							{item.deadline}
						</span>
					</div>
				</div>
				<div className="mt-4 flex gap-2">
					<Button
						size="sm"
						className="flex-1"
						onClick={() => onAction(item.id)}
					>
						{item.suggestedAction}
						<ArrowRight className="ml-2 size-4" />
					</Button>
					<Button size="sm" variant="ghost" onClick={() => onDismiss(item.id)}>
						<X className="size-4" />
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

type SummaryProps = {
	high: number;
	medium: number;
	low: number;
	resolved: number;
};

const RiskSummary = ({ high, medium, low, resolved }: SummaryProps) => (
	<div className="grid grid-cols-4 gap-4 rounded-lg border p-4">
		<div className="text-center">
			<p className="text-2xl font-bold text-destructive">{high}</p>
			<p className="text-xs text-muted-foreground">High Risk</p>
		</div>
		<div className="text-center">
			<p className="text-2xl font-bold text-amber-500">{medium}</p>
			<p className="text-xs text-muted-foreground">Medium Risk</p>
		</div>
		<div className="text-center">
			<p className="text-2xl font-bold text-primary">{low}</p>
			<p className="text-xs text-muted-foreground">Low Risk</p>
		</div>
		<div className="text-center">
			<p className="text-2xl font-bold text-emerald-500">{resolved}</p>
			<p className="text-xs text-muted-foreground">Resolved</p>
		</div>
	</div>
);

export default function Main() {
	const [risks, setRisks] = React.useState<RiskItem[]>([
		{
			id: '1',
			name: 'Wireless Earbuds Pro',
			sku: 'WEP-001',
			riskType: 'stockout',
			riskLevel: 'high',
			metric: '3 days of stock left',
			deadline: 'Tomorrow',
			suggestedAction: 'Create PO',
		},
		{
			id: '2',
			name: 'Organic Face Cream',
			sku: 'OFC-001',
			riskType: 'expiry',
			riskLevel: 'high',
			metric: '150 units expiring',
			deadline: '15 days',
			suggestedAction: 'Add Discount',
		},
		{
			id: '3',
			name: 'Phone Case Premium',
			sku: 'PCP-001',
			riskType: 'overstock',
			riskLevel: 'medium',
			metric: '180 days of cover',
			deadline: 'This month',
			suggestedAction: 'Run Promo',
		},
		{
			id: '4',
			name: 'USB-C Cable 2m',
			sku: 'UCC-001',
			riskType: 'slow-moving',
			riskLevel: 'low',
			metric: 'No sales in 45 days',
			deadline: 'Review needed',
			suggestedAction: 'Analyze',
		},
	]);

	const handleAction = (id: string) => {
		console.log('Action for', id);
	};

	const handleDismiss = (id: string) => {
		setRisks((prev) => prev.filter((r) => r.id !== id));
	};

	const highCount = risks.filter((r) => r.riskLevel === 'high').length;
	const mediumCount = risks.filter((r) => r.riskLevel === 'medium').length;
	const lowCount = risks.filter((r) => r.riskLevel === 'low').length;

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<div className="mb-6">
					<h2 className="text-xl font-semibold @lg:text-2xl">Risk Alerts</h2>
					<p className="text-sm text-muted-foreground">
						Proactive inventory risk management
					</p>
				</div>

				<div className="space-y-6">
					<RiskSummary
						high={highCount}
						medium={mediumCount}
						low={lowCount}
						resolved={12}
					/>

					<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
						{risks.map((risk) => (
							<RiskCard
								key={risk.id}
								item={risk}
								onAction={handleAction}
								onDismiss={handleDismiss}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
