'use client';

import * as React from 'react';
import {
	Lock,
	AlertCircle,
	Shield,
	UserX,
	ArrowLeft,
	Mail,
	Key,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PermissionDeniedProps {
	resource: string;
	requiredRole: string;
	currentRole: string;
	onRequestAccess: () => void;
	onGoBack: () => void;
}

const PermissionDenied = ({
	resource,
	requiredRole,
	currentRole,
	onRequestAccess,
	onGoBack,
}: PermissionDeniedProps) => (
	<div className="flex flex-col items-center justify-center rounded-lg border bg-amber-500/5 px-6 py-12 text-center">
		<div className="mb-4 flex size-16 items-center justify-center rounded-full bg-amber-500/10">
			<Lock className="size-8 text-amber-500" />
		</div>
		<Badge variant="outline" className="mb-2 border-amber-500 text-amber-500">
			Access Denied
		</Badge>
		<h3 className="mb-2 text-lg font-semibold">Permission Required</h3>
		<p className="mb-4 max-w-sm text-muted-foreground">
			You don't have permission to access <span className="font-medium">{resource}</span>.
		</p>
		<div className="mb-6 rounded-lg bg-muted px-4 py-2 text-sm">
			<span className="text-muted-foreground">Current role:</span>{' '}
			<Badge variant="secondary">{currentRole}</Badge>
			<span className="mx-2 text-muted-foreground">→</span>
			<span className="text-muted-foreground">Required:</span>{' '}
			<Badge>{requiredRole}</Badge>
		</div>
		<div className="flex gap-3">
			<Button variant="outline" onClick={onGoBack} className="gap-2">
				<ArrowLeft className="size-4" />
				Go Back
			</Button>
			<Button onClick={onRequestAccess} className="gap-2">
				<Mail className="size-4" />
				Request Access
			</Button>
		</div>
	</div>
);

interface SessionExpiredProps {
	onRelogin: () => void;
}

const SessionExpired = ({ onRelogin }: SessionExpiredProps) => (
	<div className="flex flex-col items-center justify-center rounded-lg border bg-muted/30 px-6 py-12 text-center">
		<div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
			<UserX className="size-8 text-muted-foreground" />
		</div>
		<h3 className="mb-2 text-lg font-semibold">Session Expired</h3>
		<p className="mb-6 max-w-sm text-muted-foreground">
			Your session has expired. Please log in again to continue.
		</p>
		<Button onClick={onRelogin} className="gap-2">
			<Key className="size-4" />
			Log In Again
		</Button>
	</div>
);

interface ReauthFormProps {
	email: string;
	onSubmit: (password: string) => void;
}

const ReauthForm = ({ email, onSubmit }: ReauthFormProps) => {
	const [password, setPassword] = React.useState('');

	return (
		<div className="rounded-lg border bg-card p-6">
			<div className="mb-4 flex items-center gap-2">
				<Shield className="size-5 text-primary" />
				<h3 className="font-semibold">Verify Your Identity</h3>
			</div>
			<p className="mb-4 text-sm text-muted-foreground">
				For your security, please re-enter your password to perform this action.
			</p>
			<div className="space-y-4">
				<div className="space-y-2">
					<Label>Email</Label>
					<Input value={email} disabled className="bg-muted" />
				</div>
				<div className="space-y-2">
					<Label>Password</Label>
					<Input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Enter your password"
					/>
				</div>
				<Button onClick={() => onSubmit(password)} className="w-full">
					Verify & Continue
				</Button>
			</div>
		</div>
	);
};

interface LockedResourceProps {
	reason: string;
	lockedBy: string;
	lockedAt: string;
	onRequestUnlock: () => void;
}

const LockedResource = ({
	reason,
	lockedBy,
	lockedAt,
	onRequestUnlock,
}: LockedResourceProps) => (
	<div className="rounded-lg border border-amber-500/50 bg-amber-500/5 p-4">
		<div className="mb-3 flex items-center gap-2">
			<Lock className="size-5 text-amber-500" />
			<h4 className="font-semibold">Resource Locked</h4>
		</div>
		<div className="mb-4 space-y-1 text-sm">
			<p>
				<span className="text-muted-foreground">Locked by:</span> {lockedBy}
			</p>
			<p>
				<span className="text-muted-foreground">Locked at:</span> {lockedAt}
			</p>
			<p>
				<span className="text-muted-foreground">Reason:</span> {reason}
			</p>
		</div>
		<Button variant="outline" size="sm" onClick={onRequestUnlock}>
			Request Unlock
		</Button>
	</div>
);

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-2xl space-y-8 px-4 py-8 @sm:px-6">
				<div className="flex items-center gap-3">
					<AlertCircle className="size-5" />
					<h2 className="text-xl font-semibold">Permission & Access Errors</h2>
				</div>

				<div className="space-y-4">
					<h3 className="font-semibold">Permission Denied</h3>
					<PermissionDenied
						resource="Product Management"
						requiredRole="Admin"
						currentRole="Viewer"
						onRequestAccess={() => console.log('Request access')}
						onGoBack={() => console.log('Go back')}
					/>
				</div>

				<div className="space-y-4">
					<h3 className="font-semibold">Session Expired</h3>
					<SessionExpired onRelogin={() => console.log('Relogin')} />
				</div>

				<div className="space-y-4">
					<h3 className="font-semibold">Re-authentication Required</h3>
					<ReauthForm
						email="user@example.com"
						onSubmit={(password) => console.log('Verify:', password)}
					/>
				</div>

				<div className="space-y-4">
					<h3 className="font-semibold">Locked Resource</h3>
					<LockedResource
						reason="Bulk price update in progress"
						lockedBy="admin@example.com"
						lockedAt="2024-03-15 14:30:00"
						onRequestUnlock={() => console.log('Request unlock')}
					/>
				</div>
			</div>
		</section>
	);
}
