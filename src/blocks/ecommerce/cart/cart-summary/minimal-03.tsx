import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import Link from 'next/link';

type LineItemProps = {
	label: string;
	value: string;
};

const LineItem = ({ label, value }: LineItemProps) => (
	<div className="flex justify-between text-sm text-muted-foreground">
		<span>{label}</span>
		<span>{value}</span>
	</div>
);

const Total = ({ label, value }: { label: string; value: string }) => (
	<div className="flex justify-between text-lg">
		<span className="font-medium">{label}</span>
		<span className="font-bold">{value}</span>
	</div>
);

const SecureNote = ({ text }: { text: string }) => (
	<p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
		<Lock className="size-3" />
		{text}
	</p>
);

export default function Main() {
	const items: LineItemProps[] = [
		{ label: '2 items', value: '$189.00' },
		{ label: 'Delivery', value: '$5.99' },
		{ label: 'Tax', value: '$15.60' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-xs px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="space-y-4 rounded-lg border p-4">
					<div className="space-y-1">
						{items.map((item, i) => (
							<LineItem key={i} {...item} />
						))}
					</div>
					<div className="border-t pt-3">
						<Total label="Total" value="$210.59" />
					</div>
					<Button className="w-full" asChild>
						<Link href="/checkout">Continue</Link>
					</Button>
					<SecureNote text="Secure checkout" />
				</div>
			</div>
		</section>
	);
}
