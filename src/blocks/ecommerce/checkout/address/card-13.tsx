'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	MapPin,
	Star,
	ChevronRight,
	Sparkles,
	Clock,
} from 'lucide-react';

interface AddressProps {
	id: string;
	label: string;
	name: string;
	address: string;
	image?: string;
	initials: string;
	isPrimary?: boolean;
	isRecent?: boolean;
	lastUsed?: string;
}

const HeaderSection = () => (
	<div className="flex flex-col @sm:flex-row items-start @sm:items-center justify-between gap-4 mb-8">
		<div>
			<h1 className="text-2xl @md:text-3xl font-bold">
				Select Address
			</h1>
			<p className="text-muted-foreground mt-1">
				Choose your delivery destination
			</p>
		</div>
		<Button variant="outline" className="gap-2">
			<MapPin className="size-4" />
			Find nearby pickup
		</Button>
	</div>
);

const AddressRow = ({
	id,
	label,
	name,
	address,
	image,
	initials,
	isPrimary,
	isRecent,
	lastUsed,
}: AddressProps) => (
	<label className="block cursor-pointer group">
		<Card className="transition-all hover:shadow-md has-[:checked]:ring-2 has-[:checked]:ring-primary has-[:checked]:bg-primary/5">
			<CardContent className="py-4">
				<div className="flex items-center gap-4">
					<RadioGroupItem value={id} />

					<Avatar className="size-12 rounded-xl">
						{image && <AvatarImage src={image} />}
						<AvatarFallback className="rounded-xl bg-primary/10 text-primary text-sm font-semibold">
							{initials}
						</AvatarFallback>
					</Avatar>

					<div className="flex-1 min-w-0">
						<div className="flex items-center gap-2 mb-0.5">
							<span className="font-semibold">{label}</span>
							{isPrimary && (
								<Badge variant="secondary" className="text-xs gap-1">
									<Star className="size-2.5 fill-current" />
									Primary
								</Badge>
							)}
							{isRecent && (
								<Badge variant="outline" className="text-xs gap-1">
									<Sparkles className="size-2.5" />
									Recent
								</Badge>
							)}
						</div>
						<p className="text-sm font-medium">{name}</p>
						<div className="flex items-center gap-1 text-sm text-muted-foreground">
							<MapPin className="size-3" />
							<span className="truncate">{address}</span>
						</div>
						{lastUsed && (
							<div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
								<Clock className="size-3" />
								<span>Last used: {lastUsed}</span>
							</div>
						)}
					</div>

					<ChevronRight className="size-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
				</div>
			</CardContent>
		</Card>
	</label>
);

const QuickActions = () => (
	<div className="grid @sm:grid-cols-2 gap-4 mt-6">
		<Card className="border-2 border-dashed hover:border-primary/40 transition-colors cursor-pointer">
			<CardContent className="py-6 text-center">
				<p className="font-medium">+ Add New Address</p>
			</CardContent>
		</Card>
		<Card className="border-2 border-dashed hover:border-primary/40 transition-colors cursor-pointer">
			<CardContent className="py-6 text-center">
				<p className="font-medium">📍 Use Current Location</p>
			</CardContent>
		</Card>
	</div>
);

export default function Main() {
	const addresses = [
		{
			id: '1',
			label: 'Home',
			name: 'John Doe',
			address: '123 Main Street, Apt 4B, San Francisco, CA 94102',
			initials: 'HM',
			isPrimary: true,
			lastUsed: '2 days ago',
		},
		{
			id: '2',
			label: 'Office',
			name: 'John Doe',
			address: '456 Market Street, Suite 100, San Francisco, CA 94103',
			initials: 'OF',
			isRecent: true,
			lastUsed: 'Yesterday',
		},
		{
			id: '3',
			label: 'Parents',
			name: 'Jane & Robert Doe',
			address: '789 Oak Avenue, Los Angeles, CA 90001',
			initials: 'PR',
			lastUsed: '2 weeks ago',
		},
	];

	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<HeaderSection />

				<RadioGroup defaultValue="1" className="space-y-3">
					{addresses.map((addr) => (
						<AddressRow key={addr.id} {...addr} />
					))}
				</RadioGroup>

				<QuickActions />

				<div className="flex gap-3 mt-8">
					<Button variant="outline" size="lg" className="flex-1">
						Back
					</Button>
					<Button size="lg" className="flex-1">
						Deliver Here
					</Button>
				</div>
			</div>
		</section>
	);
}
