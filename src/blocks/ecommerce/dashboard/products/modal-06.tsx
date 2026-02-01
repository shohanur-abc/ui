'use client';

import * as React from 'react';
import {
	History,
	RotateCcw,
	User,
	Clock,
	ArrowRight,
	Eye,
	ChevronDown,
	ChevronUp,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';

interface VersionChange {
	field: string;
	oldValue: string;
	newValue: string;
}

interface Version {
	id: string;
	version: number;
	date: string;
	user: { name: string; avatar: string };
	changes: VersionChange[];
}

interface ChangeItemProps {
	change: VersionChange;
}

const ChangeItem = ({ change }: ChangeItemProps) => (
	<div className="flex items-center gap-2 rounded-lg bg-muted/50 p-2 text-sm">
		<span className="font-medium">{change.field}:</span>
		<span className="text-muted-foreground line-through">
			{change.oldValue}
		</span>
		<ArrowRight className="size-4 text-muted-foreground" />
		<span className="text-primary">{change.newValue}</span>
	</div>
);

interface VersionItemProps {
	version: Version;
	isLatest: boolean;
	onRestore: () => void;
	onPreview: () => void;
}

const VersionItem = ({
	version,
	isLatest,
	onRestore,
	onPreview,
}: VersionItemProps) => {
	const [isOpen, setIsOpen] = React.useState(false);

	return (
		<div className="rounded-lg border bg-card">
			<Collapsible open={isOpen} onOpenChange={setIsOpen}>
				<CollapsibleTrigger asChild>
					<button className="flex w-full items-center justify-between p-4 text-left hover:bg-accent/50">
						<div className="flex items-center gap-3">
							<Avatar className="size-8">
								<AvatarImage src={version.user.avatar} />
								<AvatarFallback>{version.user.name[0]}</AvatarFallback>
							</Avatar>
							<div>
								<div className="flex items-center gap-2">
									<span className="font-medium">Version {version.version}</span>
									{isLatest && <Badge>Current</Badge>}
								</div>
								<div className="flex items-center gap-2 text-sm text-muted-foreground">
									<Clock className="size-3" />
									{version.date}
									<span>by {version.user.name}</span>
								</div>
							</div>
						</div>
						<div className="flex items-center gap-2">
							<Badge variant="outline">{version.changes.length} changes</Badge>
							{isOpen ? (
								<ChevronUp className="size-4" />
							) : (
								<ChevronDown className="size-4" />
							)}
						</div>
					</button>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<div className="border-t p-4">
						<div className="mb-3 space-y-2">
							{version.changes.map((change, idx) => (
								<ChangeItem key={idx} change={change} />
							))}
						</div>
						<div className="flex justify-end gap-2">
							<Button variant="outline" size="sm" onClick={onPreview}>
								<Eye className="mr-2 size-4" />
								Preview
							</Button>
							{!isLatest && (
								<Button variant="outline" size="sm" onClick={onRestore}>
									<RotateCcw className="mr-2 size-4" />
									Restore
								</Button>
							)}
						</div>
					</div>
				</CollapsibleContent>
			</Collapsible>
		</div>
	);
};

interface RestoreDialogProps {
	version: Version;
	trigger: React.ReactNode;
	onConfirm: () => void;
}

const RestoreDialog = ({ version, trigger, onConfirm }: RestoreDialogProps) => {
	const [open, setOpen] = React.useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<RotateCcw className="size-5" />
						Restore Version {version.version}
					</DialogTitle>
					<DialogDescription>
						This will replace the current product data with the version from{' '}
						{version.date}. The current version will be saved as a new version.
					</DialogDescription>
				</DialogHeader>
				<div className="rounded-lg border bg-muted/30 p-4">
					<h4 className="mb-2 font-medium">Changes to restore:</h4>
					<div className="space-y-2">
						{version.changes.map((change, idx) => (
							<ChangeItem key={idx} change={change} />
						))}
					</div>
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={() => setOpen(false)}>
						Cancel
					</Button>
					<Button
						onClick={() => {
							onConfirm();
							setOpen(false);
						}}
						className="gap-2"
					>
						<RotateCcw className="size-4" />
						Restore Version
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

interface PreviewDialogProps {
	version: Version;
	trigger: React.ReactNode;
}

const PreviewDialog = ({ version, trigger }: PreviewDialogProps) => (
	<Dialog>
		<DialogTrigger asChild>{trigger}</DialogTrigger>
		<DialogContent className="max-w-2xl">
			<DialogHeader>
				<DialogTitle className="flex items-center gap-2">
					<Eye className="size-5" />
					Version {version.version} Preview
				</DialogTitle>
				<DialogDescription>
					Snapshot from {version.date} by {version.user.name}
				</DialogDescription>
			</DialogHeader>
			<div className="rounded-lg border bg-muted/30 p-6">
				<div className="space-y-4">
					<div className="flex aspect-video items-center justify-center rounded-lg bg-muted text-6xl">
						📦
					</div>
					<div>
						<h3 className="text-xl font-semibold">
							Sample Product (Version {version.version})
						</h3>
						<p className="text-sm text-muted-foreground">
							This is how the product looked at this version.
						</p>
					</div>
					<div className="grid gap-2 @sm:grid-cols-2">
						{version.changes.map((change, idx) => (
							<div key={idx} className="rounded-lg border p-3">
								<p className="text-sm font-medium">{change.field}</p>
								<p className="text-muted-foreground">{change.oldValue}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</DialogContent>
	</Dialog>
);

export default function Main() {
	const versions: Version[] = [
		{
			id: '1',
			version: 5,
			date: '2024-03-15 14:32',
			user: { name: 'John Smith', avatar: '' },
			changes: [
				{ field: 'Price', oldValue: '$49.99', newValue: '$44.99' },
				{ field: 'Sale Price', oldValue: 'None', newValue: '$39.99' },
			],
		},
		{
			id: '2',
			version: 4,
			date: '2024-03-14 09:15',
			user: { name: 'Jane Doe', avatar: '' },
			changes: [
				{
					field: 'Description',
					oldValue: 'Basic description',
					newValue: 'Enhanced product description with features',
				},
				{ field: 'Stock', oldValue: '50', newValue: '100' },
			],
		},
		{
			id: '3',
			version: 3,
			date: '2024-03-12 16:45',
			user: { name: 'Mike Johnson', avatar: '' },
			changes: [
				{
					field: 'Name',
					oldValue: 'Product v1',
					newValue: 'Product Pro Edition',
				},
				{ field: 'Category', oldValue: 'General', newValue: 'Electronics' },
				{ field: 'Tags', oldValue: 'None', newValue: 'wireless, bluetooth' },
			],
		},
		{
			id: '4',
			version: 2,
			date: '2024-03-10 11:20',
			user: { name: 'John Smith', avatar: '' },
			changes: [{ field: 'Price', oldValue: '$59.99', newValue: '$49.99' }],
		},
		{
			id: '5',
			version: 1,
			date: '2024-03-08 08:00',
			user: { name: 'John Smith', avatar: '' },
			changes: [{ field: 'Status', oldValue: 'Draft', newValue: 'Active' }],
		},
	];

	const handleRestore = (version: Version) => {
		console.log('Restoring version:', version.version);
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-2xl space-y-6 px-4 py-8 @sm:px-6">
				<div className="flex items-center gap-3">
					<History className="size-5" />
					<h2 className="text-xl font-semibold">Version History</h2>
				</div>

				<div className="space-y-3">
					{versions.map((version, idx) => (
						<VersionItem
							key={version.id}
							version={version}
							isLatest={idx === 0}
							onRestore={() => handleRestore(version)}
							onPreview={() => {}}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
