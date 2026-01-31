import Link from 'next/link';
import { Timer, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CountdownItem = ({ value, label }: { value: string; label: string }) => (
	<div className="flex flex-col items-center min-w-[40px]">
		<span className="text-lg @md:text-xl font-bold tabular-nums">{value}</span>
		<span className="text-[10px] @md:text-xs uppercase tracking-wide opacity-80">
			{label}
		</span>
	</div>
);

const CountdownTimer = ({
	items,
}: {
	items: { value: string; label: string }[];
}) => (
	<div className="flex items-center gap-1 @sm:gap-2">
		<Timer className="size-4 @md:size-5 opacity-80" />
		<div className="flex items-center gap-1">
			{items.map((item, i) => (
				<div key={i} className="flex items-center">
					<CountdownItem value={item.value} label={item.label} />
					{i < items.length - 1 && (
						<span className="text-lg font-bold mx-0.5 opacity-60">:</span>
					)}
				</div>
			))}
		</div>
	</div>
);

const PromoText = ({
	text,
	highlight,
}: {
	text: string;
	highlight: string;
}) => (
	<p className="text-sm @md:text-base font-medium">
		{text} <span className="font-bold">{highlight}</span>
	</p>
);

const CTAButton = ({ label, href }: { label: string; href: string }) => (
	<Button
		size="sm"
		variant="secondary"
		className="bg-background/20 hover:bg-background/30 border-0 gap-1 text-inherit"
		asChild
	>
		<Link href={href}>
			{label}
			<ChevronRight className="size-3.5" />
		</Link>
	</Button>
);

export default function Main() {
	return (
		<section className="@container relative" data-theme="neon">
			<div className="bg-primary py-3 @md:py-4 px-4 @sm:px-6 @2xl:px-8">
				<div className="flex flex-wrap items-center justify-center gap-4 @md:gap-6 @lg:gap-8 text-primary-foreground">
					<CountdownTimer
						items={[
							{ value: '02', label: 'Days' },
							{ value: '14', label: 'Hrs' },
							{ value: '36', label: 'Min' },
							{ value: '22', label: 'Sec' },
						]}
					/>
					<PromoText text="Flash Sale ends soon!" highlight="Save 40%" />
					<CTAButton label="Shop Flash Sale" href="/flash-sale" />
				</div>
			</div>
		</section>
	);
}
