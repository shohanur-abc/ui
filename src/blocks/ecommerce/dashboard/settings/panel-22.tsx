import {
	Check,
	Copy,
	Download,
	Key,
	QrCode,
	RefreshCw,
	Shield,
	Smartphone,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

type BackupCode = {
	code: string;
	used: boolean;
};

type AuthMethod = {
	id: string;
	name: string;
	description: string;
	icon: React.ComponentType<{ className?: string }>;
	active: boolean;
	primary?: boolean;
};

const QRCodePlaceholder = () => (
	<div className="flex size-48 items-center justify-center rounded-lg border-2 border-dashed bg-muted/50">
		<QrCode className="size-16 text-muted-foreground" />
	</div>
);

const BackupCodeGrid = ({ codes }: { codes: BackupCode[] }) => (
	<div className="grid grid-cols-2 gap-2 @sm:grid-cols-4">
		{codes.map((code, i) => (
			<div
				key={i}
				className={`flex items-center justify-center rounded-lg border p-2 font-mono text-sm ${
					code.used
						? 'bg-muted text-muted-foreground line-through'
						: 'bg-background'
				}`}
			>
				{code.code}
			</div>
		))}
	</div>
);

const AuthMethodCard = ({
	name,
	description,
	icon: Icon,
	active,
	primary,
}: AuthMethod) => (
	<div
		className={`flex items-center gap-4 rounded-lg border p-4 transition-all ${
			active ? 'border-primary/30 bg-primary/5' : ''
		}`}
	>
		<div
			className={`flex size-10 items-center justify-center rounded-lg ${
				active ? 'bg-emerald-500/10 text-emerald-500' : 'bg-muted text-muted-foreground'
			}`}
		>
			<Icon className="size-5" />
		</div>
		<div className="flex-1">
			<div className="flex items-center gap-2">
				<span className="font-medium">{name}</span>
				{primary && <Badge variant="default">Primary</Badge>}
				{active && !primary && (
					<Badge className="bg-emerald-500/10 text-emerald-500 border-0">Active</Badge>
				)}
			</div>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
		<Button variant={active ? 'secondary' : 'outline'} size="sm">
			{active ? 'Configure' : 'Enable'}
		</Button>
	</div>
);

export default function Main() {
	const authMethods: AuthMethod[] = [
		{
			id: 'app',
			name: 'Authenticator App',
			description: 'Use Google Authenticator or similar apps',
			icon: Smartphone,
			active: true,
			primary: true,
		},
		{
			id: 'sms',
			name: 'SMS Verification',
			description: 'Receive codes via text message',
			icon: Smartphone,
			active: true,
		},
		{
			id: 'backup',
			name: 'Backup Codes',
			description: 'One-time use recovery codes',
			icon: Key,
			active: true,
		},
	];

	const backupCodes: BackupCode[] = [
		{ code: 'XXXX-XXXX', used: false },
		{ code: 'XXXX-XXXX', used: false },
		{ code: 'XXXX-XXXX', used: true },
		{ code: 'XXXX-XXXX', used: false },
		{ code: 'XXXX-XXXX', used: false },
		{ code: 'XXXX-XXXX', used: true },
		{ code: 'XXXX-XXXX', used: false },
		{ code: 'XXXX-XXXX', used: false },
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-3xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<Card>
						<CardHeader className="border-b">
							<div className="flex items-center gap-3">
								<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
									<Shield className="size-5 text-primary" />
								</div>
								<div>
									<CardTitle>Two-Factor Authentication</CardTitle>
									<CardDescription>
										Add an extra layer of security to your account
									</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent className="space-y-6 pt-6">
							<div className="space-y-4">
								<h4 className="font-medium">Authentication Methods</h4>
								{authMethods.map((method) => (
									<AuthMethodCard key={method.id} {...method} />
								))}
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="border-b">
							<CardTitle className="text-base">Setup Authenticator App</CardTitle>
							<CardDescription>
								Scan the QR code with your authenticator app
							</CardDescription>
						</CardHeader>
						<CardContent className="pt-6">
							<div className="flex flex-col items-center gap-6 @md:flex-row @md:items-start">
								<QRCodePlaceholder />
								<div className="flex-1 space-y-4">
									<div className="space-y-2">
										<Label>Or enter this code manually:</Label>
										<div className="flex items-center gap-2">
											<Input
												readOnly
												value="JBSWY3DPEHPK3PXP"
												className="font-mono"
											/>
											<Button variant="outline" size="icon">
												<Copy className="size-4" />
											</Button>
										</div>
									</div>
									<div className="space-y-2">
										<Label>Enter verification code:</Label>
										<InputOTP maxLength={6}>
											<InputOTPGroup>
												<InputOTPSlot index={0} />
												<InputOTPSlot index={1} />
												<InputOTPSlot index={2} />
											</InputOTPGroup>
											<InputOTPSeparator />
											<InputOTPGroup>
												<InputOTPSlot index={3} />
												<InputOTPSlot index={4} />
												<InputOTPSlot index={5} />
											</InputOTPGroup>
										</InputOTP>
									</div>
									<Button className="gap-2">
										<Check className="size-4" />
										Verify & Enable
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="border-b">
							<div className="flex items-center justify-between">
								<div>
									<CardTitle className="text-base">Backup Codes</CardTitle>
									<CardDescription>
										Use these codes if you lose access to your authenticator
									</CardDescription>
								</div>
								<div className="flex gap-2">
									<Button variant="outline" size="sm" className="gap-2">
										<Download className="size-4" />
										Download
									</Button>
									<Button variant="outline" size="sm" className="gap-2">
										<RefreshCw className="size-4" />
										Regenerate
									</Button>
								</div>
							</div>
						</CardHeader>
						<CardContent className="pt-6">
							<BackupCodeGrid codes={backupCodes} />
							<p className="mt-4 text-sm text-muted-foreground">
								6 codes remaining. Each code can only be used once.
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
