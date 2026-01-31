'use client';

import { ArrowRight } from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type ProductCompareProps = {
	name: string;
	category: string;
	price: string;
	revenue: string;
	units: number;
	rating: number;
	conversion: number;
};

const ProductCompareCard = ({ name, category, price, revenue, units, rating, conversion }: ProductCompareProps) => (
	<Card className="flex-1 border-border/30 bg-muted/20">
		<CardContent className="p-5">
			<div className="mb-4 border-b border-border/30 pb-4">
				<p className="font-bold">{name}</p>
				<p className="text-sm text-muted-foreground">{category}</p>
				<p className="mt-2 text-xl font-bold text-primary">{price}</p>
			</div>
			<div className="space-y-4">
				<div>
					<div className="flex justify-between text-sm">
						<span className="text-muted-foreground">Revenue</span>
						<span className="font-medium">{revenue}</span>
					</div>
					<Progress value={75} className="mt-1 h-1.5" />
				</div>
				<div>
					<div className="flex justify-between text-sm">
						<span className="text-muted-foreground">Units Sold</span>
						<span className="font-medium">{units.toLocaleString()}</span>
					</div>
					<Progress value={65} className="mt-1 h-1.5" />
				</div>
				<div>
					<div className="flex justify-between text-sm">
						<span className="text-muted-foreground">Rating</span>
						<span className="font-medium">{rating}/5</span>
					</div>
					<Progress value={rating * 20} className="mt-1 h-1.5" />
				</div>
				<div>
					<div className="flex justify-between text-sm">
						<span className="text-muted-foreground">Conversion</span>
						<span className="font-medium">{conversion}%</span>
					</div>
					<Progress value={conversion * 10} className="mt-1 h-1.5" />
				</div>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const productA: ProductCompareProps = {
		name: 'Wireless Pro Headphones',
		category: 'Electronics',
		price: '$299.99',
		revenue: '$89,400',
		units: 298,
		rating: 4.8,
		conversion: 3.2,
	};

	const productB: ProductCompareProps = {
		name: 'Wireless Max Headphones',
		category: 'Electronics',
		price: '$349.99',
		revenue: '$78,200',
		units: 224,
		rating: 4.6,
		conversion: 2.8,
	};

	const productC: ProductCompareProps = {
		name: 'Smart Watch Ultra',
		category: 'Electronics',
		price: '$449.99',
		revenue: '$112,500',
		units: 250,
		rating: 4.7,
		conversion: 4.1,
	};

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader>
						<CardTitle className="text-lg @sm:text-xl">
							Product Comparison Report
						</CardTitle>
						<CardDescription>
							Side-by-side product performance analysis
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Tabs defaultValue="ab">
							<TabsList className="mb-6">
								<TabsTrigger value="ab">A vs B</TabsTrigger>
								<TabsTrigger value="ac">A vs C</TabsTrigger>
								<TabsTrigger value="bc">B vs C</TabsTrigger>
							</TabsList>
							<TabsContent value="ab">
								<div className="flex items-center gap-4">
									<ProductCompareCard {...productA} />
									<div className="hidden flex-col items-center gap-2 @md:flex">
										<ArrowRight className="size-5 text-muted-foreground" />
										<span className="text-xs text-muted-foreground">VS</span>
									</div>
									<ProductCompareCard {...productB} />
								</div>
							</TabsContent>
							<TabsContent value="ac">
								<div className="flex items-center gap-4">
									<ProductCompareCard {...productA} />
									<div className="hidden flex-col items-center gap-2 @md:flex">
										<ArrowRight className="size-5 text-muted-foreground" />
										<span className="text-xs text-muted-foreground">VS</span>
									</div>
									<ProductCompareCard {...productC} />
								</div>
							</TabsContent>
							<TabsContent value="bc">
								<div className="flex items-center gap-4">
									<ProductCompareCard {...productB} />
									<div className="hidden flex-col items-center gap-2 @md:flex">
										<ArrowRight className="size-5 text-muted-foreground" />
										<span className="text-xs text-muted-foreground">VS</span>
									</div>
									<ProductCompareCard {...productC} />
								</div>
							</TabsContent>
						</Tabs>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
