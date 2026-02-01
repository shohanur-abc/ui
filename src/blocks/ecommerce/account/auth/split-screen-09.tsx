import Link from 'next/link';
import Image from 'next/image';
import {
	Mail,
	Lock,
	User,
	ArrowRight,
	Crown,
	Star,
	Award,
	Diamond,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const TierPanel = ({
	tiers,
}: {
	tiers: Array<{
		name: string;
		icon: React.ElementType;
		benefits: string[];
		color: string;
	}>;
}) => (
	<div className="relative hidden @lg:flex flex-col justify-center p-8 @xl:p-12 bg-gradient-to-br from-muted/50 to-muted/30">
		<h2 className="text-2xl font-bold mb-6">Member Tiers</h2>
		<div className="space-y-4">
			{tiers.map((tier, i) => (
				<div
					key={i}
					className="p-4 rounded-xl bg-card/80 backdrop-blur-sm border border-border/50"
				>
					<div className="flex items-center gap-3 mb-3">
						<div
							className="flex size-10 items-center justify-center rounded-full"
							style={{ backgroundColor: `${tier.color}20` }}
						>
							<tier.icon className="size-5" style={{ color: tier.color }} />
						</div>
						<span className="font-semibold">{tier.name}</span>
					</div>
					<ul className="space-y-1.5">
						{tier.benefits.map((benefit, j) => (
							<li
								key={j}
								className="text-sm text-muted-foreground flex items-center gap-2"
							>
								<Star className="size-3 text-primary" />
								{benefit}
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	</div>
);

const Logo = ({
	name,
	icon: Icon,
}: {
	name: string;
	icon: React.ElementType;
}) => (
	<div className="flex items-center gap-2 mb-8">
		<div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
			<Icon className="size-5 text-primary-foreground" />
		</div>
		<span className="text-xl font-bold tracking-tight">{name}</span>
	</div>
);

const Title = ({ text, subtitle }: { text: string; subtitle?: string }) => (
	<div className="mb-8">
		<h1 className="text-2xl @sm:text-3xl font-bold tracking-tight mb-2">
			{text}
		</h1>
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
	const tiers = [
		{
			name: 'Silver',
			icon: Award,
			color: '#94a3b8',
			benefits: ['Free shipping over $50', '5% cashback', 'Birthday reward'],
		},
		{
			name: 'Gold',
			icon: Crown,
			color: '#f59e0b',
			benefits: [
				'Free shipping always',
				'10% cashback',
				'Early access to sales',
			],
		},
		{
			name: 'Diamond',
			icon: Diamond,
			color: '#8b5cf6',
			benefits: ['Priority shipping', '15% cashback', 'Exclusive events'],
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<div className="min-h-screen grid @lg:grid-cols-2">
				<div className="flex flex-col justify-center px-6 @sm:px-8 @xl:px-16 py-12">
					<div className="w-full max-w-md mx-auto @lg:mx-0 @lg:ml-auto">
						<Logo name="RewardsClub" icon={Crown} />
						<Title
							text="Join our rewards program"
							subtitle="Start earning points with every purchase"
						/>

						<form className="space-y-5">
							<FormField
								label="Full Name"
								type="text"
								placeholder="John Doe"
								icon={User}
							/>
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
							<SubmitButton label="Start Earning Rewards" icon={ArrowRight} />
						</form>

						<div className="mt-8">
							<FooterLink
								text="Already a member?"
								linkText="Sign in"
								href="/login"
							/>
						</div>
					</div>
				</div>
				<TierPanel tiers={tiers} />
			</div>
		</section>
	);
}
