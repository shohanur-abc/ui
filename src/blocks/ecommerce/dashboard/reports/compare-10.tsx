'use client';

import { ArrowUpRight, ArrowDownRight, Package } from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

type SupplierCompareProps = {
	name: string;
	avatar: string;
	initials: string;
	products: number;
	fulfillment: number;
	quality: number;
	pricing: number;
	leadTime: string;
	overallScore: number;
};

const SupplierCard = ({ name, avatar, initials, products, fulfillment, quality, pricing, leadTime, overallScore }: SupplierCompareProps) => {
	const scoreColor = overallScore >= 90 ? 'text-emerald-500' : overallScore >= 75 ? 'text-amber-500' : 'text-rose-500';

	return (
		<Card className="flex-1 border-border/30 bg-card/60">
			<CardContent className="p-5">
				<div className="mb-4 flex items-center justify-between border-b border-border/30 pb-4">
					<div className="flex items-center gap-3">
						<Avatar className="size-10">
							<AvatarImage src={avatar} />
							<AvatarFallback>{initials}</AvatarFallback>
						</Avatar>
						<div>
							<p className="font-bold">{name}</p>
							<p className="text-xs text-muted-foreground">{products} products</p>
						</div>
					</div>
					<div className="text-right">
						<p className={`text-2xl font-bold ${scoreColor}`}>{overallScore}</p>
						<p className="text-xs text-muted-foreground">Score</p>
					</div>
				</div>
				<div className="space-y-3">
					<div>
						<div className="flex justify-between text-sm">
							<span className="text-muted-foreground">Fulfillment Rate</span>
							<span className="font-medium">{fulfillment}%</span>
						</div>
						<Progress value={fulfillment} className="mt-1 h-1.5" />
					</div>
					<div>
						<div className="flex justify-between text-sm">
							<span className="text-muted-foreground">Quality Score</span>
							<span className="font-medium">{quality}%</span>
						</div>
						<Progress value={quality} className="mt-1 h-1.5" />
					</div>
					<div>
						<div className="flex justify-between text-sm">
							<span className="text-muted-foreground">Price Competitiveness</span>
							<span className="font-medium">{pricing}%</span>
						</div>
						<Progress value={pricing} className="mt-1 h-1.5" />
					</div>
					<div className="flex justify-between pt-2 text-sm">
						<span className="text-muted-foreground">Avg Lead Time</span>
						<span className="font-medium">{leadTime}</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const suppliers: SupplierCompareProps[] = [
		{
			name: 'TechParts Inc',
			avatar: '',
			initials: 'TP',
			products: 245,
			fulfillment: 98,
			quality: 96,
			pricing: 82,
			leadTime: '3-5 days',
			overallScore: 92,
		},
		{
			name: 'Global Supply Co',
			avatar: '',
			initials: 'GS',
			products: 189,
			fulfillment: 94,
			quality: 88,
			pricing: 95,
			leadTime: '5-7 days',
			overallScore: 85,
		},
		{
			name: 'QuickShip Ltd',
			avatar: '',
			initials: 'QS',
			products: 312,
			fulfillment: 99,
			quality: 91,
			pricing: 78,
			leadTime: '1-2 days',
			overallScore: 89,
		},
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col gap-2 @sm:flex-row @sm:items-center @sm:justify-between">
						<div className="flex items-start gap-3">
							<div className="rounded-lg bg-primary/10 p-2">
								<Package className="size-5 text-primary" />
							</div>
							<div>
								<CardTitle className="text-lg @sm:text-xl">
									Supplier Comparison Report
								</CardTitle>
								<CardDescription>
									Performance metrics across key suppliers
								</CardDescription>
							</div>
						</div>
						<Badge variant="outline">3 Suppliers</Badge>
					</CardHeader>
					<CardContent>
						<div className="flex flex-col gap-4 @lg:flex-row">
							{suppliers.map((s, i) => (
								<SupplierCard key={i} {...s} />
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
