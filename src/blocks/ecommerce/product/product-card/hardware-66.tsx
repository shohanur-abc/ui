import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Cpu,
	Heart,
	HardDrive,
	ShoppingCart,
	Star,
	Monitor,
	Zap,
	Gauge,
} from 'lucide-react';
import Image from 'next/image';

interface HardwareProps {
	image: string;
	name: string;
	brand: string;
	price: number;
	rating: number;
	reviews: number;
	category: string;
	specs: { icon: string; label: string; value: string }[];
	compatibility: string[];
	warranty: string;
}

const HardwareImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 to-slate-800">
		<Image
			src={src}
			alt={alt}
			fill
			className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
		/>
		<Button
			size="icon-sm"
			variant="ghost"
			className="absolute right-3 top-3 text-white/70 hover:bg-white/10 hover:text-white"
		>
			<Heart className="size-4" />
		</Button>
	</div>
);

const CategoryBadge = ({ text }: { text: string }) => (
	<Badge variant="secondary" className="gap-1 text-xs">
		<Cpu className="size-3" />
		{text}
	</Badge>
);

const BrandLabel = ({ text }: { text: string }) => (
	<span className="text-xs font-bold uppercase tracking-wider text-primary">
		{text}
	</span>
);

const HardwareName = ({ text }: { text: string }) => (
	<h3 className="font-semibold text-foreground">{text}</h3>
);

const HardwareRating = ({
	rating,
	reviews,
}: {
	rating: number;
	reviews: number;
}) => (
	<div className="flex items-center gap-1.5">
		<Star className="size-4 fill-yellow-400 text-yellow-400" />
		<span className="font-medium">{rating.toFixed(1)}</span>
		<span className="text-sm text-muted-foreground">
			({reviews.toLocaleString()})
		</span>
	</div>
);

const SpecsGrid = ({
	specs,
}: {
	specs: { icon: string; label: string; value: string }[];
}) => {
	const iconMap: Record<string, React.ReactNode> = {
		memory: <HardDrive className="size-4" />,
		speed: <Gauge className="size-4" />,
		power: <Zap className="size-4" />,
		display: <Monitor className="size-4" />,
	};
	return (
		<div className="grid grid-cols-2 gap-2">
			{specs.map((spec, i) => (
				<div
					key={i}
					className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2"
				>
					<span className="text-primary">
						{iconMap[spec.icon] || <Cpu className="size-4" />}
					</span>
					<div className="text-xs">
						<p className="text-muted-foreground">{spec.label}</p>
						<p className="font-medium text-foreground">{spec.value}</p>
					</div>
				</div>
			))}
		</div>
	);
};

const CompatibilityList = ({ items }: { items: string[] }) => (
	<div className="flex flex-wrap gap-1.5">
		{items.map((item, i) => (
			<Badge key={i} variant="outline" className="text-xs">
				{item}
			</Badge>
		))}
	</div>
);

const PriceTag = ({ amount }: { amount: number }) => (
	<span className="text-xl font-bold text-foreground">
		${amount.toFixed(2)}
	</span>
);

const AddButton = ({ label }: { label: string }) => (
	<Button className="gap-2">
		<ShoppingCart className="size-4" />
		{label}
	</Button>
);

export default function Main() {
	const hardware: HardwareProps = {
		image:
			'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=400&fit=crop',
		name: 'RTX 4080 Super Gaming',
		brand: 'NVIDIA',
		price: 999.99,
		rating: 4.9,
		reviews: 2341,
		category: 'Graphics Card',
		specs: [
			{ icon: 'memory', label: 'VRAM', value: '16GB GDDR6X' },
			{ icon: 'speed', label: 'Clock', value: '2.5 GHz' },
			{ icon: 'power', label: 'TDP', value: '320W' },
			{ icon: 'display', label: 'Outputs', value: '4x HDMI/DP' },
		],
		compatibility: ['PCIe 4.0', 'Windows 11', 'VR Ready'],
		warranty: '3-Year Warranty',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-xs px-4 py-8">
				<Card className="group overflow-hidden border-primary/20">
					<HardwareImage src={hardware.image} alt={hardware.name} />
					<div className="space-y-3 p-4">
						<div className="flex items-center justify-between">
							<CategoryBadge text={hardware.category} />
							<HardwareRating
								rating={hardware.rating}
								reviews={hardware.reviews}
							/>
						</div>
						<BrandLabel text={hardware.brand} />
						<HardwareName text={hardware.name} />
						<SpecsGrid specs={hardware.specs} />
						<CompatibilityList items={hardware.compatibility} />
						<Separator />
						<div className="flex items-center justify-between">
							<PriceTag amount={hardware.price} />
							<AddButton label="Add" />
						</div>
					</div>
				</Card>
			</div>
		</section>
	);
}
