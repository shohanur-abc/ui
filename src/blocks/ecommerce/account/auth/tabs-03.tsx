import Link from 'next/link';
import { Mail, Lock, User, ArrowRight, ShoppingCart, Building2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
}: {
	label: string;
	placeholder: string;
	options: string[];
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

const TermsCheckbox = ({
	label,
	termsHref,
	id,
}: {
	label: string;
	termsHref: string;
	id: string;
}) => (
	<div className="flex items-start gap-2">
		<Checkbox id={id} className="mt-0.5" />
		<Label htmlFor={id} className="text-sm font-normal cursor-pointer leading-relaxed">
			{label}{' '}
			<Link href={termsHref} className="text-primary hover:underline">
				Terms & Conditions
			</Link>
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
	<Button type="submit" size="lg" className="w-full gap-2 group">
		{label}
		{Icon && (
			<Icon className="size-4 transition-transform group-hover:translate-x-0.5" />
		)}
	</Button>
);

const PersonalSignUp = () => (
	<form className="space-y-4">
		<FormField id="personal-name" label="Full Name" type="text" placeholder="John Doe" icon={User} />
		<FormField id="personal-email" label="Email" type="email" placeholder="you@example.com" icon={Mail} />
		<FormField id="personal-password" label="Password" type="password" placeholder="••••••••" icon={Lock} />
		<TermsCheckbox id="personal-terms" label="I agree to the" termsHref="/terms" />
		<SubmitButton label="Create Personal Account" icon={ArrowRight} />
	</form>
);

const BusinessSignUp = () => {
	const companySizes = ['1-10 employees', '11-50 employees', '51-200 employees', '201+ employees'];

	return (
		<form className="space-y-4">
			<FormField id="business-company" label="Company Name" type="text" placeholder="Acme Inc." icon={Building2} />
			<FormField id="business-email" label="Work Email" type="email" placeholder="you@company.com" icon={Mail} />
			<SelectField label="Company Size" placeholder="Select size" options={companySizes} />
			<FormField id="business-password" label="Password" type="password" placeholder="••••••••" icon={Lock} />
			<TermsCheckbox id="business-terms" label="I agree to the" termsHref="/terms" />
			<SubmitButton label="Create Business Account" icon={ArrowRight} />
		</form>
	);
};

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<div className="min-h-screen flex items-center justify-center p-4 @sm:p-6 @lg:p-8 bg-muted/30">
				<Card className="w-full max-w-md">
					<CardHeader className="text-center">
						<div className="flex justify-center mb-4">
							<Logo name="ShopPro" icon={ShoppingCart} />
						</div>
						<CardTitle className="text-2xl">Create an account</CardTitle>
						<CardDescription>Choose your account type</CardDescription>
					</CardHeader>
					<CardContent>
						<Tabs defaultValue="personal" className="w-full">
							<TabsList className="grid w-full grid-cols-2 mb-6">
								<TabsTrigger value="personal" className="gap-2">
									<User className="size-4" />
									Personal
								</TabsTrigger>
								<TabsTrigger value="business" className="gap-2">
									<Building2 className="size-4" />
									Business
								</TabsTrigger>
							</TabsList>
							<TabsContent value="personal">
								<PersonalSignUp />
							</TabsContent>
							<TabsContent value="business">
								<BusinessSignUp />
							</TabsContent>
						</Tabs>
					</CardContent>
					<CardFooter className="justify-center">
						<p className="text-sm text-muted-foreground">
							Already have an account?{' '}
							<Link href="/login" className="text-primary font-medium hover:underline">
								Sign in
							</Link>
						</p>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
