import Link from 'next/link';
import { Lock, ArrowRight, KeyRound, CheckCircle2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

const Logo = ({
	name,
	icon: Icon,
}: {
	name: string;
	icon: React.ElementType;
}) => (
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

const PasswordRequirement = ({ met, text }: { met: boolean; text: string }) => (
	<div className="flex items-center gap-2 text-sm">
		<CheckCircle2
			className={`size-4 ${met ? 'text-green-500' : 'text-muted-foreground'}`}
		/>
		<span className={met ? 'text-foreground' : 'text-muted-foreground'}>
			{text}
		</span>
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

export default function Main() {
	const requirements = [
		{ met: true, text: 'At least 8 characters' },
		{ met: true, text: 'One uppercase letter' },
		{ met: false, text: 'One number' },
		{ met: false, text: 'One special character' },
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<div className="min-h-screen flex items-center justify-center p-4 @sm:p-6 @lg:p-8 bg-muted/30">
				<Card className="w-full max-w-md">
					<CardHeader className="text-center">
						<div className="flex justify-center mb-4">
							<Logo name="SecureShop" icon={KeyRound} />
						</div>
						<CardTitle className="text-2xl">Reset your password</CardTitle>
						<CardDescription>
							Create a new password for your account
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form className="space-y-4">
							<FormField
								label="New Password"
								type="password"
								placeholder="••••••••"
								icon={Lock}
							/>
							<FormField
								label="Confirm Password"
								type="password"
								placeholder="••••••••"
								icon={Lock}
							/>
							<div className="p-4 rounded-lg bg-muted/50 space-y-2">
								{requirements.map((req, i) => (
									<PasswordRequirement key={i} met={req.met} text={req.text} />
								))}
							</div>
							<SubmitButton label="Reset Password" icon={ArrowRight} />
						</form>
					</CardContent>
					<CardFooter className="justify-center">
						<p className="text-sm text-muted-foreground text-center">
							Remember your password?{' '}
							<Link
								href="/login"
								className="text-primary font-medium hover:underline"
							>
								Sign in
							</Link>
						</p>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
