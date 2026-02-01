import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Percent, ArrowRight, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type DiscountRowProps = {
	icon: LucideIcon;
	label: string;
	value: string;
};

const DiscountTag = ({ icon: Icon, label, value }: DiscountRowProps) => (
	<div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
		<Icon className="size-3" />
		<span>{label}:</span>
		<span className="font-medium">{value}</span>
	</div>
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
		<span className="text-xl font-bold text-primary">{final}</span>
	</div>
);

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-md px-4 py-8 @sm:px-6 @md:py-10">
				<div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
					<div className="flex flex-wrap items-center justify-between gap-4">
						<div className="space-y-1">
							<PriceStack original="$499.00" final="$424.15" />
							<DiscountTag icon={Percent} label="You save" value="$74.85" />
						</div>
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
