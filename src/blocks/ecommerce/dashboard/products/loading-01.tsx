'use client';

import * as React from 'react';

import { Skeleton } from '@/components/ui/skeleton';

const TableRowSkeleton = () => (
	<div className="flex items-center gap-4 border-b p-4">
		<Skeleton className="size-5" />
		<Skeleton className="size-12 rounded-lg" />
		<div className="flex-1 space-y-2">
			<Skeleton className="h-4 w-48" />
			<Skeleton className="h-3 w-24" />
		</div>
		<Skeleton className="h-6 w-16 rounded-full" />
		<Skeleton className="h-4 w-20" />
		<Skeleton className="h-4 w-16" />
		<Skeleton className="size-8 rounded" />
	</div>
);

const TableHeaderSkeleton = () => (
	<div className="flex items-center gap-4 border-b bg-muted/30 p-4">
		<Skeleton className="size-5" />
		<Skeleton className="h-4 w-20" />
		<div className="flex-1">
			<Skeleton className="h-4 w-16" />
		</div>
		<Skeleton className="h-4 w-12" />
		<Skeleton className="h-4 w-12" />
		<Skeleton className="h-4 w-12" />
		<Skeleton className="h-4 w-12" />
	</div>
);

const FilterBarSkeleton = () => (
	<div className="flex items-center gap-3 p-4">
		<Skeleton className="h-10 w-64" />
		<Skeleton className="h-10 w-32" />
		<Skeleton className="h-10 w-32" />
		<Skeleton className="h-10 w-32" />
		<div className="flex-1" />
		<Skeleton className="h-10 w-24" />
	</div>
);

const PaginationSkeleton = () => (
	<div className="flex items-center justify-between border-t p-4">
		<Skeleton className="h-4 w-48" />
		<div className="flex items-center gap-2">
			<Skeleton className="size-8" />
			<Skeleton className="size-8" />
			<Skeleton className="size-8" />
			<Skeleton className="size-8" />
			<Skeleton className="size-8" />
		</div>
	</div>
);

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-6xl px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="mb-6 flex items-center justify-between">
					<div className="space-y-2">
						<Skeleton className="h-8 w-32" />
						<Skeleton className="h-4 w-48" />
					</div>
					<div className="flex items-center gap-3">
						<Skeleton className="h-10 w-24" />
						<Skeleton className="h-10 w-32" />
					</div>
				</div>

				<div className="rounded-lg border bg-card">
					<FilterBarSkeleton />
					<TableHeaderSkeleton />
					{[...Array(8)].map((_, i) => (
						<TableRowSkeleton key={i} />
					))}
					<PaginationSkeleton />
				</div>
			</div>
		</section>
	);
}
