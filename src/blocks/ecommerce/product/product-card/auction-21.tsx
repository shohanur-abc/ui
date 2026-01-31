import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Clock, Gavel, User } from 'lucide-react';
import Image from 'next/image';

interface AuctionProps {
	image: string;
	name: string;
	currentBid: number;
	bidCount: number;
	timeLeft: { hours: number; minutes: number; seconds: number };
	topBidder: string;
	reserveMet: boolean;
}

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
		<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
			<Badge
				variant="secondary"
				className="gap-1.5 bg-white/10 text-white backdrop-blur-sm"
			>
				<Gavel className="size-3" />
				Live Auction
			</Badge>
		</div>
	</div>
);

const ProductName = ({ text }: { text: string }) => (
	<h3 className="font-semibold text-foreground">{text}</h3>
);

const CurrentBid = ({ amount, bids }: { amount: number; bids: number }) => (
	<div className="space-y-1">
		<p className="text-xs uppercase tracking-wider text-muted-foreground">
			Current Bid
		</p>
		<div className="flex items-baseline gap-2">
			<span className="text-2xl font-bold text-primary">
				${amount.toLocaleString()}
			</span>
			<span className="text-sm text-muted-foreground">({bids} bids)</span>
		</div>
	</div>
);

const TimeRemaining = ({
	hours,
	minutes,
	seconds,
}: {
	hours: number;
	minutes: number;
	seconds: number;
}) => (
	<div className="flex items-center gap-2">
		<Clock className="size-4 text-destructive" />
		<div className="flex gap-1 font-mono text-sm">
			<span className="rounded bg-destructive/10 px-1.5 py-0.5 text-destructive">
				{hours.toString().padStart(2, '0')}h
			</span>
			<span className="rounded bg-destructive/10 px-1.5 py-0.5 text-destructive">
				{minutes.toString().padStart(2, '0')}m
			</span>
			<span className="rounded bg-destructive/10 px-1.5 py-0.5 text-destructive">
				{seconds.toString().padStart(2, '0')}s
			</span>
		</div>
	</div>
);

const TopBidder = ({ name }: { name: string }) => (
	<div className="flex items-center gap-2 text-sm text-muted-foreground">
		<User className="size-4" />
		<span>Top bidder: {name}</span>
	</div>
);

const ReserveStatus = ({ met }: { met: boolean }) => (
	<Badge variant={met ? 'default' : 'outline'} className="text-xs">
		{met ? 'Reserve Met' : 'Reserve Not Met'}
	</Badge>
);

const BidButton = ({ label }: { label: string }) => (
	<Button className="w-full gap-2" size="lg">
		<Gavel className="size-4" />
		{label}
	</Button>
);

export default function Main() {
	const auction: AuctionProps = {
		image:
			'https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=400&h=300&fit=crop',
		name: 'Vintage Rolex Submariner 1967',
		currentBid: 24500,
		bidCount: 47,
		timeLeft: { hours: 2, minutes: 34, seconds: 12 },
		topBidder: 'collector_89',
		reserveMet: true,
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-sm px-4 py-8">
				<Card className="space-y-4 p-4">
					<ProductImage src={auction.image} alt={auction.name} />
					<div className="space-y-3">
						<ProductName text={auction.name} />
						<div className="flex items-center justify-between">
							<CurrentBid amount={auction.currentBid} bids={auction.bidCount} />
							<ReserveStatus met={auction.reserveMet} />
						</div>
						<TimeRemaining {...auction.timeLeft} />
						<TopBidder name={auction.topBidder} />
					</div>
					<BidButton label="Place Bid" />
				</Card>
			</div>
		</section>
	);
}
