'use client';

import * as React from 'react';
import {
	Percent,
	Calendar,
	Clock,
	Tag,
	Users,
	Target,
	Plus,
	Trash2,
	Copy,
	Power,
	AlertTriangle,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

interface Promotion {
	id: string;
	name: string;
	type: 'percentage' | 'fixed' | 'bogo';
	value: number;
	startDate: string;
	endDate: string;
	isActive: boolean;
	usageCount: number;
	usageLimit?: number;
	targetProducts: number;
}

interface PromotionCardProps {
	promotion: Promotion;
	onToggle: () => void;
	onEdit: () => void;
	onDelete: () => void;
	labels: { used: string; expires: string; products: string };
}

const PromotionCard = ({
	promotion,
	onToggle,
	onEdit,
	onDelete,
	labels,
}: PromotionCardProps) => {
	const usagePercent = promotion.usageLimit
		? (promotion.usageCount / promotion.usageLimit) * 100
		: 0;

	const typeLabels = {
		percentage: `${promotion.value}% Off`,
		fixed: `$${promotion.value} Off`,
		bogo: 'Buy One Get One',
	};

	return (
		<div
			className={`rounded-lg border bg-card p-4 ${!promotion.isActive ? 'opacity-60' : ''}`}
		>
			<div className="mb-3 flex items-start justify-between">
				<div>
					<h3 className="font-semibold">{promotion.name}</h3>
					<Badge variant="secondary" className="mt-1">
						{typeLabels[promotion.type]}
					</Badge>
				</div>
				<Switch checked={promotion.isActive} onCheckedChange={onToggle} />
			</div>

			<div className="mb-3 space-y-2 text-sm">
				<div className="flex items-center gap-2 text-muted-foreground">
					<Calendar className="size-4" />
					<span>
						{labels.expires}: {promotion.endDate}
					</span>
				</div>
				<div className="flex items-center gap-2 text-muted-foreground">
					<Target className="size-4" />
					<span>
						{promotion.targetProducts} {labels.products}
					</span>
				</div>
			</div>

			{promotion.usageLimit && (
				<div className="mb-3 space-y-1">
					<div className="flex justify-between text-xs">
						<span>{labels.used}</span>
						<span>
							{promotion.usageCount} / {promotion.usageLimit}
						</span>
					</div>
					<Progress value={usagePercent} />
				</div>
			)}

			<div className="flex gap-2">
				<Button variant="outline" size="sm" onClick={onEdit} className="flex-1">
					Edit
				</Button>
				<Button variant="ghost" size="icon-sm" onClick={onDelete}>
					<Trash2 className="size-4" />
				</Button>
			</div>
		</div>
	);
};

interface CreatePromotionFormProps {
	labels: {
		name: string;
		type: string;
		value: string;
		startDate: string;
		endDate: string;
		usageLimit: string;
		unlimited: string;
	};
}

const CreatePromotionForm = ({ labels }: CreatePromotionFormProps) => {
	const [type, setType] = React.useState('percentage');
	const [hasLimit, setHasLimit] = React.useState(false);

	return (
		<div className="rounded-lg border bg-card p-6">
			<h3 className="mb-4 font-semibold">Create Promotion</h3>
			<div className="space-y-4">
				<div className="space-y-2">
					<Label>{labels.name}</Label>
					<Input placeholder="Summer Sale 2024" />
				</div>

				<div className="grid gap-4 @sm:grid-cols-2">
					<div className="space-y-2">
						<Label>{labels.type}</Label>
						<Select value={type} onValueChange={setType}>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="percentage">Percentage Discount</SelectItem>
								<SelectItem value="fixed">Fixed Amount</SelectItem>
								<SelectItem value="bogo">Buy One Get One</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2">
						<Label>{labels.value}</Label>
						<div className="relative">
							{type === 'fixed' ? (
								<span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
									$
								</span>
							) : type === 'percentage' ? (
								<Percent className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
							) : null}
							<Input
								type="number"
								placeholder="0"
								className={
									type === 'fixed'
										? 'pl-7'
										: type === 'percentage'
											? 'pr-9'
											: ''
								}
								disabled={type === 'bogo'}
							/>
						</div>
					</div>
				</div>

				<div className="grid gap-4 @sm:grid-cols-2">
					<div className="space-y-2">
						<Label>{labels.startDate}</Label>
						<Input type="date" />
					</div>
					<div className="space-y-2">
						<Label>{labels.endDate}</Label>
						<Input type="date" />
					</div>
				</div>

				<div className="space-y-3">
					<div className="flex items-center gap-3">
						<Switch checked={hasLimit} onCheckedChange={setHasLimit} />
						<Label>{labels.usageLimit}</Label>
					</div>
					{hasLimit ? (
						<Input type="number" placeholder="100" />
					) : (
						<p className="text-sm text-muted-foreground">{labels.unlimited}</p>
					)}
				</div>

				<Button className="w-full gap-2">
					<Plus className="size-4" />
					Create Promotion
				</Button>
			</div>
		</div>
	);
};

interface SummaryStatsProps {
	stats: { label: string; value: string; change: number }[];
}

const SummaryStats = ({ stats }: SummaryStatsProps) => (
	<div className="grid gap-4 @sm:grid-cols-3">
		{stats.map((stat) => (
			<div
				key={stat.label}
				className="rounded-lg border bg-card p-4 text-center"
			>
				<p className="text-2xl font-bold">{stat.value}</p>
				<p className="text-sm text-muted-foreground">{stat.label}</p>
				<p
					className={`text-xs ${stat.change >= 0 ? 'text-emerald-500' : 'text-red-500'}`}
				>
					{stat.change >= 0 ? '+' : ''}
					{stat.change}% vs last period
				</p>
			</div>
		))}
	</div>
);

export default function Main() {
	const [promotions, setPromotions] = React.useState<Promotion[]>([
		{
			id: '1',
			name: 'Summer Sale',
			type: 'percentage',
			value: 25,
			startDate: '2024-06-01',
			endDate: '2024-06-30',
			isActive: true,
			usageCount: 145,
			usageLimit: 500,
			targetProducts: 45,
		},
		{
			id: '2',
			name: 'New Customer',
			type: 'fixed',
			value: 10,
			startDate: '2024-01-01',
			endDate: '2024-12-31',
			isActive: true,
			usageCount: 892,
			targetProducts: 120,
		},
		{
			id: '3',
			name: 'Flash Sale',
			type: 'percentage',
			value: 40,
			startDate: '2024-06-15',
			endDate: '2024-06-16',
			isActive: false,
			usageCount: 50,
			usageLimit: 100,
			targetProducts: 10,
		},
	]);

	const stats = [
		{ label: 'Active Promotions', value: '2', change: 0 },
		{ label: 'Total Redemptions', value: '1,087', change: 23.5 },
		{ label: 'Revenue Impact', value: '$12,450', change: 18.2 },
	];

	const togglePromotion = (id: string) => {
		setPromotions((prev) =>
			prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p)),
		);
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-4xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="flex items-center gap-3">
					<Tag className="size-5" />
					<h2 className="text-xl font-semibold">Promotions & Discounts</h2>
				</div>

				<SummaryStats stats={stats} />

				<div className="grid gap-6 @lg:grid-cols-2">
					<div className="space-y-4">
						<h3 className="font-semibold">Active Promotions</h3>
						{promotions.map((promotion) => (
							<PromotionCard
								key={promotion.id}
								promotion={promotion}
								onToggle={() => togglePromotion(promotion.id)}
								onEdit={() => console.log('Edit', promotion.id)}
								onDelete={() => console.log('Delete', promotion.id)}
								labels={{
									used: 'Used',
									expires: 'Expires',
									products: 'products',
								}}
							/>
						))}
					</div>

					<CreatePromotionForm
						labels={{
							name: 'Promotion Name',
							type: 'Discount Type',
							value: 'Discount Value',
							startDate: 'Start Date',
							endDate: 'End Date',
							usageLimit: 'Set usage limit',
							unlimited: 'Unlimited usage',
						}}
					/>
				</div>
			</div>
		</section>
	);
}
