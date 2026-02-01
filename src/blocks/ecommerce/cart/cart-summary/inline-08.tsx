import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Gift, ArrowRight, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type FreeGiftProgressProps = {
	icon: LucideIcon;
	current: number;
	target: number;
	reward: string;
};

const FreeGiftProgress = ({
	icon: Icon,
	current,
	target,
	reward,
}: FreeGiftProgressProps) => {
	const progress = Math.min((current / target) * 100, 100);
	const remaining = target - current;

	return (
		<div className="flex flex-1 items-center gap-3">
			<Icon className="size-5 text-amber-500" />
			<div className="flex-1 space-y-1">
				<div className="flex justify-between text-xs">
					<span>
						${remaining.toFixed(2)} to {reward}
					</span>
					<span className="text-muted-foreground">{progress.toFixed(0)}%</span>
				</div>
				<Progress value={progress} className="h-1.5" />
			</div>
		</div>
	);
};

const TotalDisplay = ({ value }: { value: string }) => (
	<span className="text-lg font-bold">{value}</span>
);

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-2xl px-4 py-8 @sm:px-6 @md:py-10">
				<div className="flex flex-wrap items-center gap-6 rounded-lg border bg-card px-4 py-3">
					<FreeGiftProgress
						icon={Gift}
						current={175}
						target={200}
						reward="free gift"
					/>
					<div className="flex items-center gap-4">
						<TotalDisplay value="$189.12" />
						<Button className="gap-1" asChild>
							<Link href="/checkout">
								Checkout
								<ArrowRight className="size-4" />
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
