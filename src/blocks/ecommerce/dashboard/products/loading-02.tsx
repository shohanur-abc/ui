'use client';

import * as React from 'react';

import { Skeleton } from '@/components/ui/skeleton';

const ProductCardSkeleton = () => (
	<div className="rounded-lg border bg-card p-4">
		<Skeleton className="mb-4 aspect-square w-full rounded-lg" />
		<div className="space-y-2">
			<Skeleton className="h-5 w-3/4" />
			<Skeleton className="h-4 w-1/2" />
			<div className="flex items-center justify-between pt-2">
				<Skeleton className="h-6 w-16" />
				<Skeleton className="h-6 w-20 rounded-full" />
			</div>
		</div>
	</div>
);

const FilterSidebarSkeleton = () => (
	<div className="space-y-6">
		<div className="space-y-3">
			<Skeleton className="h-5 w-24" />
			<Skeleton className="h-10 w-full" />
		</div>
		<div className="space-y-3">
			<Skeleton className="h-5 w-20" />
			{[...Array(4)].map((_, i) => (
				<div key={i} className="flex items-center gap-2">
					<Skeleton className="size-4" />
					<Skeleton className="h-4 w-24" />
					<Skeleton className="ml-auto h-4 w-8" />
				</div>
			))}
		</div>
		<div className="space-y-3">
			<Skeleton className="h-5 w-16" />
			<Skeleton className="h-2 w-full" />
			<div className="flex justify-between">
				<Skeleton className="h-4 w-12" />
				<Skeleton className="h-4 w-12" />
			</div>
		</div>
		<div className="space-y-3">
			<Skeleton className="h-5 w-12" />
			<div className="flex flex-wrap gap-2">
				{[...Array(6)].map((_, i) => (
					<Skeleton key={i} className="size-8 rounded-full" />
				))}
			</div>
		</div>
	</div>
);

const GridHeaderSkeleton = () => (
	<div className="flex items-center justify-between">
		<Skeleton className="h-4 w-32" />
		<div className="flex items-center gap-2">
			<Skeleton className="h-10 w-36" />
			<div className="flex gap-1">
				<Skeleton className="size-10" />
				<Skeleton className="size-10" />
			</div>
		</div>
	</div>
);

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="mb-6 flex items-center justify-between">
					<Skeleton className="h-8 w-32" />
					<Skeleton className="h-10 w-32" />
				</div>

				<div className="grid gap-8 @xl:grid-cols-[280px_1fr]">
					<aside className="hidden rounded-lg border bg-card p-4 @xl:block">
						<FilterSidebarSkeleton />
					</aside>

					<div className="space-y-4">
						<GridHeaderSkeleton />
						<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-3 @2xl:grid-cols-4">
							{[...Array(12)].map((_, i) => (
								<ProductCardSkeleton key={i} />
							))}
						</div>
						<div className="flex items-center justify-center gap-2 py-4">
							<Skeleton className="size-10" />
							<Skeleton className="size-10" />
							<Skeleton className="size-10" />
							<Skeleton className="size-10" />
							<Skeleton className="size-10" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
