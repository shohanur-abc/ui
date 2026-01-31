import Link from 'next/link';
import Image from 'next/image';
import { Mail, Lock, User, ArrowRight, Users, MessageSquare, Heart, Share2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const CommunityPanel = ({
	members,
	stats,
}: {
	members: Array<{ name: string; avatar: string }>;
	stats: Array<{ icon: React.ElementType; value: string; label: string }>;
}) => (
	<div className="relative hidden @lg:flex flex-col justify-center items-center p-8 @xl:p-12 bg-gradient-to-br from-primary/10 to-accent/10">
		<div className="text-center max-w-md">
			<h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
			<p className="text-muted-foreground mb-8">
				Connect with fellow shoppers, share reviews, and get exclusive access.
			</p>
			<div className="flex justify-center -space-x-3 mb-8">
				{members.map((member, i) => (
					<Avatar key={i} className="size-12 border-2 border-background">
						<AvatarImage src={member.avatar} alt={member.name} />
						<AvatarFallback>{member.name[0]}</AvatarFallback>
					</Avatar>
				))}
				<div className="size-12 rounded-full bg-primary flex items-center justify-center border-2 border-background">
					<span className="text-sm font-medium text-primary-foreground">+2K</span>
				</div>
			</div>
			<div className="grid grid-cols-3 gap-4">
				{stats.map((stat, i) => (
					<div key={i} className="p-4 rounded-xl bg-card/80 border border-border/50">
						<stat.icon className="size-5 text-primary mx-auto mb-2" />
						<div className="text-2xl font-bold">{stat.value}</div>
						<div className="text-xs text-muted-foreground">{stat.label}</div>
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

const SocialButton = ({
	icon: Icon,
	label,
}: {
	icon: React.ElementType;
	label: string;
}) => (
	<Button type="button" variant="outline" className="w-full gap-2">
		<Icon className="size-4" />
		{label}
	</Button>
);

const DividerText = ({ text }: { text: string }) => (
	<div className="relative my-6">
		<Separator />
		<span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-3 text-xs text-muted-foreground uppercase">
			{text}
		</span>
	</div>
);

const FormRow = ({ children }: { children: React.ReactNode }) => (
	<div className="grid gap-4 @sm:grid-cols-2">{children}</div>
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

const CommunityCheckbox = ({ label }: { label: string }) => (
	<div className="flex items-center gap-2">
		<Checkbox id="community" defaultChecked />
		<Label htmlFor="community" className="text-sm font-normal cursor-pointer">
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

const GoogleIcon = ({ className }: { className?: string }) => (
	<svg className={className} viewBox="0 0 24 24">
		<path
			fill="currentColor"
			d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
		/>
		<path
			fill="currentColor"
			d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
		/>
		<path
			fill="currentColor"
			d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
		/>
		<path
			fill="currentColor"
			d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
		/>
	</svg>
);

export default function Main() {
	const members = [
		{ name: 'Alice', avatar: '' },
		{ name: 'Bob', avatar: '' },
		{ name: 'Carol', avatar: '' },
		{ name: 'David', avatar: '' },
		{ name: 'Eva', avatar: '' },
	];
	const stats = [
		{ icon: Users, value: '50K+', label: 'Members' },
		{ icon: MessageSquare, value: '12K', label: 'Reviews' },
		{ icon: Heart, value: '98%', label: 'Happy' },
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<div className="min-h-screen grid @lg:grid-cols-2">
				<div className="flex flex-col justify-center px-6 @sm:px-8 @xl:px-16 py-12">
					<div className="w-full max-w-md mx-auto @lg:mx-0 @lg:ml-auto">
						<Logo name="ShopTogether" icon={Users} />
						<Title text="Create your account" subtitle="Join our shopping community" />

						<SocialButton icon={GoogleIcon} label="Sign up with Google" />
						<DividerText text="or" />

						<form className="space-y-5">
							<FormRow>
								<FormField label="First Name" type="text" placeholder="John" icon={User} />
								<FormField label="Last Name" type="text" placeholder="Doe" icon={User} />
							</FormRow>
							<FormField label="Email" type="email" placeholder="you@example.com" icon={Mail} />
							<FormField label="Password" type="password" placeholder="••••••••" icon={Lock} />
							<CommunityCheckbox label="Join our community forums" />
							<SubmitButton label="Create Account" icon={ArrowRight} />
						</form>

						<div className="mt-8">
							<FooterLink text="Already a member?" linkText="Sign in" href="/login" />
						</div>
					</div>
				</div>
				<CommunityPanel members={members} stats={stats} />
			</div>
		</section>
	);
}
