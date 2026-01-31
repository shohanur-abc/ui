import Link from 'next/link';
import { Mail, Lock, ArrowRight, Store, Globe, User, Building2, MapPin, Phone, Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

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

const SelectField = ({
	label,
	placeholder,
	options,
	icon: Icon,
}: {
	label: string;
	placeholder: string;
	options: string[];
	icon?: React.ElementType;
}) => (
	<div className="space-y-2">
		<Label>{label}</Label>
		<Select>
			<SelectTrigger>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				{options.map((option) => (
					<SelectItem key={option} value={option.toLowerCase().replace(/\s/g, '-')}>
						{option}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
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

const SellerBenefit = ({
	label,
}: {
	label: string;
}) => (
	<div className="flex items-center gap-2 text-sm">
		<Check className="size-4 text-primary flex-shrink-0" />
		<span>{label}</span>
	</div>
);

const BuyerLogin = () => (
	<form className="space-y-4">
		<FormField id="buyer-email" label="Email" type="email" placeholder="you@example.com" icon={Mail} />
		<FormField id="buyer-password" label="Password" type="password" placeholder="••••••••" icon={Lock} />
		<SubmitButton label="Sign in as Buyer" icon={ArrowRight} />
		<p className="text-sm text-muted-foreground text-center">
			<Link href="/forgot-password" className="text-primary hover:underline">
				Forgot password?
			</Link>
		</p>
	</form>
);

const SellerLogin = () => {
	const benefits = [
		'List unlimited products',
		'Low commission rates',
		'Seller analytics dashboard',
		'Priority seller support',
	];

	return (
		<div className="space-y-4">
			<div className="p-4 rounded-xl bg-muted/50 border border-border/50">
				<p className="font-medium mb-3 flex items-center gap-2">
					<Store className="size-4 text-primary" />
					Seller Benefits
				</p>
				<div className="space-y-2">
					{benefits.map((benefit) => (
						<SellerBenefit key={benefit} label={benefit} />
					))}
				</div>
			</div>
			<form className="space-y-4">
				<FormField id="seller-email" label="Business Email" type="email" placeholder="you@company.com" icon={Mail} />
				<FormField id="seller-password" label="Password" type="password" placeholder="••••••••" icon={Lock} />
				<SubmitButton label="Sign in as Seller" icon={ArrowRight} />
			</form>
		</div>
	);
};

const AffiliateLogin = () => (
	<form className="space-y-4">
		<div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 text-center">
			<Globe className="size-10 text-primary mx-auto mb-2" />
			<p className="font-medium mb-1">Affiliate Program</p>
			<p className="text-sm text-muted-foreground">
				Earn up to 15% commission on referrals
			</p>
		</div>
		<FormField id="affiliate-email" label="Email" type="email" placeholder="you@example.com" icon={Mail} />
		<FormField id="affiliate-password" label="Password" type="password" placeholder="••••••••" icon={Lock} />
		<SubmitButton label="Access Affiliate Dashboard" icon={ArrowRight} />
	</form>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<div className="min-h-screen flex items-center justify-center p-4 @sm:p-6 @lg:p-8 bg-muted/30">
				<Card className="w-full max-w-md">
					<CardHeader className="text-center">
						<div className="flex justify-center mb-4">
							<Logo name="MarketHub" icon={Store} />
						</div>
						<CardTitle className="text-2xl">Welcome to MarketHub</CardTitle>
						<CardDescription>Sign in to your account</CardDescription>
					</CardHeader>
					<CardContent>
						<Tabs defaultValue="buyer" className="w-full">
							<TabsList className="grid w-full grid-cols-3 mb-6">
								<TabsTrigger value="buyer" className="text-xs @sm:text-sm">
									Buyer
								</TabsTrigger>
								<TabsTrigger value="seller" className="text-xs @sm:text-sm">
									Seller
								</TabsTrigger>
								<TabsTrigger value="affiliate" className="text-xs @sm:text-sm">
									Affiliate
								</TabsTrigger>
							</TabsList>
							<TabsContent value="buyer">
								<BuyerLogin />
							</TabsContent>
							<TabsContent value="seller">
								<SellerLogin />
							</TabsContent>
							<TabsContent value="affiliate">
								<AffiliateLogin />
							</TabsContent>
						</Tabs>
					</CardContent>
					<CardFooter className="justify-center">
						<p className="text-sm text-muted-foreground">
							Don&apos;t have an account?{' '}
							<Link href="/register" className="text-primary font-medium hover:underline">
								Register now
							</Link>
						</p>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
