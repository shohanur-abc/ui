import Link from 'next/link';
import { Mail, Lock, User, ArrowRight, Leaf, Recycle, Trees, Droplets } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Logo = ({ name, icon: Icon }: { name: string; icon: React.ElementType }) => (
	<div className="flex items-center gap-2">
		<div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600">
			<Icon className="size-5 text-white" />
		</div>
		<span className="text-xl font-bold tracking-tight">{name}</span>
	</div>
);

const EcoStats = ({
	stats,
}: {
	stats: Array<{ icon: React.ElementType; value: string; label: string }>;
}) => (
	<div className="grid grid-cols-3 gap-2 p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 mb-6">
		{stats.map((stat, i) => (
			<div key={i} className="text-center">
				<stat.icon className="size-4 text-green-600 mx-auto mb-1" />
				<p className="text-lg font-bold text-green-600">{stat.value}</p>
				<p className="text-xs text-muted-foreground">{stat.label}</p>
			</div>
		))}
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

const EcoCheckbox = ({ label }: { label: string }) => (
	<div className="flex items-center gap-2">
		<Checkbox id="eco" defaultChecked />
		<Label htmlFor="eco" className="text-sm font-normal cursor-pointer">
			{label}
		</Label>
	</div>
);

const SubmitButton = ({
	label,
	icon: Icon,
}: {
	label: string;
	icon?: React.ElementType;
}) => (
	<Button type="submit" size="lg" className="w-full gap-2 group bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
		{label}
		{Icon && (
			<Icon className="size-4 transition-transform group-hover:translate-x-0.5" />
		)}
	</Button>
);

const FooterLink = ({
	text,
	linkText,
	href,
}: {
	text: string;
	linkText: string;
	href: string;
}) => (
	<p className="text-sm text-muted-foreground text-center">
		{text}{' '}
		<Link href={href} className="text-green-600 font-medium hover:underline">
			{linkText}
		</Link>
	</p>
);

export default function Main() {
	const ecoStats = [
		{ icon: Trees, value: '1M+', label: 'Trees' },
		{ icon: Recycle, value: '500T', label: 'Recycled' },
		{ icon: Droplets, value: '2B', label: 'Gal Saved' },
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<div className="min-h-screen flex items-center justify-center p-4 @sm:p-6 @lg:p-8 bg-gradient-to-br from-green-500/5 to-emerald-500/5">
				<Card className="w-full max-w-md border-green-500/20">
					<CardHeader className="text-center">
						<div className="flex justify-center mb-4">
							<Logo name="EcoShop" icon={Leaf} />
						</div>
						<CardTitle className="text-2xl">Join the movement</CardTitle>
						<CardDescription>Shop sustainably, live consciously</CardDescription>
					</CardHeader>
					<CardContent>
						<EcoStats stats={ecoStats} />
						<form className="space-y-4">
							<FormField label="Full Name" type="text" placeholder="John Doe" icon={User} />
							<FormField label="Email" type="email" placeholder="you@example.com" icon={Mail} />
							<FormField label="Password" type="password" placeholder="••••••••" icon={Lock} />
							<EcoCheckbox label="I want to receive eco-tips and sustainable deals" />
							<SubmitButton label="Join EcoShop" icon={ArrowRight} />
						</form>
					</CardContent>
					<CardFooter>
						<FooterLink text="Already a member?" linkText="Sign in" href="/login" />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
