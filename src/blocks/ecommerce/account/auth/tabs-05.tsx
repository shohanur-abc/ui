import Link from 'next/link';
import {
	Mail,
	Lock,
	ArrowRight,
	ShoppingBag,
	CreditCard,
	Truck,
	User,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

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
	subtotal,
	shipping,
	total,
}: {
	items: number;
	subtotal: string;
	shipping: string;
	total: string;
}) => (
	<div className="p-4 rounded-xl bg-muted/50 border border-border/50 mb-6">
		<div className="flex items-center justify-between mb-3">
			<span className="font-medium">Your Cart</span>
			<Badge variant="secondary">{items} items</Badge>
		</div>
		<div className="space-y-1 text-sm">
			<div className="flex justify-between text-muted-foreground">
				<span>Subtotal</span>
				<span>{subtotal}</span>
			</div>
			<div className="flex justify-between text-muted-foreground">
				<span>Shipping</span>
				<span>{shipping}</span>
			</div>
		</div>
		<Separator className="my-2" />
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
	id,
}: {
	label: string;
	type: string;
	placeholder: string;
	icon: React.ElementType;
	id: string;
}) => (
	<div className="space-y-2">
		<Label htmlFor={id}>{label}</Label>
		<div className="relative">
			<Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
			<Input id={id} type={type} placeholder={placeholder} className="pl-10" />
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

const SignInCheckout = () => (
	<form className="space-y-4">
		<FormField
			id="checkout-email"
			label="Email"
			type="email"
			placeholder="you@example.com"
			icon={Mail}
		/>
		<FormField
			id="checkout-password"
			label="Password"
			type="password"
			placeholder="••••••••"
			icon={Lock}
		/>
		<SubmitButton label="Sign in & Checkout" icon={ArrowRight} />
		<p className="text-sm text-muted-foreground text-center">
			<Link href="/forgot-password" className="text-primary hover:underline">
				Forgot password?
			</Link>
		</p>
	</form>
);

const GuestCheckout = () => (
	<form className="space-y-4">
		<FormField
			id="guest-email"
			label="Email for order updates"
			type="email"
			placeholder="you@example.com"
			icon={Mail}
		/>
		<p className="text-sm text-muted-foreground">
			You can create an account after checkout
		</p>
		<SubmitButton label="Continue as Guest" icon={ArrowRight} />
	</form>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<div className="min-h-screen flex items-center justify-center p-4 @sm:p-6 @lg:p-8 bg-muted/30">
				<Card className="w-full max-w-md">
					<CardHeader className="text-center">
						<div className="flex justify-center mb-4">
							<Logo name="QuickBuy" icon={ShoppingBag} />
						</div>
						<CardTitle className="text-2xl">Checkout</CardTitle>
						<CardDescription>Sign in or continue as guest</CardDescription>
					</CardHeader>
					<CardContent>
						<CartSummary
							items={3}
							subtotal="$149.97"
							shipping="Free"
							total="$149.97"
						/>
						<Tabs defaultValue="signin" className="w-full">
							<TabsList className="grid w-full grid-cols-2 mb-6">
								<TabsTrigger value="signin" className="gap-2">
									<User className="size-4" />
									Sign In
								</TabsTrigger>
								<TabsTrigger value="guest" className="gap-2">
									<ShoppingBag className="size-4" />
									Guest
								</TabsTrigger>
							</TabsList>
							<TabsContent value="signin">
								<SignInCheckout />
							</TabsContent>
							<TabsContent value="guest">
								<GuestCheckout />
							</TabsContent>
						</Tabs>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
