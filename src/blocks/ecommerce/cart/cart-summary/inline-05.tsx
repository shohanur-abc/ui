import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Percent, ArrowRight, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type DiscountBadgeProps = {
	icon: LucideIcon;
	text: string;
};

const DiscountBadge = ({ icon: Icon, text }: DiscountBadgeProps) => (
	<Badge
		variant="secondary"
		className="gap-1 bg-green-500/10 text-green-600 hover:bg-green-500/20 dark:text-green-400"
	>
		<Icon className="size-3" />
		{text}
	</Badge>
);

const PriceStack = ({
	original,
	final,
}: {
	original: string;
	final: string;
}) => (
	<div className="flex items-baseline gap-2">
		<span className="text-sm text-muted-foreground line-through">
			{original}
		</span>
		<span className="text-xl font-bold">{final}</span>
	</div>
);

const SavingsText = ({ value }: { value: string }) => (
	<span className="text-sm text-green-600 dark:text-green-400">
		You save {value}
	</span>
);

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-2xl px-4 py-8 @sm:px-6 @md:py-10">
				<div className="flex flex-wrap items-center gap-4 rounded-lg border-2 border-green-500/30 bg-green-500/5 px-4 py-3">
					<DiscountBadge icon={Percent} text="20% OFF" />
					<PriceStack original="$449.00" final="$359.20" />
					<SavingsText value="$89.80" />
					<div className="ml-auto">
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
