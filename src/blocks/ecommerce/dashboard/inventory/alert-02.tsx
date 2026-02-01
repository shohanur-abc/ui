'use client';

import * as React from 'react';
import {
	AlertTriangle,
	X,
	ArrowRight,
	ShoppingCart,
	Package,
	RefreshCw,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type BannerType = 'warning' | 'error' | 'info' | 'success';

type BannerProps = {
	type: BannerType;
	title: string;
	message: string;
	actionLabel?: string;
	onAction?: () => void;
	onDismiss?: () => void;
	icon?: React.ElementType;
};

const Banner = ({
	type,
	title,
	message,
	actionLabel,
	onAction,
	onDismiss,
	icon: CustomIcon,
}: BannerProps) => {
	const config: Record<
		BannerType,
		{ bg: string; border: string; text: string; icon: React.ElementType }
	> = {
		warning: {
			bg: 'bg-amber-500/10',
			border: 'border-amber-500/30',
			text: 'text-amber-500',
			icon: AlertTriangle,
		},
		error: {
			bg: 'bg-destructive/10',
			border: 'border-destructive/30',
			text: 'text-destructive',
			icon: AlertTriangle,
		},
		info: {
			bg: 'bg-blue-500/10',
			border: 'border-blue-500/30',
			text: 'text-blue-500',
			icon: Package,
		},
		success: {
			bg: 'bg-emerald-500/10',
			border: 'border-emerald-500/30',
			text: 'text-emerald-500',
			icon: RefreshCw,
		},
	};

	const { bg, border, text, icon: DefaultIcon } = config[type];
	const Icon = CustomIcon || DefaultIcon;

	return (
		<div className={`rounded-lg border ${bg} ${border} p-4`}>
			<div className="flex items-start gap-3">
				<div className={`shrink-0 ${text}`}>
					<Icon className="size-5" />
				</div>
				<div className="min-w-0 flex-1">
					<p className="font-medium">{title}</p>
					<p className="mt-0.5 text-sm text-muted-foreground">{message}</p>
				</div>
				<div className="flex shrink-0 items-center gap-2">
					{actionLabel && onAction && (
						<Button size="sm" variant="secondary" onClick={onAction}>
							{actionLabel}
							<ArrowRight className="ml-1 size-4" />
						</Button>
					)}
					{onDismiss && (
						<Button size="icon-sm" variant="ghost" onClick={onDismiss}>
							<X className="size-4" />
						</Button>
					)}
				</div>
			</div>
		</div>
	);
};

type CompactBannerProps = {
	type: BannerType;
	message: string;
	count?: number;
	actionLabel?: string;
	onAction?: () => void;
};

const CompactBanner = ({
	type,
	message,
	count,
	actionLabel,
	onAction,
}: CompactBannerProps) => {
	const colors: Record<BannerType, string> = {
		warning: 'bg-amber-500 text-amber-50',
		error: 'bg-destructive text-destructive-foreground',
		info: 'bg-blue-500 text-blue-50',
		success: 'bg-emerald-500 text-emerald-50',
	};

	return (
		<div
			className={`flex items-center justify-between rounded-lg px-4 py-2 ${colors[type]}`}
		>
			<div className="flex items-center gap-2">
				<AlertTriangle className="size-4" />
				<span className="text-sm font-medium">{message}</span>
				{count && count > 1 && (
					<Badge variant="secondary" className="bg-white/20 text-white">
						{count}
					</Badge>
				)}
			</div>
			{actionLabel && onAction && (
				<Button
					size="sm"
					variant="secondary"
					className="bg-white/20 text-white hover:bg-white/30"
					onClick={onAction}
				>
					{actionLabel}
				</Button>
			)}
		</div>
	);
};

export default function Main() {
	const [showBanners, setShowBanners] = React.useState({
		lowStock: true,
		outOfStock: true,
		incoming: true,
		restock: true,
	});

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<div className="space-y-4">
					{/* Compact Banners */}
					<CompactBanner
						type="error"
						message="3 products are out of stock"
						count={3}
						actionLabel="View"
						onAction={() => {}}
					/>

					<CompactBanner
						type="warning"
						message="12 products have low stock levels"
						count={12}
						actionLabel="Review"
						onAction={() => {}}
					/>

					{/* Detailed Banners */}
					{showBanners.lowStock && (
						<Banner
							type="warning"
							title="Low Stock Warning"
							message="15 products are running low and may need restocking soon to avoid stockouts."
							actionLabel="View Products"
							onAction={() => {}}
							onDismiss={() =>
								setShowBanners((s) => ({ ...s, lowStock: false }))
							}
						/>
					)}

					{showBanners.outOfStock && (
						<Banner
							type="error"
							title="Out of Stock Alert"
							message="Wireless Earbuds Pro, USB-C Cable, and Smart Watch are currently out of stock."
							actionLabel="Reorder Now"
							onAction={() => {}}
							onDismiss={() =>
								setShowBanners((s) => ({ ...s, outOfStock: false }))
							}
							icon={ShoppingCart}
						/>
					)}

					{showBanners.incoming && (
						<Banner
							type="info"
							title="Incoming Shipment"
							message="Purchase Order #12345 is expected to arrive tomorrow with 500 units."
							actionLabel="Track Shipment"
							onAction={() => {}}
							onDismiss={() =>
								setShowBanners((s) => ({ ...s, incoming: false }))
							}
						/>
					)}

					{showBanners.restock && (
						<Banner
							type="success"
							title="Stock Replenished"
							message="Bluetooth Speaker inventory has been restocked with 250 new units."
							onDismiss={() =>
								setShowBanners((s) => ({ ...s, restock: false }))
							}
						/>
					)}
				</div>
			</div>
		</section>
	);
}
