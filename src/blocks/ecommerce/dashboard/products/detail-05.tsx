'use client';

import * as React from 'react';
import {
	History,
	Clock,
	User,
	ArrowLeft,
	ArrowRight,
	RotateCcw,
	Eye,
	ChevronDown,
	Plus,
	Minus,
	Edit2,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';

interface FieldChange {
	field: string;
	oldValue: string;
	newValue: string;
}

interface HistoryEntry {
	id: string;
	version: number;
	timestamp: string;
	author: {
		name: string;
		avatar: string;
		initials: string;
	};
	action: 'created' | 'updated' | 'published' | 'unpublished' | 'restored';
	changes: FieldChange[];
	note?: string;
}

interface HistoryTimelineItemProps {
	entry: HistoryEntry;
	isFirst: boolean;
	isLast: boolean;
	onPreview: () => void;
	onRestore: () => void;
}

const HistoryTimelineItem = ({
	entry,
	isFirst,
	isLast,
	onPreview,
	onRestore,
}: HistoryTimelineItemProps) => {
	const [isOpen, setIsOpen] = React.useState(false);

	const actionConfig = {
		created: { label: 'Created', color: 'bg-emerald-500' },
		updated: { label: 'Updated', color: 'bg-blue-500' },
		published: { label: 'Published', color: 'bg-purple-500' },
		unpublished: { label: 'Unpublished', color: 'bg-amber-500' },
		restored: { label: 'Restored', color: 'bg-orange-500' },
	};

	const { label, color } = actionConfig[entry.action];

	return (
		<div className="relative flex gap-4">
			<div className="flex flex-col items-center">
				<div className={`z-10 size-3 rounded-full ${color}`} />
				{!isLast && <div className="w-px flex-1 bg-border" />}
			</div>

			<div className="flex-1 pb-6">
				<Collapsible open={isOpen} onOpenChange={setIsOpen}>
					<div className="rounded-lg border bg-card p-4">
						<div className="flex items-start justify-between gap-4">
							<div className="flex items-center gap-3">
								<Avatar className="size-8">
									<AvatarImage src={entry.author.avatar} />
									<AvatarFallback>{entry.author.initials}</AvatarFallback>
								</Avatar>
								<div>
									<p className="font-medium">{entry.author.name}</p>
									<p className="flex items-center gap-1 text-xs text-muted-foreground">
										<Clock className="size-3" />
										{entry.timestamp}
									</p>
								</div>
							</div>
							<div className="flex items-center gap-2">
								<Badge variant="secondary">v{entry.version}</Badge>
								<Badge className={color}>{label}</Badge>
							</div>
						</div>

						{entry.note && (
							<p className="mt-3 text-sm text-muted-foreground italic">
								&ldquo;{entry.note}&rdquo;
							</p>
						)}

						{entry.changes.length > 0 && (
							<CollapsibleTrigger asChild>
								<Button
									variant="ghost"
									size="sm"
									className="mt-3 w-full justify-between"
								>
									<span>{entry.changes.length} changes</span>
									<ChevronDown className={`size-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
								</Button>
							</CollapsibleTrigger>
						)}

						<CollapsibleContent className="mt-3 space-y-2">
							{entry.changes.map((change, idx) => (
								<FieldChangeRow key={idx} change={change} />
							))}
						</CollapsibleContent>

						{!isFirst && (
							<div className="mt-3 flex gap-2">
								<Button variant="outline" size="sm" className="gap-1" onClick={onPreview}>
									<Eye className="size-3.5" />
									Preview
								</Button>
								<Button variant="outline" size="sm" className="gap-1" onClick={onRestore}>
									<RotateCcw className="size-3.5" />
									Restore
								</Button>
							</div>
						)}
					</div>
				</Collapsible>
			</div>
		</div>
	);
};

interface FieldChangeRowProps {
	change: FieldChange;
}

const FieldChangeRow = ({ change }: FieldChangeRowProps) => (
	<div className="rounded-md bg-muted/50 p-3 text-sm">
		<p className="mb-2 font-medium text-muted-foreground">{change.field}</p>
		<div className="grid gap-2 @sm:grid-cols-2">
			<div className="flex items-start gap-2">
				<Minus className="mt-0.5 size-3.5 shrink-0 text-red-500" />
				<p className="line-through opacity-60">{change.oldValue || '(empty)'}</p>
			</div>
			<div className="flex items-start gap-2">
				<Plus className="mt-0.5 size-3.5 shrink-0 text-emerald-500" />
				<p>{change.newValue || '(empty)'}</p>
			</div>
		</div>
	</div>
);

interface CompareVersionsProps {
	versions: { value: number; label: string }[];
	leftVersion: number;
	rightVersion: number;
	onLeftChange: (v: number) => void;
	onRightChange: (v: number) => void;
}

const CompareVersions = ({
	versions,
	leftVersion,
	rightVersion,
	onLeftChange,
	onRightChange,
}: CompareVersionsProps) => (
	<div className="flex items-center gap-4 rounded-lg border bg-muted/30 p-4">
		<select
			value={leftVersion}
			onChange={(e) => onLeftChange(Number(e.target.value))}
			className="flex-1 rounded-md border bg-background px-3 py-2 text-sm"
		>
			{versions.map((v) => (
				<option key={v.value} value={v.value}>
					{v.label}
				</option>
			))}
		</select>
		<ArrowRight className="size-5 text-muted-foreground" />
		<select
			value={rightVersion}
			onChange={(e) => onRightChange(Number(e.target.value))}
			className="flex-1 rounded-md border bg-background px-3 py-2 text-sm"
		>
			{versions.map((v) => (
				<option key={v.value} value={v.value}>
					{v.label}
				</option>
			))}
		</select>
		<Button size="sm">Compare</Button>
	</div>
);

export default function Main() {
	const [leftVersion, setLeftVersion] = React.useState(4);
	const [rightVersion, setRightVersion] = React.useState(5);

	const history: HistoryEntry[] = [
		{
			id: '1',
			version: 5,
			timestamp: '2 hours ago',
			author: { name: 'Sarah Chen', avatar: '', initials: 'SC' },
			action: 'updated',
			changes: [
				{ field: 'Price', oldValue: '$149.99', newValue: '$199.99' },
				{ field: 'Compare at Price', oldValue: '$199.99', newValue: '$249.99' },
			],
			note: 'Price increase for premium positioning',
		},
		{
			id: '2',
			version: 4,
			timestamp: 'Yesterday at 3:45 PM',
			author: { name: 'Mike Johnson', avatar: '', initials: 'MJ' },
			action: 'published',
			changes: [],
		},
		{
			id: '3',
			version: 3,
			timestamp: 'Yesterday at 2:30 PM',
			author: { name: 'Sarah Chen', avatar: '', initials: 'SC' },
			action: 'updated',
			changes: [
				{ field: 'Title', oldValue: 'Wireless Headphones', newValue: 'Premium Wireless Headphones' },
				{ field: 'Description', oldValue: 'Great headphones for everyday use.', newValue: 'Experience crystal-clear audio with our top-of-the-line wireless headphones. Featuring active noise cancellation and 30-hour battery life.' },
			],
		},
		{
			id: '4',
			version: 2,
			timestamp: '3 days ago',
			author: { name: 'Alex Rivera', avatar: '', initials: 'AR' },
			action: 'updated',
			changes: [
				{ field: 'SKU', oldValue: 'WHP-001', newValue: 'WHP-PRO-001' },
				{ field: 'Stock', oldValue: '50', newValue: '150' },
			],
		},
		{
			id: '5',
			version: 1,
			timestamp: 'Last week',
			author: { name: 'Sarah Chen', avatar: '', initials: 'SC' },
			action: 'created',
			changes: [],
		},
	];

	const versions = history.map((h) => ({
		value: h.version,
		label: `v${h.version} - ${h.timestamp}`,
	}));

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-3xl space-y-6 px-4 py-8 @sm:px-6">
				<div className="flex items-center gap-3">
					<History className="size-5" />
					<h2 className="text-xl font-semibold">Version History</h2>
				</div>

				<CompareVersions
					versions={versions}
					leftVersion={leftVersion}
					rightVersion={rightVersion}
					onLeftChange={setLeftVersion}
					onRightChange={setRightVersion}
				/>

				<Separator />

				<div className="space-y-0">
					{history.map((entry, idx) => (
						<HistoryTimelineItem
							key={entry.id}
							entry={entry}
							isFirst={idx === 0}
							isLast={idx === history.length - 1}
							onPreview={() => console.log('Preview', entry.version)}
							onRestore={() => console.log('Restore', entry.version)}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
