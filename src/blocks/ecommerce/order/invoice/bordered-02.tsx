import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, FileText, Package } from 'lucide-react';

interface OrderProps {
	orderNumber: string;
	orderDate: string;
	status: string;
	shippingMethod: string;
}

interface ProductProps {
	name: string;
	variant: string;
	quantity: number;
	price: number;
}

interface AddressProps {
	label: string;
	name: string;
	street: string;
	city: string;
}

interface TotalsProps {
	subtotal: number;
	shipping: number;
	tax: number;
	total: number;
	currency: string;
}

const OrderHeader = ({
	orderNumber,
	orderDate,
	status,
	shippingMethod,
}: OrderProps) => (
	<div className="border-4 border-double border-foreground p-6">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-3">
				<div className="size-12 border-2 border-foreground flex items-center justify-center">
					<FileText className="size-6" />
				</div>
				<div>
					<h1 className="text-2xl font-bold tracking-tight">{orderNumber}</h1>
					<p className="text-sm text-muted-foreground">{orderDate}</p>
				</div>
			</div>
			<div className="text-right">
				<Badge variant="default" className="rounded-none mb-1">
					{status}
				</Badge>
				<p className="text-xs text-muted-foreground">{shippingMethod}</p>
			</div>
		</div>
	</div>
);

const ProductRow = ({
	product,
	currency,
}: {
	product: ProductProps;
	currency: string;
}) => (
	<div className="border-2 border-foreground p-4 flex items-center gap-4">
		<div className="size-16 border-2 border-dashed border-foreground/50 flex items-center justify-center">
			<Package className="size-8 text-muted-foreground" />
		</div>
		<div className="flex-1">
			<p className="font-bold">{product.name}</p>
			<p className="text-sm text-muted-foreground">{product.variant}</p>
		</div>
		<div className="text-center border-l-2 border-r-2 border-foreground/30 px-6">
			<p className="text-xs text-muted-foreground uppercase">Qty</p>
			<p className="font-bold text-lg">{product.quantity}</p>
		</div>
		<div className="text-right min-w-[100px]">
			<p className="text-xs text-muted-foreground uppercase">Price</p>
			<p className="font-bold text-lg">
				{currency}
				{product.price.toFixed(2)}
			</p>
		</div>
	</div>
);

const AddressBox = ({ label, name, street, city }: AddressProps) => (
	<div className="border-2 border-foreground p-4">
		<p className="text-xs font-bold uppercase tracking-widest border-b-2 border-foreground pb-2 mb-3">
			{label}
		</p>
		<p className="font-medium">{name}</p>
		<p className="text-sm text-muted-foreground">{street}</p>
		<p className="text-sm text-muted-foreground">{city}</p>
	</div>
);

const TotalsBox = ({
	subtotal,
	shipping,
	tax,
	total,
	currency,
}: TotalsProps) => (
	<div className="border-4 border-double border-foreground p-4">
		<div className="space-y-2 text-sm">
			<div className="flex justify-between">
				<span>Subtotal</span>
				<span>
					{currency}
					{subtotal.toFixed(2)}
				</span>
			</div>
			<div className="flex justify-between">
				<span>Shipping</span>
				<span>
					{shipping === 0 ? 'FREE' : `${currency}${shipping.toFixed(2)}`}
				</span>
			</div>
			<div className="flex justify-between">
				<span>Tax</span>
				<span>
					{currency}
					{tax.toFixed(2)}
				</span>
			</div>
		</div>
		<Separator className="my-3" />
		<div className="flex justify-between font-bold text-xl">
			<span>Total</span>
			<span>
				{currency}
				{total.toFixed(2)}
			</span>
		</div>
	</div>
);

const StatusTracker = ({
	steps,
}: {
	steps: { label: string; completed: boolean }[];
}) => (
	<div className="border-2 border-foreground p-4">
		<p className="text-xs font-bold uppercase tracking-widest border-b-2 border-foreground pb-2 mb-3">
			Order Status
		</p>
		<div className="flex items-center justify-between">
			{steps.map((step, index) => (
				<div key={index} className="flex items-center">
					<div
						className={`size-6 border-2 ${step.completed ? 'border-foreground bg-foreground' : 'border-foreground/50'} flex items-center justify-center`}
					>
						{step.completed && (
							<CheckCircle className="size-4 text-background" />
						)}
					</div>
					{index < steps.length - 1 && (
						<div
							className={`h-0.5 w-8 @sm:w-12 ${step.completed ? 'bg-foreground' : 'bg-foreground/30'}`}
						/>
					)}
				</div>
			))}
		</div>
		<div className="flex justify-between mt-2">
			{steps.map((step, index) => (
				<p key={index} className="text-[10px] text-muted-foreground">
					{step.label}
				</p>
			))}
		</div>
	</div>
);

export default function Main() {
	const order: OrderProps = {
		orderNumber: 'ORD-2024-5678',
		orderDate: 'February 18, 2024',
		status: 'Shipped',
		shippingMethod: 'Express Delivery',
	};

	const products: ProductProps[] = [
		{
			name: 'Leather Messenger Bag',
			variant: 'Cognac / Medium',
			quantity: 1,
			price: 189.0,
		},
		{
			name: 'Canvas Backpack',
			variant: 'Navy Blue / Large',
			quantity: 1,
			price: 129.0,
		},
		{
			name: 'Leather Wallet',
			variant: 'Black / Bifold',
			quantity: 2,
			price: 59.0,
		},
	];

	const shippingAddress: AddressProps = {
		label: 'Ship To',
		name: 'Robert Johnson',
		street: '456 Oak Avenue, Suite 7',
		city: 'Portland, OR 97201',
	};

	const billingAddress: AddressProps = {
		label: 'Bill To',
		name: 'Robert Johnson',
		street: '456 Oak Avenue, Suite 7',
		city: 'Portland, OR 97201',
	};

	const totals: TotalsProps = {
		subtotal: 436.0,
		shipping: 0,
		tax: 39.24,
		total: 475.24,
		currency: '$',
	};

	const steps = [
		{ label: 'Ordered', completed: true },
		{ label: 'Processed', completed: true },
		{ label: 'Shipped', completed: true },
		{ label: 'Delivered', completed: false },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 py-8">
				<div className="space-y-4">
					<OrderHeader {...order} />
					<StatusTracker steps={steps} />
					<div className="space-y-2">
						{products.map((product, index) => (
							<ProductRow key={index} product={product} currency="$" />
						))}
					</div>
					<div className="grid @md:grid-cols-3 gap-4">
						<AddressBox {...shippingAddress} />
						<AddressBox {...billingAddress} />
						<TotalsBox {...totals} />
					</div>
				</div>
			</div>
		</section>
	);
}
