'use client';

import * as React from 'react';
import {
	Search,
	Eye,
	X,
	ChevronLeft,
	ChevronRight,
	ZoomIn,
	ZoomOut,
	RotateCw,
	ShoppingCart,
	Star,
	ExternalLink,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

interface ProductDetail {
	id: string;
	name: string;
	sku: string;
	price: number;
	comparePrice?: number;
	description: string;
	images: string[];
	status: 'active' | 'draft' | 'archived';
	stock: number;
	rating: number;
	reviews: number;
	category: string;
	tags: string[];
}

interface QuickViewModalProps {
	isOpen: boolean;
	onClose: () => void;
	product: ProductDetail | null;
	onEdit: () => void;
	labels: {
		inStock: string;
		outOfStock: string;
		reviews: string;
		addToCart: string;
		edit: string;
		viewFull: string;
	};
}

const QuickViewModal = ({
	isOpen,
	onClose,
	product,
	onEdit,
	labels,
}: QuickViewModalProps) => {
	const [currentImage, setCurrentImage] = React.useState(0);

	if (!product) return null;

	const discount = product.comparePrice
		? Math.round((1 - product.price / product.comparePrice) * 100)
		: 0;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-3xl">
				<DialogHeader>
					<DialogTitle className="sr-only">{product.name}</DialogTitle>
				</DialogHeader>

				<div className="grid gap-6 @md:grid-cols-2">
					<div className="space-y-3">
						<div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
							<div className="absolute inset-0 flex items-center justify-center text-4xl">
								📦
							</div>
							{product.images.length > 1 && (
								<>
									<Button
										variant="secondary"
										size="icon"
										className="absolute left-2 top-1/2 -translate-y-1/2"
										onClick={() =>
											setCurrentImage((prev) =>
												prev === 0 ? product.images.length - 1 : prev - 1,
											)
										}
									>
										<ChevronLeft className="size-4" />
									</Button>
									<Button
										variant="secondary"
										size="icon"
										className="absolute right-2 top-1/2 -translate-y-1/2"
										onClick={() =>
											setCurrentImage((prev) =>
												prev === product.images.length - 1 ? 0 : prev + 1,
											)
										}
									>
										<ChevronRight className="size-4" />
									</Button>
								</>
							)}
						</div>
						<div className="flex gap-2 overflow-x-auto">
							{product.images.map((_, idx) => (
								<button
									key={idx}
									onClick={() => setCurrentImage(idx)}
									className={`size-16 shrink-0 rounded-md bg-muted ${idx === currentImage ? 'ring-2 ring-primary' : ''}`}
								/>
							))}
						</div>
					</div>

					<div className="space-y-4">
						<div>
							<div className="mb-2 flex items-center gap-2">
								<Badge
									variant="secondary"
									className={
										product.status === 'active'
											? 'bg-emerald-500/10 text-emerald-500'
											: 'bg-amber-500/10 text-amber-500'
									}
								>
									{product.status}
								</Badge>
								<span className="text-sm text-muted-foreground">
									{product.sku}
								</span>
							</div>
							<h2 className="text-xl font-bold">{product.name}</h2>
						</div>

						<div className="flex items-center gap-3">
							<div className="flex items-center gap-1">
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										className={`size-4 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-muted'}`}
									/>
								))}
							</div>
							<span className="text-sm text-muted-foreground">
								{product.rating} ({product.reviews} {labels.reviews})
							</span>
						</div>

						<div className="flex items-baseline gap-3">
							<span className="text-2xl font-bold">
								${product.price.toFixed(2)}
							</span>
							{product.comparePrice && (
								<>
									<span className="text-lg text-muted-foreground line-through">
										${product.comparePrice.toFixed(2)}
									</span>
									<Badge variant="destructive">-{discount}%</Badge>
								</>
							)}
						</div>

						<p className="text-sm text-muted-foreground">
							{product.description}
						</p>

						<div className="flex items-center gap-2">
							<div
								className={`size-2 rounded-full ${product.stock > 0 ? 'bg-emerald-500' : 'bg-red-500'}`}
							/>
							<span className="text-sm">
								{product.stock > 0
									? `${product.stock} ${labels.inStock}`
									: labels.outOfStock}
							</span>
						</div>

						<div className="flex flex-wrap gap-1">
							{product.tags.map((tag) => (
								<Badge key={tag} variant="outline">
									{tag}
								</Badge>
							))}
						</div>

						<Separator />

						<div className="flex gap-2">
							<Button className="flex-1 gap-2" onClick={onEdit}>
								{labels.edit}
							</Button>
							<Button variant="outline" className="gap-2">
								<ExternalLink className="size-4" />
								{labels.viewFull}
							</Button>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

interface ImageGalleryModalProps {
	isOpen: boolean;
	onClose: () => void;
	images: string[];
	initialIndex: number;
}

const ImageGalleryModal = ({
	isOpen,
	onClose,
	images,
	initialIndex,
}: ImageGalleryModalProps) => {
	const [currentIndex, setCurrentIndex] = React.useState(initialIndex);
	const [zoom, setZoom] = React.useState(1);
	const [rotation, setRotation] = React.useState(0);

	React.useEffect(() => {
		setCurrentIndex(initialIndex);
		setZoom(1);
		setRotation(0);
	}, [initialIndex, isOpen]);

	const handlePrev = () => {
		setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
		setZoom(1);
		setRotation(0);
	};

	const handleNext = () => {
		setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
		setZoom(1);
		setRotation(0);
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-4xl bg-black/95 p-0">
				<DialogHeader className="sr-only">
					<DialogTitle>Image Gallery</DialogTitle>
				</DialogHeader>

				<div className="relative flex aspect-video items-center justify-center">
					<Button
						variant="ghost"
						size="icon"
						className="absolute left-4 text-white hover:bg-white/20"
						onClick={handlePrev}
					>
						<ChevronLeft className="size-6" />
					</Button>

					<div
						className="flex size-full items-center justify-center overflow-hidden"
						style={{
							transform: `scale(${zoom}) rotate(${rotation}deg)`,
							transition: 'transform 0.2s',
						}}
					>
						<div className="flex size-48 items-center justify-center rounded-lg bg-muted/20 text-6xl">
							📷
						</div>
					</div>

					<Button
						variant="ghost"
						size="icon"
						className="absolute right-4 text-white hover:bg-white/20"
						onClick={handleNext}
					>
						<ChevronRight className="size-6" />
					</Button>

					<div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-black/50 p-2">
						<Button
							variant="ghost"
							size="icon-sm"
							className="text-white hover:bg-white/20"
							onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))}
						>
							<ZoomOut className="size-4" />
						</Button>
						<Button
							variant="ghost"
							size="icon-sm"
							className="text-white hover:bg-white/20"
							onClick={() => setZoom((z) => Math.min(3, z + 0.25))}
						>
							<ZoomIn className="size-4" />
						</Button>
						<Button
							variant="ghost"
							size="icon-sm"
							className="text-white hover:bg-white/20"
							onClick={() => setRotation((r) => r + 90)}
						>
							<RotateCw className="size-4" />
						</Button>
					</div>

					<div className="absolute bottom-4 right-4 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
						{currentIndex + 1} / {images.length}
					</div>
				</div>

				<div className="flex gap-2 overflow-x-auto bg-black/80 p-3">
					{images.map((_, idx) => (
						<button
							key={idx}
							onClick={() => {
								setCurrentIndex(idx);
								setZoom(1);
								setRotation(0);
							}}
							className={`size-16 shrink-0 rounded-md bg-muted/30 ${idx === currentIndex ? 'ring-2 ring-primary' : ''}`}
						/>
					))}
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default function Main() {
	const [quickViewOpen, setQuickViewOpen] = React.useState(false);
	const [galleryOpen, setGalleryOpen] = React.useState(false);

	const product: ProductDetail = {
		id: '1',
		name: 'Premium Wireless Headphones',
		sku: 'WHP-PRO-001',
		price: 199.99,
		comparePrice: 249.99,
		description:
			'Experience crystal-clear audio with our top-of-the-line wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort.',
		images: ['', '', '', ''],
		status: 'active',
		stock: 45,
		rating: 4.5,
		reviews: 128,
		category: 'Electronics',
		tags: ['Audio', 'Wireless', 'Premium', 'Noise Cancelling'],
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-2xl space-y-6 px-4 py-8 @sm:px-6">
				<h2 className="text-xl font-semibold">Preview Modals</h2>

				<div className="grid gap-4 @sm:grid-cols-2">
					<div className="rounded-lg border bg-card p-4">
						<h3 className="mb-3 font-medium">Quick View</h3>
						<p className="mb-4 text-sm text-muted-foreground">
							Preview product details in a modal
						</p>
						<Button onClick={() => setQuickViewOpen(true)} className="gap-2">
							<Eye className="size-4" />
							Open Quick View
						</Button>
					</div>

					<div className="rounded-lg border bg-card p-4">
						<h3 className="mb-3 font-medium">Image Gallery</h3>
						<p className="mb-4 text-sm text-muted-foreground">
							Full-screen image viewer with zoom
						</p>
						<Button onClick={() => setGalleryOpen(true)} className="gap-2">
							<ZoomIn className="size-4" />
							Open Gallery
						</Button>
					</div>
				</div>

				<QuickViewModal
					isOpen={quickViewOpen}
					onClose={() => setQuickViewOpen(false)}
					product={product}
					onEdit={() => console.log('Edit')}
					labels={{
						inStock: 'in stock',
						outOfStock: 'Out of stock',
						reviews: 'reviews',
						addToCart: 'Add to Cart',
						edit: 'Edit Product',
						viewFull: 'View Full Page',
					}}
				/>

				<ImageGalleryModal
					isOpen={galleryOpen}
					onClose={() => setGalleryOpen(false)}
					images={product.images}
					initialIndex={0}
				/>
			</div>
		</section>
	);
}
