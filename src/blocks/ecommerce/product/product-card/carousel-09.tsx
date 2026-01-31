import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Expand, Heart, Share2 } from 'lucide-react';
import Image from 'next/image';

interface ProductProps {
	images: string[];
	name: string;
	category: string;
	price: number;
	currentImage: number;
}

const ImageGallery = ({
	images,
	current,
	alt,
}: {
	images: string[];
	current: number;
	alt: string;
}) => (
	<div className="relative aspect-square overflow-hidden bg-muted">
		<Image src={images[current]} alt={alt} fill className="object-cover" />
		<div className="absolute inset-x-0 top-4 flex justify-between px-4">
			<Button
				size="icon-sm"
				variant="secondary"
				className="bg-background/80 backdrop-blur-sm"
			>
				<Share2 className="size-4" />
			</Button>
			<Button
				size="icon-sm"
				variant="secondary"
				className="bg-background/80 backdrop-blur-sm"
			>
				<Heart className="size-4" />
			</Button>
		</div>
		<Button
			size="icon-sm"
			variant="secondary"
			className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm"
		>
			<Expand className="size-4" />
		</Button>
		<div className="absolute inset-y-0 left-2 flex items-center">
			<Button
				size="icon-sm"
				variant="secondary"
				className="bg-background/80 backdrop-blur-sm"
			>
				<ChevronLeft className="size-4" />
			</Button>
		</div>
		<div className="absolute inset-y-0 right-2 flex items-center">
			<Button
				size="icon-sm"
				variant="secondary"
				className="bg-background/80 backdrop-blur-sm"
			>
				<ChevronRight className="size-4" />
			</Button>
		</div>
	</div>
);

const ThumbnailStrip = ({
	images,
	current,
}: {
	images: string[];
	current: number;
}) => (
	<div className="flex gap-2 px-4">
		{images.map((img, i) => (
			<button
				key={i}
				className={`relative size-14 overflow-hidden rounded-md border-2 transition-all ${
					i === current
						? 'border-primary ring-2 ring-primary/30'
						: 'border-transparent opacity-60 hover:opacity-100'
				}`}
			>
				<Image
					src={img}
					alt={`Thumbnail ${i + 1}`}
					fill
					className="object-cover"
				/>
			</button>
		))}
	</div>
);

const ProductCategory = ({ text }: { text: string }) => (
	<Badge variant="outline" className="text-xs">
		{text}
	</Badge>
);

const ProductName = ({ text }: { text: string }) => (
	<h3 className="text-xl font-bold text-foreground">{text}</h3>
);

const ProductPrice = ({ amount }: { amount: number }) => (
	<span className="text-2xl font-bold text-primary">${amount.toFixed(2)}</span>
);

const ActionButton = ({ label }: { label: string }) => (
	<Button className="flex-1">{label}</Button>
);

export default function Main() {
	const product: ProductProps = {
		images: [
			'https://images.unsplash.com/photo-1491553895911-0055uj8d0-as?w=400&h=400&fit=crop',
			'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop',
			'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=400&fit=crop',
			'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop',
		],
		name: 'Urban Street Sneakers',
		category: 'Footwear',
		price: 179.99,
		currentImage: 0,
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-sm px-4 py-8">
				<Card className="overflow-hidden">
					<ImageGallery
						images={product.images}
						current={product.currentImage}
						alt={product.name}
					/>
					<div className="space-y-4 py-4">
						<ThumbnailStrip
							images={product.images}
							current={product.currentImage}
						/>
						<div className="space-y-2 px-4">
							<ProductCategory text={product.category} />
							<ProductName text={product.name} />
							<ProductPrice amount={product.price} />
						</div>
						<div className="flex gap-2 px-4">
							<ActionButton label="Add to Cart" />
						</div>
					</div>
				</Card>
			</div>
		</section>
	);
}
