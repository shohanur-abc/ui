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
	Boxes,
	Truck,
	CreditCard,
	Shield,
	Gift,
	Percent,
} from 'lucide-react';
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

interface Module {
	id: string;
	title: string;
	icon: React.ComponentType<{ className?: string }>;
	content: React.ReactNode;
}

const PageHeader = ({
	title,
	subtitle,
}: {
	title: string;
	subtitle: string;
}) => (
	<div className="flex items-center gap-3">
		<Boxes className="size-6 text-primary" />
		<div>
			<h1 className="text-2xl font-bold @md:text-3xl">{title}</h1>
			<p className="text-muted-foreground">{subtitle}</p>
		</div>
	</div>
);

const ItemImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const QuantityControl = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center rounded-lg border">
		<Button size="icon-sm" variant="ghost" className="size-7">
			<Minus className="size-3" />
		</Button>
		<span className="w-5 text-center text-sm">{quantity}</span>
		<Button size="icon-sm" variant="ghost" className="size-7">
			<Plus className="size-3" />
		</Button>
	</div>
);

const CartItemRow = ({ item }: { item: CartItem }) => (
	<div className="flex gap-3 py-3">
		<ItemImage src={item.image} alt={item.name} />
		<div className="flex-1 min-w-0">
			<h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
			<p className="text-xs text-muted-foreground">{item.variant}</p>
			<div className="flex items-center justify-between mt-2">
				<QuantityControl quantity={item.quantity} />
				<p className="font-semibold text-sm">
					${(item.price * item.quantity).toFixed(2)}
				</p>
			</div>
		</div>
		<Button
			size="icon-sm"
			variant="ghost"
			className="size-6 text-muted-foreground hover:text-destructive"
		>
			<X className="size-3" />
		</Button>
	</div>
);

const ModuleCard = ({ module }: { module: Module }) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="flex items-center gap-2 text-base">
				<module.icon className="size-4 text-primary" />
				{module.title}
			</CardTitle>
		</CardHeader>
		<CardContent>{module.content}</CardContent>
	</Card>
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
		className={`flex justify-between text-sm ${bold ? 'font-bold text-base' : 'text-muted-foreground'}`}
	>
		<span>{label}</span>
		<span className={bold ? 'text-primary' : ''}>{value}</span>
	</div>
);

const ShippingModule = () => (
	<div className="space-y-2">
		<div className="flex items-center justify-between p-2 rounded-lg border cursor-pointer hover:border-primary">
			<div className="flex items-center gap-2">
				<input
					type="radio"
					name="shipping"
					defaultChecked
					className="accent-primary"
				/>
				<span className="text-sm">Standard (5-7 days)</span>
			</div>
			<span className="text-sm font-medium">Free</span>
		</div>
		<div className="flex items-center justify-between p-2 rounded-lg border cursor-pointer hover:border-primary">
			<div className="flex items-center gap-2">
				<input type="radio" name="shipping" className="accent-primary" />
				<span className="text-sm">Express (2-3 days)</span>
			</div>
			<span className="text-sm font-medium">$9.99</span>
		</div>
		<div className="flex items-center justify-between p-2 rounded-lg border cursor-pointer hover:border-primary">
			<div className="flex items-center gap-2">
				<input type="radio" name="shipping" className="accent-primary" />
				<span className="text-sm">Next Day</span>
			</div>
			<span className="text-sm font-medium">$19.99</span>
		</div>
	</div>
);

const PromoModule = () => (
	<div className="space-y-3">
		<div className="flex gap-2">
			<input
				type="text"
				placeholder="Enter promo code"
				className="flex-1 px-3 py-2 text-sm border rounded-lg"
			/>
			<Button size="sm">Apply</Button>
		</div>
		<div className="flex items-center gap-2 text-sm text-green-600">
			<Badge variant="outline" className="bg-green-500/10 border-green-500/30">
				SAVE20
			</Badge>
			<span>20% off applied!</span>
		</div>
	</div>
);

const GiftModule = () => (
	<div className="space-y-3">
		<label className="flex items-center gap-2 cursor-pointer">
			<input type="checkbox" className="accent-primary" />
			<span className="text-sm">Add gift wrapping (+$4.99)</span>
		</label>
		<textarea
			placeholder="Add a gift message..."
			className="w-full px-3 py-2 text-sm border rounded-lg resize-none"
			rows={2}
		/>
	</div>
);

const ProtectionModule = () => (
	<div className="space-y-2">
		<label className="flex items-start gap-2 cursor-pointer p-2 rounded-lg border hover:border-primary">
			<input type="checkbox" className="accent-primary mt-1" />
			<div>
				<span className="text-sm font-medium">Extended Warranty</span>
				<p className="text-xs text-muted-foreground">
					2 years protection for $29.99
				</p>
			</div>
		</label>
	</div>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			image:
				'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&h=150&fit=crop',
			name: 'Running Shoes Pro',
			variant: 'Red • US 10',
			price: 149.99,
			quantity: 1,
		},
		{
			id: '2',
			image:
				'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop',
			name: 'Studio Headphones',
			variant: 'Black',
			price: 299.99,
			quantity: 1,
		},
	];

	const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
	const discount = subtotal * 0.2;
	const tax = (subtotal - discount) * 0.08;
	const total = subtotal - discount + tax;

	const modules: Module[] = [
		{
			id: 'shipping',
			title: 'Shipping Options',
			icon: Truck,
			content: <ShippingModule />,
		},
		{
			id: 'promo',
			title: 'Promo Code',
			icon: Percent,
			content: <PromoModule />,
		},
		{ id: 'gift', title: 'Gift Options', icon: Gift, content: <GiftModule /> },
		{
			id: 'protection',
			title: 'Protection',
			icon: Shield,
			content: <ProtectionModule />,
		},
	];

	const summaryLines = [
		{ label: 'Subtotal', value: `$${subtotal.toFixed(2)}` },
		{ label: 'Discount', value: `-$${discount.toFixed(2)}` },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: `$${tax.toFixed(2)}` },
		{ label: 'Total', value: `$${total.toFixed(2)}`, bold: true },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-5xl px-4 py-8 @md:py-12">
				<PageHeader
					title="Modular Cart"
					subtitle="Customize your checkout experience"
				/>

				<div className="mt-8 grid gap-6 @lg:grid-cols-3">
					{/* Cart Items Module */}
					<div className="@lg:col-span-2 space-y-4">
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Badge variant="secondary">{items.length}</Badge>
									Cart Items
								</CardTitle>
							</CardHeader>
							<CardContent className="divide-y">
								{items.map((item) => (
									<CartItemRow key={item.id} item={item} />
								))}
							</CardContent>
						</Card>

						{/* Add-on Modules */}
						<div className="grid gap-4 @md:grid-cols-2">
							{modules.map((module) => (
								<ModuleCard key={module.id} module={module} />
							))}
						</div>
					</div>

					{/* Summary Module */}
					<div>
						<Card className="sticky top-4">
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<CreditCard className="size-4 text-primary" />
									Summary
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-2">
								{summaryLines.map((line, i) => (
									<div key={i}>
										{line.bold && <Separator className="my-2" />}
										<SummaryLine {...line} />
									</div>
								))}
							</CardContent>
							<CardFooter>
								<Button className="w-full gap-2" size="lg" asChild>
									<Link href="/checkout">
										Checkout
										<ArrowRight className="size-4" />
									</Link>
								</Button>
							</CardFooter>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
