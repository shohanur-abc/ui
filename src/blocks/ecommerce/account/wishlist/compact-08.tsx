import Link from 'next/link';
import { ShoppingCart, Share2, Copy, Check, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	href: string;
}

interface CompactProps {
	items: WishlistItem[];
}

const ShareablePreview = ({ items }: CompactProps) => (
	<div className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border">
		<div className="flex items-center justify-between mb-3">
			<h2 className="font-semibold">My Wishlist</h2>
			<Badge variant="secondary">{items.length} items</Badge>
		</div>
		<div className="flex gap-2 overflow-x-auto pb-2">
			{items.slice(0, 6).map((item) => (
				<div
					key={item.id}
					className="size-12 rounded-lg overflow-hidden bg-muted flex-shrink-0"
				>
					<img
						src={item.image}
						alt={item.name}
						className="size-full object-cover"
					/>
				</div>
			))}
			{items.length > 6 && (
				<div className="size-12 rounded-lg bg-muted flex items-center justify-center text-sm font-medium flex-shrink-0">
					+{items.length - 6}
				</div>
			)}
		</div>
		<p className="text-sm text-muted-foreground mt-2">
			Total value: $
			{items.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
		</p>
	</div>
);

const ShareLink = () => (
	<div className="mt-4">
		<label className="text-sm font-medium mb-2 block">Share Link</label>
		<div className="flex gap-2">
			<div className="flex-1 relative">
				<Link2 className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
				<Input
					value="wishlist.co/share/abc123"
					readOnly
					className="pl-9 text-sm"
				/>
			</div>
			<Button variant="outline" size="icon">
				<Copy className="size-4" />
			</Button>
		</div>
	</div>
);

const ShareButtons = () => (
	<div className="flex gap-2 mt-4">
		<Button variant="outline" className="flex-1 gap-2">
			<svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
				<path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
			</svg>
			Twitter
		</Button>
		<Button variant="outline" className="flex-1 gap-2">
			<svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
				<path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
			</svg>
			Facebook
		</Button>
		<Button variant="outline" className="flex-1 gap-2">
			<svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
				<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667h-3.554v-11.452h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zm-15.11-13.019c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019h-3.564v-11.452h3.564v11.452zm15.106-20.452h-20.454c-.979 0-1.771.774-1.771 1.729v20.542c0 .956.792 1.729 1.771 1.729h20.451c.978 0 1.778-.773 1.778-1.729v-20.542c0-.955-.8-1.729-1.778-1.729z" />
			</svg>
			LinkedIn
		</Button>
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{
			id: '1',
			name: 'Yoga Mat',
			price: 45,
			image:
				'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=100&h=100&fit=crop',
			href: '/product/1',
		},
		{
			id: '2',
			name: 'Dumbbells',
			price: 89,
			image:
				'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=100&h=100&fit=crop',
			href: '/product/2',
		},
		{
			id: '3',
			name: 'Resistance Bands',
			price: 25,
			image:
				'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=100&h=100&fit=crop',
			href: '/product/3',
		},
		{
			id: '4',
			name: 'Foam Roller',
			price: 35,
			image:
				'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=100&h=100&fit=crop',
			href: '/product/4',
		},
		{
			id: '5',
			name: 'Jump Rope',
			price: 15,
			image:
				'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=100&h=100&fit=crop',
			href: '/product/5',
		},
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-md px-4 py-6">
				<div className="flex items-center gap-2 mb-4">
					<Share2 className="size-5 text-primary" />
					<h1 className="text-lg font-bold">Share Wishlist</h1>
				</div>
				<ShareablePreview items={wishlistItems} />
				<ShareLink />
				<ShareButtons />
			</div>
		</section>
	);
}
