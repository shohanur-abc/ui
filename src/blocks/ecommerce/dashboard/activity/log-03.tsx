import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	AlertCircle,
	XCircle,
	Bug,
	RefreshCw,
	Copy,
	ExternalLink,
	ChevronDown,
	ChevronUp,
	Filter,
	Download,
} from 'lucide-react';
import { useState } from 'react';

interface ErrorLog {
	id: string;
	severity: 'critical' | 'error' | 'warning';
	type: string;
	message: string;
	stackTrace?: string;
	occurrences: number;
	affectedUsers: number;
	service: string;
	firstSeen: string;
	lastSeen: string;
	status: 'new' | 'investigating' | 'resolved';
}

interface ErrorLogProps {
	title: string;
	errors: ErrorLog[];
	criticalCount: number;
	totalErrors: number;
}

const SeverityBadge = ({ severity }: { severity: ErrorLog['severity'] }) => {
	const config = {
		critical: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
		error: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
		warning: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
	};

	return (
		<Badge
			variant="outline"
			className={`uppercase text-xs font-semibold ${config[severity]}`}
		>
			{severity}
		</Badge>
	);
};

const StatusBadge = ({ status }: { status: ErrorLog['status'] }) => {
	const config = {
		new: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
		investigating: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
		resolved: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
	};

	const labels = {
		new: 'New',
		investigating: 'Investigating',
		resolved: 'Resolved',
	};

	return (
		<Badge variant="outline" className={config[status]}>
			{labels[status]}
		</Badge>
	);
};

const ErrorEntry = ({ error }: { error: ErrorLog }) => {
	const [expanded, setExpanded] = useState(false);

	return (
		<div
			className={`rounded-xl border backdrop-blur-sm transition-all ${
				error.severity === 'critical'
					? 'border-rose-500/30 bg-rose-500/5'
					: error.severity === 'error'
						? 'border-orange-500/30 bg-orange-500/5'
						: 'border-amber-500/30 bg-amber-500/5'
			}`}
		>
			<div className="p-4">
				<div className="flex items-start gap-3">
					<div
						className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${
							error.severity === 'critical'
								? 'bg-rose-500/20'
								: error.severity === 'error'
									? 'bg-orange-500/20'
									: 'bg-amber-500/20'
						}`}
					>
						{error.severity === 'critical' ? (
							<XCircle className="size-5 text-rose-400" />
						) : (
							<AlertCircle
								className={`size-5 ${
									error.severity === 'error'
										? 'text-orange-400'
										: 'text-amber-400'
								}`}
							/>
						)}
					</div>
					<div className="flex-1 min-w-0">
						<div className="flex items-start justify-between gap-2 mb-2">
							<div className="flex items-center gap-2 flex-wrap">
								<SeverityBadge severity={error.severity} />
								<Badge variant="outline" className="text-xs">
									{error.type}
								</Badge>
								<Badge variant="outline" className="text-xs bg-muted/50">
									{error.service}
								</Badge>
							</div>
							<StatusBadge status={error.status} />
						</div>
						<p className="font-mono text-sm text-foreground mb-2">
							{error.message}
						</p>
						<div className="flex items-center gap-4 text-xs text-muted-foreground">
							<span className="flex items-center gap-1">
								<RefreshCw className="size-3" />
								{error.occurrences} occurrences
							</span>
							<span>{error.affectedUsers} users affected</span>
							<span>Last: {error.lastSeen}</span>
						</div>
					</div>
				</div>
			</div>

			{error.stackTrace && (
				<>
					<button
						onClick={() => setExpanded(!expanded)}
						className="w-full flex items-center justify-center gap-1 py-2 text-xs text-muted-foreground border-t border-border/50 hover:bg-muted/30 transition-colors"
					>
						{expanded ? (
							<>
								Hide Stack Trace <ChevronUp className="size-3" />
							</>
						) : (
							<>
								Show Stack Trace <ChevronDown className="size-3" />
							</>
						)}
					</button>
					{expanded && (
						<div className="px-4 pb-4">
							<div className="relative">
								<pre className="p-3 rounded-lg bg-muted/50 text-xs font-mono text-muted-foreground overflow-x-auto max-h-48">
									{error.stackTrace}
								</pre>
								<Button
									variant="ghost"
									size="icon-sm"
									className="absolute top-2 right-2 size-6"
								>
									<Copy className="size-3" />
								</Button>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
};

const ErrorSummary = ({
	criticalCount,
	totalErrors,
}: {
	criticalCount: number;
	totalErrors: number;
}) => (
	<div className="grid grid-cols-2 gap-4">
		<div className="flex items-center gap-3 p-4 rounded-lg bg-rose-500/10 border border-rose-500/20">
			<XCircle className="size-8 text-rose-400" />
			<div>
				<p className="text-sm text-muted-foreground">Critical</p>
				<p className="text-2xl font-bold text-rose-400">{criticalCount}</p>
			</div>
		</div>
		<div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 border border-border/50">
			<Bug className="size-8 text-muted-foreground" />
			<div>
				<p className="text-sm text-muted-foreground">Total Errors</p>
				<p className="text-2xl font-bold text-foreground">{totalErrors}</p>
			</div>
		</div>
	</div>
);

const ErrorLogViewer = ({
	title,
	errors,
	criticalCount,
	totalErrors,
}: ErrorLogProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold flex items-center gap-2">
				<Bug className="size-5" />
				{title}
			</CardTitle>
			<div className="flex items-center gap-2">
				<Button variant="ghost" size="sm" className="gap-1">
					<Filter className="size-4" />
					Filter
				</Button>
				<Button variant="outline" size="sm" className="gap-1">
					<ExternalLink className="size-4" />
					Sentry
				</Button>
			</div>
		</CardHeader>
		<CardContent className="pt-6 space-y-4">
			<ErrorSummary criticalCount={criticalCount} totalErrors={totalErrors} />
			<ScrollArea className="h-[420px]">
				<div className="space-y-3 pr-4">
					{errors.map((error) => (
						<ErrorEntry key={error.id} error={error} />
					))}
				</div>
			</ScrollArea>
		</CardContent>
	</Card>
);

export default function Main() {
	const errorLogs: ErrorLog[] = [
		{
			id: '1',
			severity: 'critical',
			type: 'DatabaseError',
			message: 'FATAL: too many connections for role "app_user"',
			stackTrace: `Error: FATAL: too many connections for role "app_user"
    at Connection.parseE (node_modules/pg/lib/connection.js:614:11)
    at Connection.parseMessage (node_modules/pg/lib/connection.js:413:19)
    at Socket.<anonymous> (node_modules/pg/lib/connection.js:129:22)
    at Socket.emit (node:events:514:28)`,
			occurrences: 47,
			affectedUsers: 234,
			service: 'database-pool',
			firstSeen: '2 hours ago',
			lastSeen: '5 min ago',
			status: 'investigating',
		},
		{
			id: '2',
			severity: 'error',
			type: 'PaymentError',
			message: 'Stripe API rate limit exceeded (429)',
			occurrences: 12,
			affectedUsers: 8,
			service: 'payment-service',
			firstSeen: '1 hour ago',
			lastSeen: '15 min ago',
			status: 'new',
		},
		{
			id: '3',
			severity: 'error',
			type: 'ValidationError',
			message: 'Invalid email format in checkout form',
			stackTrace: `ValidationError: Invalid email format
    at validateEmail (src/utils/validation.ts:45:11)
    at CheckoutForm.handleSubmit (src/components/Checkout.tsx:89:5)`,
			occurrences: 156,
			affectedUsers: 89,
			service: 'checkout-service',
			firstSeen: '1 day ago',
			lastSeen: '30 min ago',
			status: 'investigating',
		},
		{
			id: '4',
			severity: 'warning',
			type: 'TimeoutError',
			message: 'Inventory sync timeout after 30000ms',
			occurrences: 23,
			affectedUsers: 0,
			service: 'inventory-sync',
			firstSeen: '3 hours ago',
			lastSeen: '1 hour ago',
			status: 'resolved',
		},
		{
			id: '5',
			severity: 'critical',
			type: 'MemoryError',
			message: 'JavaScript heap out of memory',
			stackTrace: `FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed
    - JavaScript heap out of memory
    at processImmediate (node:internal/timers:478:21)`,
			occurrences: 3,
			affectedUsers: 0,
			service: 'image-processor',
			firstSeen: '4 hours ago',
			lastSeen: '2 hours ago',
			status: 'new',
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-3xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<ErrorLogViewer
					title="Error Log"
					errors={errorLogs}
					criticalCount={2}
					totalErrors={241}
				/>
			</div>
		</section>
	);
}
