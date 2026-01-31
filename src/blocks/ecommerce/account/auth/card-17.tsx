import Link from 'next/link';
import { ArrowRight, Link2, Unlink, ShoppingBag, Check, AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Logo = ({ name, icon: Icon }: { name: string; icon: React.ElementType }) => (
	<div className="flex items-center gap-2">
		<div className="flex size-10 items-center justify-center rounded-xl bg-primary">
			<Icon className="size-5 text-primary-foreground" />
		</div>
		<span className="text-xl font-bold tracking-tight">{name}</span>
	</div>
);

const LinkedAccount = ({
	provider,
	email,
	connected,
	icon: Icon,
}: {
	provider: string;
	email?: string;
	connected: boolean;
	icon: React.ElementType;
}) => (
	<div className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-card">
		<div className="flex items-center gap-3">
			<div className="flex size-10 items-center justify-center rounded-lg bg-muted">
				<Icon className="size-5" />
			</div>
			<div>
				<p className="font-medium">{provider}</p>
				{email && <p className="text-sm text-muted-foreground">{email}</p>}
			</div>
		</div>
		{connected ? (
			<Button variant="ghost" size="sm" className="gap-2 text-destructive hover:text-destructive">
				<Unlink className="size-4" />
				Unlink
			</Button>
		) : (
			<Button variant="outline" size="sm" className="gap-2">
				<Link2 className="size-4" />
				Link
			</Button>
		)}
	</div>
);

const StatusBadge = ({ connected }: { connected: boolean }) => (
	<div className={`flex items-center gap-1.5 text-sm ${connected ? 'text-green-600' : 'text-muted-foreground'}`}>
		{connected ? <Check className="size-4" /> : <AlertCircle className="size-4" />}
		{connected ? 'Connected' : 'Not connected'}
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

const GoogleIcon = ({ className }: { className?: string }) => (
	<svg className={className} viewBox="0 0 24 24" width="20" height="20">
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

const AppleIcon = ({ className }: { className?: string }) => (
	<svg className={className} viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
		<path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
	</svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
	<svg className={className} viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
		<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
	</svg>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<div className="min-h-screen flex items-center justify-center p-4 @sm:p-6 @lg:p-8 bg-muted/30">
				<Card className="w-full max-w-md">
					<CardHeader className="text-center">
						<div className="flex justify-center mb-4">
							<Logo name="ShopHub" icon={ShoppingBag} />
						</div>
						<CardTitle className="text-2xl">Link your accounts</CardTitle>
						<CardDescription>Connect accounts for faster checkout</CardDescription>
					</CardHeader>
					<CardContent>
						<Alert className="mb-6">
							<AlertCircle className="size-4" />
							<AlertDescription>
								Link at least one account to enable one-tap checkout
							</AlertDescription>
						</Alert>
						<div className="space-y-3">
							<LinkedAccount
								provider="Google"
								email="john@gmail.com"
								connected={true}
								icon={GoogleIcon}
							/>
							<LinkedAccount
								provider="Apple"
								connected={false}
								icon={AppleIcon}
							/>
							<LinkedAccount
								provider="Facebook"
								connected={false}
								icon={FacebookIcon}
							/>
						</div>
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<SubmitButton label="Continue" icon={ArrowRight} />
						<Link href="/skip" className="text-sm text-muted-foreground hover:text-foreground">
							Skip for now
						</Link>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
