'use client';

import * as React from 'react';
import {
	Image as ImageIcon,
	X,
	ChevronLeft,
	ChevronRight,
	ZoomIn,
	ZoomOut,
	RotateCw,
	Download,
	Maximize2,
	Grid,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';

interface ImageData {
	id: string;
	alt: string;
	isPrimary: boolean;
}

interface ImageViewerControlsProps {
	zoom: number;
	rotation: number;
	onZoomChange: (zoom: number) => void;
	onRotate: () => void;
	onDownload: () => void;
}

const ImageViewerControls = ({
	zoom,
	rotation,
	onZoomChange,
	onRotate,
	onDownload,
}: ImageViewerControlsProps) => (
	<div className="flex items-center gap-4 rounded-lg border bg-background/80 p-2 backdrop-blur">
		<Button
			variant="ghost"
			size="icon"
			onClick={() => onZoomChange(Math.max(50, zoom - 25))}
		>
			<ZoomOut className="size-4" />
		</Button>
		<div className="flex items-center gap-2">
			<Slider
				value={[zoom]}
				onValueChange={(v) => onZoomChange(v[0])}
				min={50}
				max={200}
				step={25}
				className="w-24"
			/>
			<span className="w-12 text-sm">{zoom}%</span>
		</div>
		<Button
			variant="ghost"
			size="icon"
			onClick={() => onZoomChange(Math.min(200, zoom + 25))}
		>
			<ZoomIn className="size-4" />
		</Button>
		<div className="h-6 w-px bg-border" />
		<Button variant="ghost" size="icon" onClick={onRotate}>
			<RotateCw className="size-4" />
		</Button>
		<Button variant="ghost" size="icon" onClick={onDownload}>
			<Download className="size-4" />
		</Button>
	</div>
);

interface LightboxGalleryProps {
	images: ImageData[];
	initialIndex: number;
	trigger: React.ReactNode;
}

const LightboxGallery = ({
	images,
	initialIndex,
	trigger,
}: LightboxGalleryProps) => {
	const [open, setOpen] = React.useState(false);
	const [activeIndex, setActiveIndex] = React.useState(initialIndex);
	const [zoom, setZoom] = React.useState(100);
	const [rotation, setRotation] = React.useState(0);

	const goToNext = () => {
		setActiveIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
		setZoom(100);
		setRotation(0);
	};

	const goToPrev = () => {
		setActiveIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
		setZoom(100);
		setRotation(0);
	};

	const handleRotate = () => {
		setRotation((prev) => (prev + 90) % 360);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className="max-w-5xl p-0">
				<div className="relative flex h-[80vh] flex-col">
					<div className="absolute left-4 top-4 z-10 flex items-center gap-2">
						<Badge variant="secondary">
							{activeIndex + 1} / {images.length}
						</Badge>
						{images[activeIndex].isPrimary && <Badge>Primary</Badge>}
					</div>

					<div className="flex flex-1 items-center justify-center bg-black/90 p-8">
						<Button
							variant="ghost"
							size="icon"
							className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
							onClick={goToPrev}
						>
							<ChevronLeft className="size-8" />
						</Button>

						<div
							className="flex items-center justify-center transition-transform duration-200"
							style={{
								transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
							}}
						>
							<div className="flex size-96 items-center justify-center rounded-lg bg-muted text-8xl">
								📷
							</div>
						</div>

						<Button
							variant="ghost"
							size="icon"
							className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
							onClick={goToNext}
						>
							<ChevronRight className="size-8" />
						</Button>
					</div>

					<div className="absolute bottom-4 left-1/2 -translate-x-1/2">
						<ImageViewerControls
							zoom={zoom}
							rotation={rotation}
							onZoomChange={setZoom}
							onRotate={handleRotate}
							onDownload={() => console.log('Download image')}
						/>
					</div>

					<div className="absolute bottom-20 left-1/2 flex -translate-x-1/2 gap-2 rounded-lg border bg-background/80 p-2 backdrop-blur">
						{images.map((image, idx) => (
							<button
								key={image.id}
								onClick={() => {
									setActiveIndex(idx);
									setZoom(100);
									setRotation(0);
								}}
								className={`flex size-12 items-center justify-center rounded-lg bg-muted text-xl transition-all ${idx === activeIndex ? 'ring-2 ring-primary' : 'opacity-60 hover:opacity-100'}`}
							>
								📷
							</button>
						))}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

interface ImageGridProps {
	images: ImageData[];
	onImageClick: (index: number) => void;
}

const ImageGrid = ({ images, onImageClick }: ImageGridProps) => (
	<div className="grid gap-2 @sm:grid-cols-3 @lg:grid-cols-4">
		{images.map((image, idx) => (
			<button
				key={image.id}
				onClick={() => onImageClick(idx)}
				className="group relative aspect-square overflow-hidden rounded-lg bg-muted"
			>
				<div className="flex size-full items-center justify-center text-4xl">
					📷
				</div>
				{image.isPrimary && (
					<Badge className="absolute left-2 top-2">Primary</Badge>
				)}
				<div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
					<Maximize2 className="size-8 text-white" />
				</div>
			</button>
		))}
	</div>
);

interface CompareImagesProps {
	images: ImageData[];
}

const CompareImages = ({ images }: CompareImagesProps) => {
	const [selectedImages, setSelectedImages] = React.useState<string[]>([]);

	const toggleImage = (id: string) => {
		setSelectedImages((prev) =>
			prev.includes(id)
				? prev.filter((i) => i !== id)
				: prev.length < 2
					? [...prev, id]
					: [prev[1], id],
		);
	};

	const selected = images.filter((img) => selectedImages.includes(img.id));

	return (
		<div className="space-y-4">
			<div className="flex items-center gap-2">
				<Grid className="size-4" />
				<span className="font-medium">Compare Images</span>
				<Badge variant="secondary">{selectedImages.length}/2 selected</Badge>
			</div>

			<div className="flex gap-2 overflow-x-auto">
				{images.map((image) => (
					<button
						key={image.id}
						onClick={() => toggleImage(image.id)}
						className={`flex size-16 shrink-0 items-center justify-center rounded-lg bg-muted text-2xl transition-all ${selectedImages.includes(image.id) ? 'ring-2 ring-primary' : ''}`}
					>
						📷
					</button>
				))}
			</div>

			{selected.length === 2 && (
				<div className="grid grid-cols-2 gap-4">
					{selected.map((image) => (
						<div
							key={image.id}
							className="flex aspect-square items-center justify-center rounded-lg bg-muted text-6xl"
						>
							📷
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default function Main() {
	const images: ImageData[] = [
		{ id: '1', alt: 'Product front view', isPrimary: true },
		{ id: '2', alt: 'Product side view', isPrimary: false },
		{ id: '3', alt: 'Product back view', isPrimary: false },
		{ id: '4', alt: 'Product detail shot', isPrimary: false },
		{ id: '5', alt: 'Product in use', isPrimary: false },
		{ id: '6', alt: 'Product packaging', isPrimary: false },
	];

	const [lightboxIndex, setLightboxIndex] = React.useState(0);

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-4xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="flex items-center gap-3">
					<ImageIcon className="size-5" />
					<h2 className="text-xl font-semibold">Image Gallery</h2>
				</div>

				<div className="rounded-lg border bg-card p-4">
					<h3 className="mb-4 font-medium">Product Images</h3>
					<LightboxGallery
						images={images}
						initialIndex={lightboxIndex}
						trigger={
							<ImageGrid
								images={images}
								onImageClick={(idx) => setLightboxIndex(idx)}
							/>
						}
					/>
				</div>

				<div className="rounded-lg border bg-card p-4">
					<CompareImages images={images} />
				</div>
			</div>
		</section>
	);
}
