'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
	MapPin,
	Home,
	Building2,
	Star,
	Sparkles,
	Shield,
	Leaf,
} from 'lucide-react';

interface AddressProps {
	id: string;
	icon: React.ElementType;
	iconBg: string;
	label: string;
	name: string;
	address: string;
	tags: string[];
	isRecommended?: boolean;
	isSelected?: boolean;
}

interface TagProps {
	label: string;
}

const PageHeader = () => (
	<div className="text-center mb-10">
		<div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
			<Sparkles className="size-4" />
			Secure Checkout
		</div>
		<h1 className="text-3xl @md:text-4xl font-bold mb-2">
			Where are we delivering?
		</h1>
		<p className="text-muted-foreground">
			Pick from your saved addresses or add a new one
		</p>
	</div>
);

const Tag = ({ label }: TagProps) => (
	<Badge variant="outline" className="text-xs font-normal">
		{label}
	</Badge>
);

const AddressCard = ({
	id,
	icon: Icon,
	iconBg,
	label,
	name,
	address,
	tags,
	isRecommended,
	isSelected,
}: AddressProps) => (
	<Card
		className={`relative cursor-pointer transition-all ${
			isSelected
				? 'ring-2 ring-primary shadow-xl shadow-primary/10'
				: 'hover:shadow-lg'
		}`}
	>
		{isRecommended && (
			<div className="absolute -top-3 left-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-0.5 rounded-full text-xs font-medium flex items-center gap-1">
				<Star className="size-3 fill-current" />
				Recommended
			</div>
		)}
		<CardContent className="pt-8">
			<div className="flex items-start gap-4">
				<div
					className={`size-12 rounded-xl flex items-center justify-center ${iconBg}`}
				>
					<Icon className="size-6" />
				</div>
				<div className="flex-1 min-w-0">
					<div className="flex items-center gap-2 mb-1">
						<span className="font-semibold text-lg">{label}</span>
					</div>
					<p className="font-medium text-sm">{name}</p>
					<div className="flex items-start gap-2 text-sm text-muted-foreground mt-1">
						<MapPin className="size-3.5 shrink-0 mt-0.5" />
						<span>{address}</span>
					</div>
				</div>
			</div>

			<div className="flex flex-wrap gap-1.5 mt-4">
				{tags.map((tag) => (
					<Tag key={tag} label={tag} />
				))}
			</div>
		</CardContent>
		<CardFooter className="pt-0 justify-between">
			<Button variant="ghost" size="sm">
				Edit
			</Button>
			{isSelected ? (
				<Badge className="gap-1">
					<Shield className="size-3" />
					Selected
				</Badge>
			) : (
				<Button variant="outline" size="sm">
					Select
				</Button>
			)}
		</CardFooter>
	</Card>
);

const Options = () => (
	<Card className="mt-6 bg-muted/20">
		<CardContent className="py-6 space-y-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Leaf className="size-5 text-green-500" />
					<div>
						<Label className="font-medium">Carbon Neutral Delivery</Label>
						<p className="text-sm text-muted-foreground">
							We offset the carbon footprint of your delivery
						</p>
					</div>
				</div>
				<Switch defaultChecked />
			</div>
			<Separator />
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Shield className="size-5 text-blue-500" />
					<div>
						<Label className="font-medium">Signature Required</Label>
						<p className="text-sm text-muted-foreground">
							Someone must sign for the package
						</p>
					</div>
				</div>
				<Switch />
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const addresses = [
		{
			id: '1',
			icon: Home,
			iconBg: 'bg-blue-500/10 text-blue-500',
			label: 'Home',
			name: 'John Doe',
			address: '123 Main Street, Apt 4B, San Francisco, CA 94102',
			tags: ['Free Shipping', 'Same-Day Available', 'Carbon Neutral'],
			isRecommended: true,
			isSelected: true,
		},
		{
			id: '2',
			icon: Building2,
			iconBg: 'bg-purple-500/10 text-purple-500',
			label: 'Office',
			name: 'John Doe - Acme Inc.',
			address: '456 Market Street, Suite 100, San Francisco, CA 94103',
			tags: ['Next-Day Available', 'Reception Available'],
		},
	];

	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<PageHeader />

				<div className="grid @md:grid-cols-2 gap-6">
					{addresses.map((addr) => (
						<AddressCard key={addr.id} {...addr} />
					))}
				</div>

				<Button variant="outline" className="w-full mt-4 gap-2">
					<MapPin className="size-4" />
					Add New Address
				</Button>

				<Options />

				<div className="flex gap-3 mt-8">
					<Button variant="outline" size="lg" className="flex-1">
						Back
					</Button>
					<Button size="lg" className="flex-1">
						Continue to Shipping
					</Button>
				</div>
			</div>
		</section>
	);
}
