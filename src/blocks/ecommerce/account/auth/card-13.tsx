import Link from 'next/link';
import { Mail, Lock, ArrowRight, ShoppingCart, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Logo = ({
	name,
	icon: Icon,
}: {
	name: string;
	icon: React.ElementType;
}) => (
	<div className="flex items-center gap-2">
		<div className="flex size-10 items-center justify-center rounded-xl bg-primary">
			<Icon className="size-5 text-primary-foreground" />
		</div>
		<span className="text-xl font-bold tracking-tight">{name}</span>
	</div>
);

const CartSummary = ({
	items,
	total,
}: {
	items: Array<{ name: string; price: string; quantity: number }>;
	total: string;
}) => (
	<div className="p-4 rounded-xl bg-muted/50 border border-border/50 mb-6">
		<p className="text-sm font-medium mb-3">Your cart ({items.length} items)</p>
		<div className="space-y-2">
			{items.map((item, i) => (
				<div key={i} className="flex justify-between text-sm">
					<span className="text-muted-foreground">
						{item.name} x{item.quantity}
					</span>
					<span>{item.price}</span>
				</div>
			))}
		</div>
		<Separator className="my-3" />
		<div className="flex justify-between font-medium">
			<span>Total</span>
			<span>{total}</span>
		</div>
	</div>
);

const FormField = ({
	label,
	type,
	placeholder,
	icon: Icon,
}: {
	label: string;
	type: string;
	placeholder: string;
	icon: React.ElementType;
}) => (
	<div className="space-y-2">
		<Label htmlFor={label.toLowerCase().replace(/\s/g, '-')}>{label}</Label>
		<div className="relative">
			<Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
			<Input
				id={label.toLowerCase().replace(/\s/g, '-')}
				type={type}
				placeholder={placeholder}
				className="pl-10"
			/>
		</div>
	</div>
);

const SubmitButton = ({
	label,
	icon: Icon,
}: {
	label: string;
	icon?: React.ElementType;
}) => (
	<Button type="submit" size="lg" className="w-full gap-2 group">
		{label}
		{Icon && (
			<Icon className="size-4 transition-transform group-hover:translate-x-0.5" />
		)}
	</Button>
);

const GuestButton = ({ label, href }: { label: string; href: string }) => (
	<Button type="button" variant="outline" size="lg" className="w-full" asChild>
		<Link href={href}>{label}</Link>
	</Button>
);

const CloseButton = ({ onClick }: { onClick?: () => void }) => (
	<Button
		type="button"
		variant="ghost"
		size="icon"
		className="absolute top-4 right-4"
		onClick={onClick}
	>
		<X className="size-4" />
		<span className="sr-only">Close</span>
	</Button>
);

export default function Main() {
	const cartItems = [
		{ name: 'Wireless Headphones', price: '$129.99', quantity: 1 },
		{ name: 'Phone Case', price: '$29.99', quantity: 2 },
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<div className="min-h-screen flex items-center justify-center p-4 @sm:p-6 @lg:p-8 bg-muted/30">
				<Card className="w-full max-w-md relative">
					<CloseButton />
					<CardHeader className="text-center pt-10">
						<div className="flex justify-center mb-4">
							<Logo name="QuickBuy" icon={ShoppingCart} />
						</div>
						<CardTitle className="text-2xl">Sign in to checkout</CardTitle>
						<CardDescription>Or continue as guest</CardDescription>
					</CardHeader>
					<CardContent>
						<CartSummary items={cartItems} total="$189.97" />
						<form className="space-y-4">
							<FormField
								label="Email"
								type="email"
								placeholder="you@example.com"
								icon={Mail}
							/>
							<FormField
								label="Password"
								type="password"
								placeholder="••••••••"
								icon={Lock}
							/>
							<SubmitButton label="Sign in & Checkout" icon={ArrowRight} />
						</form>
						<div className="mt-4">
							<GuestButton label="Continue as Guest" href="/checkout/guest" />
						</div>
						<p className="text-sm text-muted-foreground text-center mt-6">
							New customer?{' '}
							<Link
								href="/signup"
								className="text-primary font-medium hover:underline"
							>
								Create account
							</Link>
						</p>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
