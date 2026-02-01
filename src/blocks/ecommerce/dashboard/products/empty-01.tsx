'use client';

import * as React from 'react';
import {
	Package,
	Plus,
	Upload,
	Search,
	FileText,
	ArrowRight,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

interface EmptyStateAction {
	label: string;
	icon: React.ElementType;
	onClick: () => void;
	variant?: 'default' | 'outline';
}

interface EmptyStateCardProps {
	icon: React.ElementType;
	title: string;
	description: string;
	actions: EmptyStateAction[];
}

const EmptyStateCard = ({
	icon: Icon,
	title,
	description,
	actions,
}: EmptyStateCardProps) => (
	<div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted/30 px-6 py-16 text-center">
		<div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
			<Icon className="size-8 text-muted-foreground" />
		</div>
		<h3 className="mb-2 text-lg font-semibold">{title}</h3>
		<p className="mb-6 max-w-sm text-muted-foreground">{description}</p>
		<div className="flex flex-wrap justify-center gap-3">
			{actions.map((action) => {
				const ActionIcon = action.icon;
				return (
					<Button
						key={action.label}
						onClick={action.onClick}
						variant={action.variant || 'default'}
						className="gap-2"
					>
						<ActionIcon className="size-4" />
						{action.label}
					</Button>
				);
			})}
		</div>
	</div>
);

interface QuickStartItemProps {
	icon: React.ElementType;
	title: string;
	description: string;
	onClick: () => void;
}

const QuickStartItem = ({
	icon: Icon,
	title,
	description,
	onClick,
}: QuickStartItemProps) => (
	<button
		onClick={onClick}
		className="flex items-start gap-4 rounded-lg border p-4 text-left transition-colors hover:bg-accent"
	>
		<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
			<Icon className="size-5 text-primary" />
		</div>
		<div className="flex-1">
			<h4 className="font-medium">{title}</h4>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
		<ArrowRight className="size-5 text-muted-foreground" />
	</button>
);

export default function Main() {
	const quickStartItems = [
		{
			icon: Plus,
			title: 'Add your first product',
			description: 'Create a new product with details, pricing, and images',
			onClick: () => console.log('Add product'),
		},
		{
			icon: Upload,
			title: 'Import from CSV',
			description: 'Bulk import products from a spreadsheet',
			onClick: () => console.log('Import'),
		},
		{
			icon: FileText,
			title: 'Use a template',
			description: 'Start with a pre-built product template',
			onClick: () => console.log('Template'),
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-3xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<EmptyStateCard
					icon={Package}
					title="No Products Yet"
					description="Get started by adding your first product to your store. You can add products manually or import them in bulk."
					actions={[
						{
							label: 'Add Product',
							icon: Plus,
							onClick: () => console.log('Add'),
						},
						{
							label: 'Import Products',
							icon: Upload,
							onClick: () => console.log('Import'),
							variant: 'outline',
						},
					]}
				/>

				<div className="rounded-lg border bg-card p-6">
					<h3 className="mb-4 font-semibold">Quick Start</h3>
					<div className="space-y-3">
						{quickStartItems.map((item) => (
							<QuickStartItem key={item.title} {...item} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
