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
import {
	Minus,
	Plus,
	X,
	ArrowRight,
	Check,
	CircleDot,
	Circle,
	ShoppingCart,
	MapPin,
	CreditCard,
	Package,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CartItem {
	id: string;
	image: string;
	name: string;
	price: number;
	quantity: number;
}

interface StepData {
	number: number;
	label: string;
	status: 'completed' | 'current' | 'upcoming';
}

const PageHeader = ({ title }: { title: string }) => (
	<h1 className="text-2xl font-bold @md:text-3xl">{title}</h1>
);

const StepNumber = ({ step }: { step: StepData }) => {
	const getIcon = () => {
		if (step.status === 'completed') return <Check className="size-4" />;
		return <span className="font-semibold">{step.number}</span>;
	};

	return (
		<div
			className={`size-8 rounded-full flex items-center justify-center text-sm ${
				step.status === 'completed'
					? 'bg-primary text-primary-foreground'
					: step.status === 'current'
						? 'bg-primary text-primary-foreground'
						: 'bg-muted text-muted-foreground'
			}`}
		>
			{getIcon()}
		</div>
	);
};

const StepItem = ({ step, isLast }: { step: StepData; isLast: boolean }) => (
	<div className="flex items-start gap-4">
		<div className="flex flex-col items-center">
			<StepNumber step={step} />
			{!isLast && (
				<div
					className={`w-0.5 h-full min-h-[60px] ${
						step.status === 'completed' ? 'bg-primary' : 'bg-muted'
					}`}
				/>
			)}
		</div>
		<div className="flex-1 pb-8">
			<h3
				className={`font-semibold ${
					step.status === 'upcoming' ? 'text-muted-foreground' : ''
				}`}
			>
				{step.label}
			</h3>
		</div>
	</div>
);

const StepProgress = ({ steps }: { steps: StepData[] }) => (
	<div className="space-y-0">
		{steps.map((step, i) => (
			<StepItem key={step.number} step={step} isLast={i === steps.length - 1} />
		))}
	</div>
);

const ItemThumb = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const ItemDetails = ({
	name,
	price,
	quantity,
}: {
	name: string;
	price: number;
	quantity: number;
}) => (
	<div className="flex-1 min-w-0">
		<h4 className="font-medium line-clamp-1">{name}</h4>
		<p className="text-sm text-muted-foreground">Qty: {quantity}</p>
	</div>
);

const ItemSubtotal = ({
	price,
	quantity,
}: {
	price: number;
	quantity: number;
}) => <p className="font-semibold">${(price * quantity).toFixed(2)}</p>;

const CartItemCompact = ({ item }: { item: CartItem }) => (
	<div className="flex items-center gap-3 py-3">
		<ItemThumb src={item.image} alt={item.name} />
		<ItemDetails name={item.name} price={item.price} quantity={item.quantity} />
		<ItemSubtotal price={item.price} quantity={item.quantity} />
	</div>
);

const EditButton = ({ label, href }: { label: string; href: string }) => (
	<Button variant="ghost" size="sm" asChild>
		<Link href={href}>{label}</Link>
	</Button>
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
		className={`flex justify-between ${bold ? 'text-lg font-bold' : 'text-muted-foreground'}`}
	>
		<span>{label}</span>
		<span className={bold ? 'text-primary' : ''}>{value}</span>
	</div>
);

const CartReviewCard = ({
	title,
	items,
	editLabel,
	editHref,
}: {
	title: string;
	items: CartItem[];
	editLabel: string;
	editHref: string;
}) => (
	<Card>
		<CardHeader className="flex-row items-center justify-between space-y-0">
			<CardTitle className="text-base">{title}</CardTitle>
			<EditButton label={editLabel} href={editHref} />
		</CardHeader>
		<CardContent className="divide-y pt-0">
			{items.map((item) => (
				<CartItemCompact key={item.id} item={item} />
			))}
		</CardContent>
	</Card>
);

const OrderTotal = ({
	lines,
	checkoutLabel,
	checkoutHref,
}: {
	lines: { label: string; value: string; bold?: boolean }[];
	checkoutLabel: string;
	checkoutHref: string;
}) => (
	<Card>
		<CardContent className="pt-6 space-y-3">
			{lines.map((line, i) => (
				<div key={i}>
					{line.bold && <Separator className="my-3" />}
					<SummaryLine {...line} />
				</div>
			))}
		</CardContent>
		<CardFooter>
			<Button className="w-full gap-2" size="lg" asChild>
				<Link href={checkoutHref}>
					{checkoutLabel}
					<ArrowRight className="size-4" />
				</Link>
			</Button>
		</CardFooter>
	</Card>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			image:
				'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop',
			name: 'Premium Running Shoes',
			price: 149.99,
			quantity: 1,
		},
		{
			id: '2',
			image:
				'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop',
			name: 'Classic Timepiece',
			price: 249.99,
			quantity: 1,
		},
	];

	const steps: StepData[] = [
		{ number: 1, label: 'Review Cart', status: 'current' },
		{ number: 2, label: 'Shipping Address', status: 'upcoming' },
		{ number: 3, label: 'Payment Method', status: 'upcoming' },
		{ number: 4, label: 'Confirm Order', status: 'upcoming' },
	];

	const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
	const tax = subtotal * 0.08;
	const total = subtotal + tax;

	const summaryLines = [
		{ label: 'Subtotal', value: `$${subtotal.toFixed(2)}` },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: `$${tax.toFixed(2)}` },
		{ label: 'Total', value: `$${total.toFixed(2)}`, bold: true },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-5xl px-4 py-8 @md:py-12">
				<PageHeader title="Checkout" />

				<div className="mt-8 grid gap-8 @lg:grid-cols-12">
					{/* Steps sidebar */}
					<div className="@lg:col-span-3">
						<StepProgress steps={steps} />
					</div>

					{/* Main content */}
					<div className="@lg:col-span-9 space-y-6">
						<CartReviewCard
							title="Your Items"
							items={items}
							editLabel="Edit"
							editHref="/cart"
						/>

						<OrderTotal
							lines={summaryLines}
							checkoutLabel="Continue to Shipping"
							checkoutHref="/checkout/shipping"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
