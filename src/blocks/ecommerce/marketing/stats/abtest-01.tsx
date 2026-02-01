import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
	Users,
	Clock,
	DollarSign,
	TrendingUp,
	ShoppingCart,
} from 'lucide-react';

interface ABTestStatProps {
	testName: string;
	variant: string;
	visitors: string;
	conversion: number;
	revenue: string;
	winner: boolean;
}

const ABTestCard = ({
	testName,
	variant,
	visitors,
	conversion,
	revenue,
	winner,
}: ABTestStatProps) => (
	<Card
		className={`group p-5 transition-all duration-300 hover:shadow-md ${winner ? 'ring-2 ring-accent' : ''}`}
	>
		<div className="flex items-center justify-between">
			<div>
				<Badge variant={winner ? 'default' : 'outline'}>{variant}</Badge>
				<p className="mt-2 font-semibold">{testName}</p>
			</div>
			{winner && (
				<Badge className="bg-accent text-accent-foreground">Winner</Badge>
			)}
		</div>
		<div className="mt-4 space-y-3">
			<div className="flex justify-between text-sm">
				<span className="text-muted-foreground">Visitors</span>
				<span className="font-medium">{visitors}</span>
			</div>
			<div>
				<div className="flex justify-between text-sm">
					<span className="text-muted-foreground">Conversion</span>
					<span className="font-medium">{conversion}%</span>
				</div>
				<Progress value={conversion * 10} className="mt-1 h-1.5" />
			</div>
			<div className="flex justify-between text-sm">
				<span className="text-muted-foreground">Revenue</span>
				<span className="font-semibold">{revenue}</span>
			</div>
		</div>
	</Card>
);

export default function Main() {
	const tests: ABTestStatProps[] = [
		{
			testName: 'Checkout CTA Color',
			variant: 'Variant A (Green)',
			visitors: '24,847',
			conversion: 4.2,
			revenue: '$124K',
			winner: false,
		},
		{
			testName: 'Checkout CTA Color',
			variant: 'Variant B (Orange)',
			visitors: '24,294',
			conversion: 5.8,
			revenue: '$168K',
			winner: true,
		},
		{
			testName: 'Product Layout',
			variant: 'Variant A (Grid)',
			visitors: '18,284',
			conversion: 3.8,
			revenue: '$84K',
			winner: true,
		},
		{
			testName: 'Product Layout',
			variant: 'Variant B (List)',
			visitors: '18,847',
			conversion: 2.9,
			revenue: '$62K',
			winner: false,
		},
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-4 @sm:grid-cols-2 @lg:gap-6 @2xl:grid-cols-4">
					{tests.map((test, i) => (
						<ABTestCard key={i} {...test} />
					))}
				</div>
			</div>
		</section>
	);
}
