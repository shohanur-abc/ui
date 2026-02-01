'use client';

import * as React from 'react';
import {
	Package,
	Camera,
	Scan,
	Check,
	X,
	AlertTriangle,
	Plus,
} from 'lucide-react';

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type InspectionItem = {
	id: string;
	name: string;
	result: 'pass' | 'fail' | 'pending';
	notes?: string;
};

type ItemCheckProps = {
	item: InspectionItem;
	onResultChange: (id: string, result: InspectionItem['result']) => void;
	onNotesChange: (id: string, notes: string) => void;
};

const ItemCheck = ({ item, onResultChange, onNotesChange }: ItemCheckProps) => (
	<div className="rounded-lg border p-4 space-y-3">
		<div className="flex items-center justify-between">
			<p className="font-medium">{item.name}</p>
			<div className="flex gap-2">
				<Button
					size="sm"
					variant={item.result === 'pass' ? 'default' : 'outline'}
					className={
						item.result === 'pass' ? 'bg-emerald-500 hover:bg-emerald-600' : ''
					}
					onClick={() => onResultChange(item.id, 'pass')}
				>
					<Check className="mr-1 size-3" />
					Pass
				</Button>
				<Button
					size="sm"
					variant={item.result === 'fail' ? 'default' : 'outline'}
					className={
						item.result === 'fail'
							? 'bg-destructive hover:bg-destructive/90'
							: ''
					}
					onClick={() => onResultChange(item.id, 'fail')}
				>
					<X className="mr-1 size-3" />
					Fail
				</Button>
			</div>
		</div>
		{item.result === 'fail' && (
			<Textarea
				placeholder="Describe the issue..."
				value={item.notes || ''}
				onChange={(e) => onNotesChange(item.id, e.target.value)}
				rows={2}
			/>
		)}
	</div>
);

type ImageUploadProps = {
	images: string[];
	onAdd: () => void;
};

const ImageUpload = ({ images, onAdd }: ImageUploadProps) => (
	<div className="space-y-2">
		<Label>Evidence Photos</Label>
		<div className="flex flex-wrap gap-2">
			{images.map((_, index) => (
				<div
					key={index}
					className="size-20 rounded-lg bg-muted flex items-center justify-center"
				>
					<Camera className="size-6 text-muted-foreground" />
				</div>
			))}
			<button
				onClick={onAdd}
				className="size-20 rounded-lg border-2 border-dashed flex items-center justify-center hover:border-primary transition-colors"
			>
				<Plus className="size-6 text-muted-foreground" />
			</button>
		</div>
	</div>
);

export default function Main() {
	const [poNumber, setPoNumber] = React.useState('PO-2024-001');
	const [condition, setCondition] = React.useState('good');
	const [items, setItems] = React.useState<InspectionItem[]>([
		{ id: '1', name: 'Packaging Intact', result: 'pass' },
		{ id: '2', name: 'Quantity Matches PO', result: 'pass' },
		{ id: '3', name: 'Product Condition', result: 'pending' },
		{ id: '4', name: 'Labels/Barcodes Correct', result: 'pending' },
		{ id: '5', name: 'Expiry Dates Valid', result: 'pending' },
	]);
	const [images, setImages] = React.useState<string[]>([]);

	const handleResultChange = (id: string, result: InspectionItem['result']) => {
		setItems((prev) =>
			prev.map((item) => (item.id === id ? { ...item, result } : item)),
		);
	};

	const handleNotesChange = (id: string, notes: string) => {
		setItems((prev) =>
			prev.map((item) => (item.id === id ? { ...item, notes } : item)),
		);
	};

	const passCount = items.filter((i) => i.result === 'pass').length;
	const failCount = items.filter((i) => i.result === 'fail').length;
	const pendingCount = items.filter((i) => i.result === 'pending').length;

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<CardHeader>
						<CardTitle className="text-xl @lg:text-2xl">
							Receiving Inspection
						</CardTitle>
						<CardDescription>
							Quality check for incoming shipments
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-4 @lg:grid-cols-3">
							<div className="space-y-2">
								<Label>PO / Reference Number</Label>
								<div className="relative">
									<Input
										value={poNumber}
										onChange={(e) => setPoNumber(e.target.value)}
										placeholder="Scan or enter PO number"
									/>
									<Button
										variant="ghost"
										size="icon"
										className="absolute right-1 top-1/2 -translate-y-1/2"
									>
										<Scan className="size-4" />
									</Button>
								</div>
							</div>
							<div className="space-y-2">
								<Label>Inspector</Label>
								<Input value="John Smith" readOnly className="bg-muted" />
							</div>
							<div className="space-y-2">
								<Label>Date</Label>
								<Input
									type="date"
									defaultValue={new Date().toISOString().split('T')[0]}
								/>
							</div>
						</div>

						<div className="space-y-2">
							<Label>Overall Condition</Label>
							<RadioGroup
								value={condition}
								onValueChange={setCondition}
								className="flex gap-4"
							>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="good" id="good" />
									<Label htmlFor="good" className="font-normal">
										Good
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="damaged" id="damaged" />
									<Label htmlFor="damaged" className="font-normal">
										Damaged
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="partial" id="partial" />
									<Label htmlFor="partial" className="font-normal">
										Partial Shipment
									</Label>
								</div>
							</RadioGroup>
						</div>

						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<Label className="text-base">Inspection Checklist</Label>
								<div className="flex gap-2 text-sm">
									<Badge variant="outline" className="text-emerald-500">
										{passCount} Pass
									</Badge>
									<Badge variant="outline" className="text-destructive">
										{failCount} Fail
									</Badge>
									<Badge variant="secondary">{pendingCount} Pending</Badge>
								</div>
							</div>
							<div className="space-y-2">
								{items.map((item) => (
									<ItemCheck
										key={item.id}
										item={item}
										onResultChange={handleResultChange}
										onNotesChange={handleNotesChange}
									/>
								))}
							</div>
						</div>

						<ImageUpload
							images={images}
							onAdd={() => setImages([...images, ''])}
						/>

						<div className="space-y-2">
							<Label>Additional Notes</Label>
							<Textarea placeholder="Any other observations..." rows={3} />
						</div>
					</CardContent>
					<CardFooter className="flex justify-between border-t pt-6">
						<div className="flex items-center gap-2">
							{failCount > 0 && (
								<Badge variant="destructive" className="gap-1">
									<AlertTriangle className="size-3" />
									Issues Found
								</Badge>
							)}
						</div>
						<div className="flex gap-3">
							<Button variant="outline">Save Draft</Button>
							<Button disabled={pendingCount > 0}>Complete Inspection</Button>
						</div>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
