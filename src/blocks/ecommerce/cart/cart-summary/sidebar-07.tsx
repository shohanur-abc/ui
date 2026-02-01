import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
	Gift,
	Package,
	MessageSquare,
	Sparkles,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
};

type AddOnProps = {
	id: string;
	icon: LucideIcon;
	name: string;
	description: string;
	price: string;
	enabled?: boolean;
};

const AddOnOption = ({
	id,
	icon: Icon,
	name,
	description,
	price,
	enabled,
}: AddOnProps) => (
	<div className="flex items-start gap-3 py-2">
		<div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
			<Icon className="size-4 text-primary" />
		</div>
		<div className="flex-1">
			<div className="flex items-center justify-between">
				<span className="text-sm font-medium">{name}</span>
				<Switch id={id} defaultChecked={enabled} />
			</div>
			<p className="text-xs text-muted-foreground">{description}</p>
			<p className="text-xs font-medium text-primary">{price}</p>
		</div>
	</div>
);

const SummaryRow = ({ label, value }: SummaryRowProps) => (
	<div className="flex items-center justify-between py-1 text-sm">
		<span className="text-muted-foreground">{label}</span>
		<span className="font-medium">{value}</span>
	</div>
);

export default function Main() {
	const addOns: AddOnProps[] = [
		{
			id: 'wrap',
			icon: Gift,
			name: 'Gift Wrap',
			description: 'Beautiful gift wrapping',
			price: '+$5.99',
			enabled: true,
		},
		{
			id: 'message',
			icon: MessageSquare,
			name: 'Gift Message',
			description: 'Add a personal note',
			price: 'Free',
		},
		{
			id: 'box',
			icon: Package,
			name: 'Premium Box',
			description: 'Luxury presentation box',
			price: '+$12.99',
		},
	];

	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$189.00' },
		{ label: 'Add-ons', value: '$5.99' },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$15.60' },
	];

	return (
		<section className="@container">
			<aside className="mx-auto h-auto min-h-[580px] max-w-xs rounded-2xl border bg-background px-5 py-6 shadow-lg @md:max-w-sm">
				<h3 className="mb-4 text-lg font-semibold">Gift Options</h3>
				<div className="mb-4 divide-y">
					{addOns.map((addOn) => (
						<AddOnOption key={addOn.id} {...addOn} />
					))}
				</div>
				<Separator className="my-4" />
				<div className="mb-4 space-y-1">
					{summaryItems.map((item, i) => (
						<SummaryRow key={i} {...item} />
					))}
				</div>
				<Separator className="my-4" />
				<div className="mb-4 flex items-center justify-between">
					<span className="text-lg font-semibold">Total</span>
					<span className="text-2xl font-bold">$210.59</span>
				</div>
				<Button
					className="w-full gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
					size="lg"
					asChild
				>
					<Link href="/checkout">
						<Sparkles className="size-4" />
						Send Gift
					</Link>
				</Button>
			</aside>
		</section>
	);
}
