import Link from 'next/link';
import { Mail, Lock, ArrowRight, Package, MapPin, Clock, Search, User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

const Logo = ({ name, icon: Icon }: { name: string; icon: React.ElementType }) => (
	<div className="flex items-center gap-2">
		<div className="flex size-10 items-center justify-center rounded-xl bg-primary">
			<Icon className="size-5 text-primary-foreground" />
		</div>
		<span className="text-xl font-bold tracking-tight">{name}</span>
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

const OrderTracking = () => (
	<form className="space-y-4">
		<FormField id="order-number" label="Order Number" type="text" placeholder="ORD-123456789" icon={Package} />
		<FormField id="order-email" label="Email used for order" type="email" placeholder="you@example.com" icon={Mail} />
		<SubmitButton label="Track Order" icon={Search} />
	</form>
);

const AccountSignIn = () => (
	<form className="space-y-4">
		<FormField id="account-email" label="Email" type="email" placeholder="you@example.com" icon={Mail} />
		<FormField id="account-password" label="Password" type="password" placeholder="••••••••" icon={Lock} />
		<SubmitButton label="Sign in" icon={ArrowRight} />
		<p className="text-sm text-muted-foreground text-center">
			<Link href="/forgot-password" className="text-primary hover:underline">
				Forgot password?
			</Link>
		</p>
	</form>
);

const RecentOrder = ({
	orderNumber,
	status,
	date,
}: {
	orderNumber: string;
	status: string;
	date: string;
}) => (
	<div className="p-3 rounded-lg bg-muted/50 border border-border/50">
		<div className="flex items-center justify-between mb-1">
			<span className="font-medium text-sm">{orderNumber}</span>
			<span className="text-xs text-primary">{status}</span>
		</div>
		<div className="flex items-center gap-2 text-xs text-muted-foreground">
			<Clock className="size-3" />
			{date}
		</div>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<div className="min-h-screen flex items-center justify-center p-4 @sm:p-6 @lg:p-8 bg-muted/30">
				<Card className="w-full max-w-md">
					<CardHeader className="text-center">
						<div className="flex justify-center mb-4">
							<Logo name="TrackShip" icon={Package} />
						</div>
						<CardTitle className="text-2xl">Order Status</CardTitle>
						<CardDescription>Track your order or sign in to your account</CardDescription>
					</CardHeader>
					<CardContent>
						<Tabs defaultValue="track" className="w-full">
							<TabsList className="grid w-full grid-cols-2 mb-6">
								<TabsTrigger value="track" className="gap-2">
									<MapPin className="size-4" />
									Track Order
								</TabsTrigger>
								<TabsTrigger value="account" className="gap-2">
									<User className="size-4" />
									My Account
								</TabsTrigger>
							</TabsList>
							<TabsContent value="track">
								<OrderTracking />
								<Separator className="my-6" />
								<div>
									<h4 className="text-sm font-medium mb-3">Recently tracked</h4>
									<div className="space-y-2">
										<RecentOrder orderNumber="ORD-987654321" status="In Transit" date="2 hours ago" />
										<RecentOrder orderNumber="ORD-123456789" status="Delivered" date="1 day ago" />
									</div>
								</div>
							</TabsContent>
							<TabsContent value="account">
								<AccountSignIn />
							</TabsContent>
						</Tabs>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
