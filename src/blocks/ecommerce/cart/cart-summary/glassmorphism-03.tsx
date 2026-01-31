import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Gift, Truck, ArrowRight, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
};

type ProgressBannerProps = {
	icon: LucideIcon;
	current: number;
	target: number;
	reward: string;
};

const AuroraBackground = () => (
	<div className="absolute inset-0 overflow-hidden">
		<div className="absolute -left-1/4 top-0 h-[500px] w-[600px] rotate-12 rounded-full bg-gradient-to-r from-green-500/30 to-cyan-500/30 blur-3xl" />
		<div className="absolute -right-1/4 bottom-0 h-[400px] w-[500px] -rotate-12 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-3xl" />
	</div>
);

const GlassCard = ({ children }: { children: React.ReactNode }) => (
	<div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-black/20">
		{children}
	</div>
);

const ProgressBanner = ({
	icon: Icon,
	current,
	target,
	reward,
}: ProgressBannerProps) => {
	const progress = Math.min((current / target) * 100, 100);
	const remaining = target - current;

	return (
		<div className="mb-4 rounded-xl bg-white/10 p-3 backdrop-blur">
			<div className="mb-2 flex items-center gap-2">
				<Icon className="size-4" />
				<span className="text-sm">
					${remaining.toFixed(2)} away from {reward}
				</span>
			</div>
			<Progress value={progress} className="h-2 bg-white/20" />
		</div>
	);
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

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$189.00' },
		{ label: 'Shipping', value: '$9.99' },
		{ label: 'Tax', value: '$15.92' },
	];

	return (
		<section className="@container relative">
			<AuroraBackground />
			<div className="relative mx-auto max-w-md px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24">
				<GlassCard>
					<ProgressBanner
						icon={Gift}
						current={189}
						target={250}
						reward="a free gift"
					/>
					<div className="space-y-3">
						{summaryItems.map((item, i) => (
							<SummaryRow key={i} {...item} />
						))}
					</div>
					<Separator className="my-4 bg-white/20" />
					<TotalRow label="Total" value="$214.91" />
					<Button
						className="mt-6 w-full gap-2 bg-white/20 backdrop-blur hover:bg-white/30"
						size="lg"
						asChild
					>
						<Link href="/checkout">
							Checkout
							<ArrowRight className="size-4" />
						</Link>
					</Button>
				</GlassCard>
			</div>
		</section>
	);
}
