import Link from 'next/link';
import Image from 'next/image';
import { Mail, Lock, User, ArrowRight, Gift, Calendar, Cake, Bell } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

const BirthdayPanel = ({
	perks,
}: {
	perks: Array<{ icon: React.ElementType; text: string }>;
}) => (
	<div className="relative hidden @lg:flex flex-col justify-center items-center p-8 @xl:p-12 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10">
		<div className="text-center max-w-md">
			<div className="flex justify-center mb-6">
				<div className="size-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
					<Gift className="size-12 text-primary-foreground" />
				</div>
			</div>
			<h2 className="text-3xl font-bold mb-4">Birthday Rewards</h2>
			<p className="text-muted-foreground mb-8">
				Sign up and tell us your birthday to receive special surprises!
			</p>
			<div className="space-y-3 text-left">
				{perks.map((perk, i) => (
					<div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-card/80 border border-border/50">
						<div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
							<perk.icon className="size-4 text-primary" />
						</div>
						<span className="font-medium">{perk.text}</span>
					</div>
				))}
			</div>
		</div>
	</div>
);

const Logo = ({ name, icon: Icon }: { name: string; icon: React.ElementType }) => (
	<div className="flex items-center gap-2 mb-8">
		<div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
			<Icon className="size-5 text-primary-foreground" />
		</div>
		<span className="text-xl font-bold tracking-tight">{name}</span>
	</div>
);

const Title = ({ text, subtitle }: { text: string; subtitle?: string }) => (
	<div className="mb-8">
		<h1 className="text-2xl @sm:text-3xl font-bold tracking-tight mb-2">{text}</h1>
		{subtitle && <p className="text-muted-foreground">{subtitle}</p>}
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

const BirthdaySelect = () => {
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	const days = Array.from({ length: 31 }, (_, i) => i + 1);

	return (
		<div className="space-y-2">
			<Label>Birthday (optional)</Label>
			<div className="grid grid-cols-2 gap-3">
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Month" />
					</SelectTrigger>
					<SelectContent>
						{months.map((month) => (
							<SelectItem key={month} value={month.toLowerCase()}>
								{month}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Day" />
					</SelectTrigger>
					<SelectContent>
						{days.map((day) => (
							<SelectItem key={day} value={day.toString()}>
								{day}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		</div>
	);
};

const NotificationCheckbox = ({ label }: { label: string }) => (
	<div className="flex items-center gap-2">
		<Checkbox id="notifications" defaultChecked />
		<Label htmlFor="notifications" className="text-sm font-normal cursor-pointer">
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
	<Button type="submit" size="lg" className="w-full gap-2 group">
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
	<p className="text-sm text-muted-foreground">
		{text}{' '}
		<Link href={href} className="text-primary font-medium hover:underline">
			{linkText}
		</Link>
	</p>
);

export default function Main() {
	const perks = [
		{ icon: Gift, text: 'Free gift on your birthday' },
		{ icon: Cake, text: 'Double points in birthday month' },
		{ icon: Bell, text: 'Exclusive birthday-only deals' },
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<div className="min-h-screen grid @lg:grid-cols-2">
				<div className="flex flex-col justify-center px-6 @sm:px-8 @xl:px-16 py-12">
					<div className="w-full max-w-md mx-auto @lg:mx-0 @lg:ml-auto">
						<Logo name="GiftBox" icon={Gift} />
						<Title text="Join GiftBox" subtitle="Create an account to unlock birthday rewards" />

						<form className="space-y-5">
							<FormField label="Full Name" type="text" placeholder="John Doe" icon={User} />
							<FormField label="Email" type="email" placeholder="you@example.com" icon={Mail} />
							<FormField label="Password" type="password" placeholder="••••••••" icon={Lock} />
							<BirthdaySelect />
							<NotificationCheckbox label="Send me birthday surprises and offers" />
							<SubmitButton label="Create Account" icon={ArrowRight} />
						</form>

						<div className="mt-8">
							<FooterLink text="Already a member?" linkText="Sign in" href="/login" />
						</div>
					</div>
				</div>
				<BirthdayPanel perks={perks} />
			</div>
		</section>
	);
}
