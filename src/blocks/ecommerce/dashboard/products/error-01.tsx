'use client';

import * as React from 'react';
import {
	AlertCircle,
	RefreshCw,
	Home,
	ArrowLeft,
	WifiOff,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ErrorStateProps {
	type: 'generic' | 'network' | 'notFound' | 'permission';
	title: string;
	description: string;
	onRetry?: () => void;
	onGoBack?: () => void;
	onGoHome?: () => void;
}

const ErrorState = ({
	type,
	title,
	description,
	onRetry,
	onGoBack,
	onGoHome,
}: ErrorStateProps) => {
	const icons = {
		generic: AlertCircle,
		network: WifiOff,
		notFound: AlertCircle,
		permission: AlertCircle,
	};

	const Icon = icons[type];

	return (
		<div className="flex flex-col items-center justify-center rounded-lg border bg-destructive/5 px-6 py-12 text-center">
			<div className="mb-4 flex size-16 items-center justify-center rounded-full bg-destructive/10">
				<Icon className="size-8 text-destructive" />
			</div>
			<Badge variant="destructive" className="mb-2">
				Error
			</Badge>
			<h3 className="mb-2 text-lg font-semibold">{title}</h3>
			<p className="mb-6 max-w-sm text-muted-foreground">{description}</p>
			<div className="flex flex-wrap justify-center gap-3">
				{onRetry && (
					<Button onClick={onRetry} className="gap-2">
						<RefreshCw className="size-4" />
						Try Again
					</Button>
				)}
				{onGoBack && (
					<Button variant="outline" onClick={onGoBack} className="gap-2">
						<ArrowLeft className="size-4" />
						Go Back
					</Button>
				)}
				{onGoHome && (
					<Button variant="outline" onClick={onGoHome} className="gap-2">
						<Home className="size-4" />
						Go to Dashboard
					</Button>
				)}
			</div>
		</div>
	);
};

interface ErrorDetailsProps {
	code: string;
	message: string;
	timestamp: string;
	requestId: string;
}

const ErrorDetails = ({
	code,
	message,
	timestamp,
	requestId,
}: ErrorDetailsProps) => (
	<div className="rounded-lg border bg-muted/30 p-4">
		<h4 className="mb-3 text-sm font-medium">Error Details</h4>
		<div className="space-y-2 text-sm">
			<div className="flex items-center justify-between">
				<span className="text-muted-foreground">Error Code:</span>
				<code className="rounded bg-muted px-2 py-0.5">{code}</code>
			</div>
			<div className="flex items-center justify-between">
				<span className="text-muted-foreground">Message:</span>
				<span>{message}</span>
			</div>
			<div className="flex items-center justify-between">
				<span className="text-muted-foreground">Timestamp:</span>
				<span>{timestamp}</span>
			</div>
			<div className="flex items-center justify-between">
				<span className="text-muted-foreground">Request ID:</span>
				<code className="rounded bg-muted px-2 py-0.5 text-xs">{requestId}</code>
			</div>
		</div>
	</div>
);

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-2xl space-y-8 px-4 py-8 @sm:px-6">
				<div className="space-y-4">
					<h2 className="text-xl font-semibold">Generic Error</h2>
					<ErrorState
						type="generic"
						title="Something Went Wrong"
						description="We encountered an unexpected error while loading your products. Please try again."
						onRetry={() => console.log('Retry')}
						onGoHome={() => console.log('Go home')}
					/>
				</div>

				<div className="space-y-4">
					<h2 className="text-xl font-semibold">Network Error</h2>
					<ErrorState
						type="network"
						title="Connection Lost"
						description="Unable to connect to the server. Please check your internet connection and try again."
						onRetry={() => console.log('Retry')}
					/>
				</div>

				<div className="space-y-4">
					<h2 className="text-xl font-semibold">Not Found</h2>
					<ErrorState
						type="notFound"
						title="Product Not Found"
						description="The product you're looking for doesn't exist or has been removed."
						onGoBack={() => console.log('Go back')}
						onGoHome={() => console.log('Go home')}
					/>
				</div>

				<ErrorDetails
					code="ERR_PRODUCT_LOAD_FAILED"
					message="Failed to fetch products from API"
					timestamp="2024-03-15 14:32:45 UTC"
					requestId="req_abc123xyz789"
				/>
			</div>
		</section>
	);
}
