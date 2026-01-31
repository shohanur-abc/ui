import Link from 'next/link';
import { ArrowRight, Gift, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const RewardStep = ({
	value,
	label,
	reached,
	current,
}: {
	value: number;
	label: string;
	reached: boolean;
	current?: boolean;
}) => (
	<div className="flex flex-col items-center">
		<div
			className={`size-8 rounded-full flex items-center justify-center text-xs font-bold mb-1 ${
				reached
					? 'bg-primary text-primary-foreground'
					: current
						? 'bg-primary/20 text-primary border-2 border-primary'
						: 'bg-muted text-muted-foreground'
			}`}
		>
			{reached ? <Check className="size-4" /> : `$${value}`}
		</div>
		<span className="text-xs text-muted-foreground whitespace-nowrap">
			{label}
		</span>
	</div>
);

const RewardsProgress = ({
	current,
	steps,
	cta,
}: {
	current: number;
	steps: { value: number; label: string }[];
	cta: { label: string; href: string };
}) => {
	const maxValue = steps[steps.length - 1].value;
	const percentage = Math.min((current / maxValue) * 100, 100);

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Gift className="size-5 text-primary" />
					<span className="font-semibold">Unlock Rewards</span>
				</div>
				<Button size="sm" variant="outline" className="gap-1.5" asChild>
					<Link href={cta.href}>
						{cta.label}
						<ArrowRight className="size-3.5" />
					</Link>
				</Button>
			</div>
			<div className="relative">
				<Progress value={percentage} className="h-2" />
				<div className="flex justify-between mt-3">
					{steps.map((step, i) => (
						<RewardStep
							key={i}
							value={step.value}
							label={step.label}
							reached={current >= step.value}
							current={
								current < step.value &&
								(i === 0 || current >= steps[i - 1].value)
							}
						/>
					))}
				</div>
			</div>
			<p className="text-sm text-muted-foreground text-center">
				Current spend:{' '}
				<span className="font-semibold text-foreground">${current}</span>
			</p>
		</div>
	);
};

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="bg-card py-8 @md:py-10 px-4 @sm:px-6 @2xl:px-8">
				<div className="max-w-2xl mx-auto">
					<RewardsProgress
						current={75}
						steps={[
							{ value: 50, label: 'Free Gift' },
							{ value: 100, label: '10% Off' },
							{ value: 150, label: 'Free Ship' },
							{ value: 200, label: 'VIP Status' },
						]}
						cta={{ label: 'Shop More', href: '/shop' }}
					/>
				</div>
			</div>
		</section>
	);
}
