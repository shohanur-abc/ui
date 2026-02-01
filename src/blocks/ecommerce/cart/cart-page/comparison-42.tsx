import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Minus,
	Plus,
	X,
	ArrowRight,
	GitCompareArrows,
	Check,
	Minus as MinusIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CartItem {
	id: string;
	image: string;
	name: string;
	price: number;
	quantity: number;
	features: {
		warranty: string;
		shipping: string;
		returns: string;
		inStock: boolean;
	};
}

const PageHeader = ({
	title,
	subtitle,
}: {
	title: string;
	subtitle: string;
}) => (
	<div className="flex items-center gap-3">
		<GitCompareArrows className="size-6 text-primary" />
		<div>
			<h1 className="text-2xl font-bold @md:text-3xl">{title}</h1>
			<p className="text-muted-foreground">{subtitle}</p>
		</div>
	</div>
);

const FeatureRow = ({
	label,
	values,
}: {
	label: string;
	values: (string | boolean)[];
}) => (
	<tr className="border-b">
		<td className="py-3 px-4 font-medium text-muted-foreground">{label}</td>
		{values.map((value, i) => (
			<td key={i} className="py-3 px-4 text-center">
				{typeof value === 'boolean' ? (
					value ? (
						<Check className="size-5 text-green-500 mx-auto" />
					) : (
						<MinusIcon className="size-5 text-muted-foreground mx-auto" />
					)
				) : (
					<span>{value}</span>
				)}
			</td>
		))}
	</tr>
);

const ItemColumn = ({ item }: { item: CartItem }) => (
	<th className="p-4 align-top">
		<div className="relative aspect-square w-full max-w-[150px] mx-auto overflow-hidden rounded-xl bg-muted">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<h3 className="font-semibold mt-3 line-clamp-2">{item.name}</h3>
		<p className="text-xl font-bold text-primary mt-1">
			${item.price.toFixed(2)}
		</p>
		<div className="flex items-center justify-center gap-2 mt-3">
			<div className="flex items-center rounded-lg border">
				<Button size="icon-sm" variant="ghost" className="size-8">
					<Minus className="size-3" />
				</Button>
				<span className="w-6 text-center text-sm">{item.quantity}</span>
				<Button size="icon-sm" variant="ghost" className="size-8">
					<Plus className="size-3" />
				</Button>
			</div>
			<Button
				size="icon-sm"
				variant="ghost"
				className="text-muted-foreground hover:text-destructive"
			>
				<X className="size-4" />
			</Button>
		</div>
	</th>
);

const SelectionCheckbox = ({
	id,
	checked,
}: {
	id: string;
	checked: boolean;
}) => (
	<td className="py-3 px-4 text-center">
		<Checkbox id={id} defaultChecked={checked} />
	</td>
);

const SummaryLine = ({
	label,
	value,
	bold,
}: {
	label: string;
	value: string;
	bold?: boolean;
}) => (
	<div
		className={`flex justify-between ${bold ? 'text-xl font-bold' : 'text-muted-foreground'}`}
	>
		<span>{label}</span>
		<span className={bold ? 'text-primary' : ''}>{value}</span>
	</div>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			image:
				'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
			name: 'Studio Headphones Pro',
			price: 349.99,
			quantity: 1,
			features: {
				warranty: '2 years',
				shipping: 'Free (3-5 days)',
				returns: '30 days',
				inStock: true,
			},
		},
		{
			id: '2',
			image:
				'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300&h=300&fit=crop',
			name: 'Wireless Earbuds',
			price: 199.99,
			quantity: 1,
			features: {
				warranty: '1 year',
				shipping: 'Free (5-7 days)',
				returns: '14 days',
				inStock: true,
			},
		},
		{
			id: '3',
			image:
				'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
			name: 'Classic Watch',
			price: 249.99,
			quantity: 1,
			features: {
				warranty: '3 years',
				shipping: '$9.99 (2-3 days)',
				returns: '60 days',
				inStock: false,
			},
		},
	];

	const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
	const tax = subtotal * 0.08;
	const total = subtotal + tax;

	const summaryLines = [
		{ label: 'Subtotal', value: `$${subtotal.toFixed(2)}` },
		{ label: 'Shipping', value: 'Calculated at checkout' },
		{ label: 'Tax', value: `$${tax.toFixed(2)}` },
		{ label: 'Total', value: `$${total.toFixed(2)}`, bold: true },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-5xl px-4 py-8 @md:py-12">
				<PageHeader
					title="Compare Cart Items"
					subtitle="Select items for checkout"
				/>

				<Card className="mt-8 overflow-x-auto">
					<table className="w-full min-w-[600px]">
						<thead>
							<tr className="border-b">
								<th className="p-4 text-left font-medium text-muted-foreground w-40">
									Product
								</th>
								{items.map((item) => (
									<ItemColumn key={item.id} item={item} />
								))}
							</tr>
						</thead>
						<tbody>
							<tr className="border-b bg-muted/30">
								<td className="py-3 px-4 font-medium">Select for checkout</td>
								{items.map((item) => (
									<SelectionCheckbox
										key={item.id}
										id={item.id}
										checked={true}
									/>
								))}
							</tr>
							<FeatureRow
								label="Warranty"
								values={items.map((i) => i.features.warranty)}
							/>
							<FeatureRow
								label="Shipping"
								values={items.map((i) => i.features.shipping)}
							/>
							<FeatureRow
								label="Returns"
								values={items.map((i) => i.features.returns)}
							/>
							<FeatureRow
								label="In Stock"
								values={items.map((i) => i.features.inStock)}
							/>
							<tr className="bg-muted/30">
								<td className="py-3 px-4 font-medium">Item Total</td>
								{items.map((item) => (
									<td
										key={item.id}
										className="py-3 px-4 text-center font-bold text-primary"
									>
										${(item.price * item.quantity).toFixed(2)}
									</td>
								))}
							</tr>
						</tbody>
					</table>
				</Card>

				<Card className="mt-8 max-w-md ml-auto">
					<CardHeader>
						<CardTitle>Order Summary</CardTitle>
					</CardHeader>
					<CardContent className="space-y-3">
						{summaryLines.map((line, i) => (
							<div key={i}>
								{line.bold && <Separator className="my-3" />}
								<SummaryLine {...line} />
							</div>
						))}
					</CardContent>
					<CardFooter>
						<Button className="w-full gap-2" size="lg" asChild>
							<Link href="/checkout">
								Checkout Selected
								<ArrowRight className="size-4" />
							</Link>
						</Button>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
