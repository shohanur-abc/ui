import Link from 'next/link';
import { Mail, Lock, ArrowRight, Gift, Crown, Sparkles, Star, Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const Logo = ({ name, icon: Icon }: { name: string; icon: React.ElementType }) => (
	<div className="flex items-center gap-2">
		<div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600">
			<Icon className="size-5 text-white" />
		</div>
		<span className="text-xl font-bold tracking-tight">{name}</span>
	</div>
);

const MembershipBenefit = ({
	icon: Icon,
	label,
}: {
	icon: React.ElementType;
	label: string;
}) => (
	<div className="flex items-center gap-2 text-sm">
		<Check className="size-4 text-primary flex-shrink-0" />
		<span>{label}</span>
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
	variant = 'default',
}: {
	label: string;
	icon?: React.ElementType;
	variant?: 'default' | 'secondary';
}) => (
	<Button type="submit" size="lg" variant={variant} className="w-full gap-2 group">
		{label}
		{Icon && (
			<Icon className="size-4 transition-transform group-hover:translate-x-0.5" />
		)}
	</Button>
);

const StandardSignUp = () => {
	const benefits = [
		'Earn points on purchases',
		'Birthday discounts',
		'Early access to sales',
	];

	return (
		<div className="space-y-4">
			<div className="p-4 rounded-xl bg-muted/50 border border-border/50">
				<div className="flex items-center gap-2 mb-3">
					<Gift className="size-5 text-primary" />
					<span className="font-medium">Standard Member</span>
					<Badge variant="outline">Free</Badge>
				</div>
				<div className="space-y-2">
					{benefits.map((benefit) => (
						<MembershipBenefit key={benefit} icon={Check} label={benefit} />
					))}
				</div>
			</div>
			<form className="space-y-4">
				<FormField id="standard-email" label="Email" type="email" placeholder="you@example.com" icon={Mail} />
				<FormField id="standard-password" label="Password" type="password" placeholder="••••••••" icon={Lock} />
				<SubmitButton label="Join Free" icon={ArrowRight} />
			</form>
		</div>
	);
};

const PremiumSignUp = () => {
	const benefits = [
		'2x points on all purchases',
		'Free express shipping',
		'Exclusive VIP sales access',
		'Priority customer support',
		'Free returns',
	];

	return (
		<div className="space-y-4">
			<div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-yellow-500/10 border border-amber-500/20">
				<div className="flex items-center gap-2 mb-3">
					<Crown className="size-5 text-amber-500" />
					<span className="font-medium">Premium Member</span>
					<Badge className="bg-amber-500 hover:bg-amber-600">$9.99/mo</Badge>
				</div>
				<div className="space-y-2">
					{benefits.map((benefit) => (
						<MembershipBenefit key={benefit} icon={Check} label={benefit} />
					))}
				</div>
			</div>
			<form className="space-y-4">
				<FormField id="premium-email" label="Email" type="email" placeholder="you@example.com" icon={Mail} />
				<FormField id="premium-password" label="Password" type="password" placeholder="••••••••" icon={Lock} />
				<SubmitButton label="Start Premium Trial" icon={Sparkles} />
			</form>
		</div>
	);
};

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<div className="min-h-screen flex items-center justify-center p-4 @sm:p-6 @lg:p-8 bg-gradient-to-br from-amber-500/5 to-yellow-500/5">
				<Card className="w-full max-w-md">
					<CardHeader className="text-center">
						<div className="flex justify-center mb-4">
							<Logo name="LuxeRewards" icon={Star} />
						</div>
						<CardTitle className="text-2xl">Join Our Rewards Program</CardTitle>
						<CardDescription>Choose your membership tier</CardDescription>
					</CardHeader>
					<CardContent>
						<Tabs defaultValue="standard" className="w-full">
							<TabsList className="grid w-full grid-cols-2 mb-6">
								<TabsTrigger value="standard" className="gap-2">
									<Gift className="size-4" />
									Standard
								</TabsTrigger>
								<TabsTrigger value="premium" className="gap-2">
									<Crown className="size-4" />
									Premium
								</TabsTrigger>
							</TabsList>
							<TabsContent value="standard">
								<StandardSignUp />
							</TabsContent>
							<TabsContent value="premium">
								<PremiumSignUp />
							</TabsContent>
						</Tabs>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
