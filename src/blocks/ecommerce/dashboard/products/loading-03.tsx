'use client';

import * as React from 'react';

import { Skeleton } from '@/components/ui/skeleton';

const ImageGallerySkeleton = () => (
	<div className="space-y-4">
		<Skeleton className="aspect-square w-full rounded-lg" />
		<div className="flex gap-2">
			{[...Array(4)].map((_, i) => (
				<Skeleton key={i} className="size-16 rounded-lg" />
			))}
		</div>
	</div>
);

const ProductInfoSkeleton = () => (
	<div className="space-y-4">
		<div className="space-y-2">
			<Skeleton className="h-6 w-24 rounded-full" />
			<Skeleton className="h-8 w-3/4" />
			<Skeleton className="h-4 w-32" />
		</div>
		<div className="flex items-center gap-2">
			<Skeleton className="h-4 w-24" />
			<Skeleton className="h-4 w-16" />
		</div>
		<div className="flex items-baseline gap-2">
			<Skeleton className="h-8 w-24" />
			<Skeleton className="h-6 w-16" />
		</div>
		<Skeleton className="h-px w-full" />
		<div className="space-y-2">
			<Skeleton className="h-4 w-full" />
			<Skeleton className="h-4 w-5/6" />
			<Skeleton className="h-4 w-4/6" />
		</div>
		<div className="space-y-3">
			<Skeleton className="h-5 w-16" />
			<div className="flex gap-2">
				{[...Array(4)].map((_, i) => (
					<Skeleton key={i} className="h-10 w-16" />
				))}
			</div>
		</div>
		<div className="space-y-3">
			<Skeleton className="h-5 w-12" />
			<div className="flex gap-2">
				{[...Array(5)].map((_, i) => (
					<Skeleton key={i} className="size-8 rounded-full" />
				))}
			</div>
		</div>
		<Skeleton className="h-px w-full" />
		<div className="space-y-2">
			{[...Array(4)].map((_, i) => (
				<div key={i} className="flex items-center gap-2">
					<Skeleton className="size-4" />
					<Skeleton className="h-4 w-32" />
				</div>
			))}
		</div>
		<div className="flex gap-2 pt-4">
			<Skeleton className="h-12 flex-1" />
			<Skeleton className="size-12" />
			<Skeleton className="size-12" />
		</div>
	</div>
);

const TabsSkeleton = () => (
	<div className="space-y-4">
		<div className="flex gap-4 border-b">
			<Skeleton className="h-10 w-24" />
			<Skeleton className="h-10 w-24" />
			<Skeleton className="h-10 w-24" />
			<Skeleton className="h-10 w-24" />
		</div>
		<div className="space-y-4">
			<Skeleton className="h-4 w-full" />
			<Skeleton className="h-4 w-5/6" />
			<Skeleton className="h-4 w-4/6" />
			<Skeleton className="h-4 w-full" />
			<Skeleton className="h-4 w-3/4" />
		</div>
	</div>
);

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-6xl px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="mb-6 flex items-center gap-2">
					<Skeleton className="h-4 w-16" />
					<Skeleton className="h-4 w-4" />
					<Skeleton className="h-4 w-24" />
					<Skeleton className="h-4 w-4" />
					<Skeleton className="h-4 w-32" />
				</div>

				<div className="grid gap-8 @lg:grid-cols-2">
					<ImageGallerySkeleton />
					<ProductInfoSkeleton />
				</div>

				<div className="mt-12">
					<TabsSkeleton />
				</div>

				<div className="mt-12 space-y-4">
					<Skeleton className="h-8 w-40" />
					<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-4">
						{[...Array(4)].map((_, i) => (
							<div key={i} className="rounded-lg border bg-card p-4">
								<Skeleton className="mb-4 aspect-square w-full rounded-lg" />
								<Skeleton className="mb-2 h-5 w-3/4" />
								<Skeleton className="h-6 w-16" />
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
