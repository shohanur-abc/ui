import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag, ArrowRight, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
	variant?: 'default' | 'highlight' | 'muted';
};

type ActionProps = {
	label: string;
	href: string;
	icon?: LucideIcon;
	variant?: 'default' | 'outline' | 'ghost';
};

const SummaryRow = ({ label, value, variant = 'default' }: SummaryRowProps) => (
	<div
		className={`flex items-center justify-between ${
			variant === 'highlight'
				? 'text-lg font-semibold'
				: variant === 'muted'
					? 'text-sm text-muted-foreground'
					: 'text-sm'
		}`}
	>
		<span>{label}</span>
		<span>{value}</span>
	</div>
);

const Header = ({
	icon: Icon,
	title,
	itemCount,
}: {
	icon: LucideIcon;
	title: string;
	itemCount: number;
}) => (
	<CardHeader className="border-b">
		<CardTitle className="flex items-center gap-2">
			<Icon className="size-5" />
			<span>{title}</span>
			<span className="ml-auto text-sm font-normal text-muted-foreground">
				{itemCount} items
			</span>
		</CardTitle>
	</CardHeader>
);

const Actions = ({ items }: { items: ActionProps[] }) => (
	<CardFooter className="flex-col gap-3 border-t">
		{items.map(({ label, href, icon: Icon, variant = 'default' }, i) => (
			<Button
				key={i}
				variant={variant}
				className="w-full gap-2"
				size="lg"
				asChild
			>
				<Link href={href}>
					{label}
					{Icon && <Icon className="size-4" />}
				</Link>
			</Button>
		))}
	</CardFooter>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$249.00' },
		{ label: 'Shipping', value: '$12.00' },
		{ label: 'Tax', value: '$26.10', variant: 'muted' },
	];

	const totalRow: SummaryRowProps = {
		label: 'Total',
		value: '$287.10',
		variant: 'highlight',
	};

	const actions: ActionProps[] = [
		{
			label: 'Proceed to Checkout',
			href: '/checkout',
			icon: ArrowRight,
			variant: 'default',
		},
		{ label: 'Continue Shopping', href: '/shop', variant: 'outline' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-md px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<Card>
					<Header icon={ShoppingBag} title="Order Summary" itemCount={3} />
					<CardContent className="space-y-3">
						{summaryItems.map((item, i) => (
							<SummaryRow key={i} {...item} />
						))}
						<Separator />
						<SummaryRow {...totalRow} />
					</CardContent>
					<Actions items={actions} />
				</Card>
			</div>
		</section>
	);
}
