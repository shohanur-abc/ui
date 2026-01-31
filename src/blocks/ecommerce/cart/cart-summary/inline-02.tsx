import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Truck, Clock, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type InfoTagProps = {
	icon: LucideIcon;
	text: string;
	variant?: 'default' | 'success';
};

const InfoTag = ({ icon: Icon, text, variant = 'default' }: InfoTagProps) => (
	<span
		className={`inline-flex items-center gap-1 text-sm ${
			variant === 'success' ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'
		}`}
	>
		<Icon className="size-3" />
		{text}
	</span>
);

const PriceInline = ({ value }: { value: string }) => (
	<span className="text-xl font-bold">{value}</span>
);

export default function Main() {
	const infoTags: InfoTagProps[] = [
		{ icon: Truck, text: 'Free Shipping', variant: 'success' },
		{ icon: Clock, text: 'Ships in 24h' },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-2xl px-4 py-8 @sm:px-6 @md:py-10">
				<div className="flex flex-wrap items-center justify-between gap-4 border-y bg-muted/30 px-4 py-4">
					<div className="flex flex-wrap items-center gap-4">
						<PriceInline value="$259.00" />
						{infoTags.map((tag, i) => (
							<InfoTag key={i} {...tag} />
						))}
					</div>
					<Button asChild>
						<Link href="/checkout">Proceed to Checkout</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
