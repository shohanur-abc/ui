import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Lock, Shield, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type TrustIconProps = {
	icon: LucideIcon;
};

const TrustIcons = ({ icons }: { icons: TrustIconProps[] }) => (
	<div className="flex items-center gap-2">
		{icons.map(({ icon: Icon }, i) => (
			<Icon key={i} className="size-4 text-muted-foreground" />
		))}
	</div>
);

const SummaryLine = ({
	subtotal,
	shipping,
	tax,
}: {
	subtotal: string;
	shipping: string;
	tax: string;
}) => (
	<span className="text-sm text-muted-foreground">
		{subtotal} + {shipping} shipping + {tax} tax
	</span>
);

const TotalPrice = ({ value }: { value: string }) => (
	<span className="text-xl font-bold">{value}</span>
);

export default function Main() {
	const trustIcons: TrustIconProps[] = [{ icon: Lock }, { icon: Shield }];

	return (
		<section className="@container">
			<div className="mx-auto max-w-lg px-4 py-8 @sm:px-6 @md:py-10">
				<div className="flex flex-wrap items-center justify-between gap-4 rounded-lg bg-muted/50 p-4">
					<div className="space-y-1">
						<div className="flex items-center gap-3">
							<TotalPrice value="$189.47" />
							<TrustIcons icons={trustIcons} />
						</div>
						<SummaryLine subtotal="$159.00" shipping="$12.99" tax="$17.48" />
					</div>
					<Button size="lg" asChild>
						<Link href="/checkout">Secure Checkout</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
