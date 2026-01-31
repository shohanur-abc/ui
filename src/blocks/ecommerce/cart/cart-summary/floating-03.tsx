import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Gift, Truck, ArrowRight, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
};

type ProgressBannerProps = {
	icon: LucideIcon;
	message: string;
	current: number;
	target: number;
	reward: string;
};

const SummaryRow = ({ label, value }: SummaryRowProps) => (
	<div className="flex items-center justify-between text-sm">
		<span className="text-muted-foreground">{label}</span>
		<span className="font-medium">{value}</span>
	</div>
);

const TotalRow = ({ label, value }: { label: string; value: string }) => (
	<div className="flex items-center justify-between">
		<span className="text-lg font-semibold">{label}</span>
		<span className="text-2xl font-bold">{value}</span>
	</div>
);

const ProgressBanner = ({
	icon: Icon,
	message,
	current,
	target,
	reward,
}: ProgressBannerProps) => {
	const progress = Math.min((current / target) * 100, 100);
	const remaining = target - current;

	return (
		<div className="rounded-xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 p-4">
			<div className="mb-2 flex items-center gap-2">
				<div className="flex size-8 items-center justify-center rounded-full bg-amber-500/20">
					<Icon className="size-4 text-amber-500" />
				</div>
				<div className="flex-1">
					<p className="text-sm font-medium">{message}</p>
					<p className="text-xs text-muted-foreground">
						${remaining.toFixed(2)} away from {reward}
					</p>
				</div>
			</div>
			<Progress value={progress} className="h-2" />
		</div>
	);
};

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$189.00' },
		{ label: 'Shipping', value: '$9.99' },
		{ label: 'Tax', value: '$15.92' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-md px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<Card className="shadow-xl">
					<CardHeader className="pb-0">
						<ProgressBanner
							icon={Gift}
							message="Almost there!"
							current={189}
							target={250}
							reward="a free gift"
						/>
					</CardHeader>
					<CardContent className="space-y-3 pt-4">
						{summaryItems.map((item, i) => (
							<SummaryRow key={i} {...item} />
						))}
						<Separator />
						<TotalRow label="Total" value="$214.91" />
					</CardContent>
					<CardFooter className="flex-col gap-2">
						<Button className="w-full gap-2" size="lg" asChild>
							<Link href="/checkout">
								Checkout
								<ArrowRight className="size-4" />
							</Link>
						</Button>
						<p className="text-xs text-muted-foreground">
							Add $61.00 more to get free shipping + gift!
						</p>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
