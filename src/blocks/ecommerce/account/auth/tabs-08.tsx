import Link from 'next/link';
import { Mail, Lock, ArrowRight, Headphones, MessageCircle, Phone, HelpCircle, User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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

const TextareaField = ({
	label,
	placeholder,
	id,
}: {
	label: string;
	placeholder: string;
	id: string;
}) => (
	<div className="space-y-2">
		<Label htmlFor={id}>{label}</Label>
		<Textarea id={id} placeholder={placeholder} rows={3} />
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

const SignInSupport = () => (
	<form className="space-y-4">
		<FormField id="support-email" label="Email" type="email" placeholder="you@example.com" icon={Mail} />
		<FormField id="support-password" label="Password" type="password" placeholder="••••••••" icon={Lock} />
		<SubmitButton label="Sign in" icon={ArrowRight} />
		<p className="text-sm text-muted-foreground text-center">
			Sign in to view your support tickets
		</p>
	</form>
);

const GuestSupport = () => {
	const issueTypes = [
		'Order Issue',
		'Shipping',
		'Returns & Refunds',
		'Product Question',
		'Account Help',
		'Other',
	];

	return (
		<form className="space-y-4">
			<FormField id="guest-email" label="Email" type="email" placeholder="you@example.com" icon={Mail} />
			<SelectField label="Issue Type" placeholder="Select issue type" options={issueTypes} />
			<TextareaField id="guest-message" label="Message" placeholder="Describe your issue..." />
			<SubmitButton label="Submit Request" icon={MessageCircle} />
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
							<Logo name="HelpDesk" icon={Headphones} />
						</div>
						<CardTitle className="text-2xl">Customer Support</CardTitle>
						<CardDescription>Sign in or submit a support request</CardDescription>
					</CardHeader>
					<CardContent>
						<Tabs defaultValue="signin" className="w-full">
							<TabsList className="grid w-full grid-cols-2 mb-6">
								<TabsTrigger value="signin" className="gap-2">
									<User className="size-4" />
									Sign In
								</TabsTrigger>
								<TabsTrigger value="guest" className="gap-2">
									<MessageCircle className="size-4" />
									Guest
								</TabsTrigger>
							</TabsList>
							<TabsContent value="signin">
								<SignInSupport />
							</TabsContent>
							<TabsContent value="guest">
								<GuestSupport />
							</TabsContent>
						</Tabs>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
