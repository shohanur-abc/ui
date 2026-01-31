import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardContent,
	CardFooter,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Gift, Truck, ArrowRight, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
};

type RewardCardProps = {
	icon: LucideIcon;
	title: string;
	current: number;
	target: number;
	reward: string;
};

const RewardCard = ({
	icon: Icon,
	title,
	current,
	target,
	reward,
}: RewardCardProps) => {
	const progress = Math.min((current / target) * 100, 100);
	const remaining = target - current;

	return (
		<Card className="mb-4 border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-transparent">
			<CardContent className="py-4">
				<div className="mb-2 flex items-center gap-2">
					<Icon className="size-5 text-amber-500" />
					<span className="font-medium">{title}</span>
				</div>
				<Progress value={progress} className="mb-2 h-2" />
				<p className="text-sm text-muted-foreground">
					Add ${remaining.toFixed(2)} more to get {reward}
				</p>
			</CardContent>
		</Card>
	);
};

const SummaryRow = ({ label, value }: SummaryRowProps) => (
	<div className="flex items-center justify-between text-sm">
		<span className="text-muted-foreground">{label}</span>
		<span className="font-medium">{value}</span>
	</div>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$178.00' },
		{ label: 'Shipping', value: '$9.99' },
		{ label: 'Tax', value: '$15.04' },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-md px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24">
				<RewardCard
					icon={Gift}
					title="Unlock Free Gift"
					current={178}
					target={200}
					reward="a surprise gift"
				/>
				<Card>
					<CardContent className="space-y-3 pt-6">
						{summaryItems.map((item, i) => (
							<SummaryRow key={i} {...item} />
						))}
						<Separator />
						<div className="flex items-center justify-between">
							<span className="text-lg font-semibold">Total</span>
							<span className="text-2xl font-bold">$203.03</span>
						</div>
					</CardContent>
					<CardFooter className="flex-col gap-2">
						<Button className="w-full gap-2" size="lg" asChild>
							<Link href="/checkout">
								Checkout
								<ArrowRight className="size-4" />
							</Link>
						</Button>
						<p className="text-center text-xs text-muted-foreground">
							Add $22.00 more for free shipping & gift!
						</p>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
