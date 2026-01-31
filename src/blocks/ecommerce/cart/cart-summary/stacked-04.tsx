import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Gift, Percent, ShieldCheck, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
	icon?: LucideIcon;
	highlight?: boolean;
};

type OptionProps = {
	id: string;
	label: string;
	description: string;
	checked?: boolean;
};

const SummaryRow = ({
	label,
	value,
	icon: Icon,
	highlight,
}: SummaryRowProps) => (
	<div
		className={`flex items-center justify-between text-sm ${highlight ? 'font-semibold text-primary' : ''}`}
	>
		<span className="flex items-center gap-2">
			{Icon && <Icon className="size-4" />}
			{label}
		</span>
		<span>{value}</span>
	</div>
);

const TotalRow = ({
	label,
	value,
	savings,
}: { label: string; value: string; savings?: string }) => (
	<div className="space-y-1">
		<div className="flex items-center justify-between text-xl font-bold">
			<span>{label}</span>
			<span>{value}</span>
		</div>
		{savings && (
			<div className="text-right text-sm text-green-600 dark:text-green-400">
				{savings}
			</div>
		)}
	</div>
);

const Header = ({
	title,
	badge,
}: { title: string; badge?: { label: string; icon: LucideIcon } }) => (
	<CardHeader className="border-b">
		<CardTitle className="flex items-center justify-between">
			{title}
			{badge && (
				<Badge className="gap-1">
					<badge.icon className="size-3" />
					{badge.label}
				</Badge>
			)}
		</CardTitle>
	</CardHeader>
);

const OptionItem = ({ id, label, description, checked }: OptionProps) => (
	<label
		htmlFor={id}
		className="flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50"
	>
		<Checkbox id={id} defaultChecked={checked} className="mt-0.5" />
		<div className="space-y-0.5">
			<div className="text-sm font-medium">{label}</div>
			<div className="text-xs text-muted-foreground">{description}</div>
		</div>
	</label>
);

const Actions = ({
	primaryLabel,
	primaryHref,
	secondaryLabel,
	secondaryHref,
}: {
	primaryLabel: string;
	primaryHref: string;
	secondaryLabel: string;
	secondaryHref: string;
}) => (
	<div className="space-y-2">
		<Button className="w-full" size="lg" asChild>
			<Link href={primaryHref}>{primaryLabel}</Link>
		</Button>
		<Button variant="ghost" className="w-full" asChild>
			<Link href={secondaryHref}>{secondaryLabel}</Link>
		</Button>
	</div>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$320.00' },
		{
			label: 'Member Discount',
			value: '-$32.00',
			icon: Percent,
			highlight: true,
		},
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$28.80' },
	];

	const options: OptionProps[] = [
		{
			id: 'gift',
			label: 'Gift wrapping',
			description: 'Add gift wrap for $5.99',
		},
		{
			id: 'insurance',
			label: 'Shipping insurance',
			description: 'Protect your order for $3.99',
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-md px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<Card>
					<Header
						title="Order Summary"
						badge={{ label: 'Member', icon: ShieldCheck }}
					/>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							{summaryItems.map((item, i) => (
								<SummaryRow key={i} {...item} />
							))}
						</div>
						<Separator />
						<div className="space-y-2">
							{options.map((option) => (
								<OptionItem key={option.id} {...option} />
							))}
						</div>
						<Separator />
						<TotalRow
							label="Total"
							value="$316.80"
							savings="You're saving $32.00!"
						/>
					</CardContent>
					<CardFooter className="border-t">
						<Actions
							primaryLabel="Proceed to Payment"
							primaryHref="/checkout"
							secondaryLabel="Apply Promo Code"
							secondaryHref="#promo"
						/>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
