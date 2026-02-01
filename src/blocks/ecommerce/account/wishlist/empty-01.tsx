import Link from 'next/link';
import { Heart, Search, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface EmptyProps {
	onBrowse?: () => void;
}

const EmptyHeart = () => (
	<div className="relative">
		<div className="size-32 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
			<Heart className="size-16 text-primary/40" strokeWidth={1.5} />
		</div>
		<div className="absolute -top-2 -right-2 size-8 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
			<Sparkles className="size-4 text-primary" />
		</div>
	</div>
);

export default function Main() {
	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-lg px-4 @sm:px-6 py-12 @md:py-20">
				<div className="flex flex-col items-center text-center">
					<EmptyHeart />
					<h1 className="text-2xl font-bold mt-8">Your wishlist is empty</h1>
					<p className="text-muted-foreground mt-2 max-w-sm">
						Start adding items you love to your wishlist. We'll save them here
						for you.
					</p>

					<div className="w-full max-w-sm mt-8">
						<div className="relative">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
							<Input placeholder="Search for products..." className="pl-10" />
						</div>
					</div>

					<div className="flex flex-col @sm:flex-row gap-3 mt-6">
						<Button size="lg" className="gap-2">
							Start Shopping
							<ArrowRight className="size-4" />
						</Button>
						<Button size="lg" variant="outline">
							View Recommendations
						</Button>
					</div>

					<div className="mt-12 pt-8 border-t w-full">
						<p className="text-sm text-muted-foreground mb-4">
							Popular categories
						</p>
						<div className="flex flex-wrap justify-center gap-2">
							{['Electronics', 'Fashion', 'Home', 'Beauty', 'Sports'].map(
								(category) => (
									<Button
										key={category}
										variant="outline"
										size="sm"
										className="rounded-full"
									>
										{category}
									</Button>
								),
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
