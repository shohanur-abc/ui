import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Minus, Plus, X, ArrowRight, Check, Circle, ShoppingCart, CreditCard, Truck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CartItem {
	id: string;
	image: string;
	name: string;
	variant: string;
	price: number;
	quantity: number;
}

interface Step {
	id: number;
	label: string;
	icon: React.ComponentType<{ className?: string }>;
	completed: boolean;
	active: boolean;
}

const PageHeader = ({ title }: { title: string }) => (
	<h1 className="text-2xl font-bold @md:text-3xl text-center">{title}</h1>
);

const StepIndicator = ({ steps }: { steps: Step[] }) => {
	const completedSteps = steps.filter((s) => s.completed).length;
	const progress = (completedSteps / steps.length) * 100;

	return (
		<div className="relative">
			<Progress value={progress} className="h-1 absolute top-5 left-0 right-0" />
			<div className="relative flex justify-between">
				{steps.map((step) => (
					<div key={step.id} className="flex flex-col items-center">
						<div
							className={`size-10 rounded-full flex items-center justify-center ${
								step.completed
									? 'bg-primary text-primary-foreground'
									: step.active
										? 'bg-primary/10 text-primary border-2 border-primary'
										: 'bg-muted text-muted-foreground'
							}`}
						>
							{step.completed ? <Check className="size-5" /> : <step.icon className="size-5" />}
						</div>
						<span
							className={`mt-2 text-sm font-medium ${
								step.active || step.completed ? 'text-foreground' : 'text-muted-foreground'
							}`}
						>
							{step.label}
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

const ItemThumb = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const ItemInfo = ({ name, variant }: { name: string; variant: string }) => (
	<div className="min-w-0 flex-1">
		<h3 className="font-medium line-clamp-1">{name}</h3>
		<p className="text-sm text-muted-foreground">{variant}</p>
	</div>
);

const QuantityControl = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center rounded-lg border">
		<Button size="icon-sm" variant="ghost" className="size-8">
			<Minus className="size-3" />
		</Button>
		<span className="w-6 text-center text-sm font-medium">{quantity}</span>
		<Button size="icon-sm" variant="ghost" className="size-8">
			<Plus className="size-3" />
		</Button>
	</div>
);

const ItemPrice = ({ price, quantity }: { price: number; quantity: number }) => (
	<p className="font-semibold">${(price * quantity).toFixed(2)}</p>
);

const RemoveItem = () => (
	<Button size="icon-sm" variant="ghost" className="text-muted-foreground hover:text-destructive">
		<X className="size-4" />
	</Button>
);

const CartItemRow = ({ item }: { item: CartItem }) => (
	<div className="flex items-center gap-4 py-4">
		<ItemThumb src={item.image} alt={item.name} />
		<ItemInfo name={item.name} variant={item.variant} />
		<QuantityControl quantity={item.quantity} />
		<ItemPrice price={item.price} quantity={item.quantity} />
		<RemoveItem />
	</div>
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
	<div className={`flex justify-between ${bold ? 'text-lg font-bold' : 'text-muted-foreground'}`}>
		<span>{label}</span>
		<span className={bold ? 'text-primary' : ''}>{value}</span>
	</div>
);

const NavigationButtons = ({
	backLabel,
	backHref,
	nextLabel,
	nextHref,
}: {
	backLabel: string;
	backHref: string;
	nextLabel: string;
	nextHref: string;
}) => (
	<div className="flex gap-4">
		<Button variant="outline" size="lg" className="flex-1" asChild>
			<Link href={backHref}>{backLabel}</Link>
		</Button>
		<Button size="lg" className="flex-1 gap-2" asChild>
			<Link href={nextHref}>
				{nextLabel}
				<ArrowRight className="size-4" />
			</Link>
		</Button>
	</div>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop',
			name: 'Running Shoes',
			variant: 'Red • US 10',
			price: 129.99,
			quantity: 1,
		},
		{
			id: '2',
			image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop',
			name: 'Classic Watch',
			variant: 'Silver',
			price: 199.99,
			quantity: 1,
		},
	];

	const steps: Step[] = [
		{ id: 1, label: 'Cart', icon: ShoppingCart, completed: false, active: true },
		{ id: 2, label: 'Shipping', icon: Truck, completed: false, active: false },
		{ id: 3, label: 'Payment', icon: CreditCard, completed: false, active: false },
	];

	const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

	return (
		<section className="@container">
			<div className="mx-auto max-w-3xl px-4 py-8 @md:py-12">
				<PageHeader title="Checkout" />

				<div className="mt-8">
					<StepIndicator steps={steps} />
				</div>

				<Card className="mt-10">
					<CardHeader>
						<CardTitle>Review Your Cart</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="divide-y">
							{items.map((item) => (
								<CartItemRow key={item.id} item={item} />
							))}
						</div>

						<Separator className="my-6" />

						<div className="space-y-3">
							<SummaryLine label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
							<SummaryLine label="Shipping" value="Calculated next" />
							<SummaryLine label="Tax" value="Calculated next" />
							<Separator className="my-3" />
							<SummaryLine label="Estimated Total" value={`$${subtotal.toFixed(2)}`} bold />
						</div>
					</CardContent>
					<CardFooter>
						<NavigationButtons
							backLabel="Continue Shopping"
							backHref="/shop"
							nextLabel="Shipping"
							nextHref="/checkout/shipping"
						/>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
