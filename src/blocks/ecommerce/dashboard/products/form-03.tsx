'use client';

import * as React from 'react';
import {
	X,
	Plus,
	Image as ImageIcon,
	GripVertical,
	Upload,
	Trash2,
	ZoomIn,
	Star,
	RefreshCw,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';

interface ImageItem {
	id: string;
	url: string;
	alt: string;
	isPrimary: boolean;
	order: number;
}

interface ImageThumbnailProps {
	image: ImageItem;
	isSelected: boolean;
	onSelect: () => void;
	onSetPrimary: () => void;
	onDelete: () => void;
}

const ImageThumbnail = ({
	image,
	isSelected,
	onSelect,
	onSetPrimary,
	onDelete,
}: ImageThumbnailProps) => (
	<div
		className={`group relative aspect-square cursor-pointer overflow-hidden rounded-lg border-2 transition-all ${isSelected ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-muted-foreground/20'}`}
	>
		<div className="absolute inset-0 flex items-center justify-center bg-muted text-2xl">
			📷
		</div>

		{image.isPrimary && (
			<Badge className="absolute left-2 top-2 gap-1 bg-amber-500">
				<Star className="size-3" />
				Primary
			</Badge>
		)}

		<div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
			<Button variant="secondary" size="icon-sm" onClick={onSelect}>
				<Checkbox checked={isSelected} />
			</Button>
			<Button variant="secondary" size="icon-sm" onClick={onSetPrimary}>
				<Star className="size-4" />
			</Button>
			<Button variant="destructive" size="icon-sm" onClick={onDelete}>
				<Trash2 className="size-4" />
			</Button>
		</div>

		<GripVertical className="absolute left-2 top-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity group-hover:opacity-100" />
	</div>
);

interface UploadZoneProps {
	onUpload: (files: FileList) => void;
	isUploading: boolean;
	uploadProgress: number;
}

const UploadZone = ({
	onUpload,
	isUploading,
	uploadProgress,
}: UploadZoneProps) => (
	<div className="rounded-lg border-2 border-dashed p-8">
		{isUploading ? (
			<div className="space-y-3">
				<div className="flex items-center justify-center">
					<RefreshCw className="size-8 animate-spin text-primary" />
				</div>
				<Progress value={uploadProgress} />
				<p className="text-center text-sm text-muted-foreground">
					Uploading... {uploadProgress}%
				</p>
			</div>
		) : (
			<label className="flex cursor-pointer flex-col items-center gap-3">
				<Upload className="size-12 text-muted-foreground" />
				<p className="text-center font-medium">Drag and drop images here</p>
				<p className="text-center text-sm text-muted-foreground">
					or click to browse (PNG, JPG, WebP up to 10MB each)
				</p>
				<Button variant="outline" className="mt-2">
					Browse Files
				</Button>
				<input
					type="file"
					multiple
					accept="image/*"
					className="hidden"
					onChange={(e) => e.target.files && onUpload(e.target.files)}
				/>
			</label>
		)}
	</div>
);

interface BulkActionsBarProps {
	selectedCount: number;
	onDelete: () => void;
	onSetPrimary: () => void;
	onClearSelection: () => void;
}

const BulkActionsBar = ({
	selectedCount,
	onDelete,
	onSetPrimary,
	onClearSelection,
}: BulkActionsBarProps) => {
	if (selectedCount === 0) return null;

	return (
		<div className="flex items-center justify-between rounded-lg border bg-primary/10 p-3">
			<span className="font-medium">{selectedCount} selected</span>
			<div className="flex items-center gap-2">
				{selectedCount === 1 && (
					<Button
						variant="outline"
						size="sm"
						onClick={onSetPrimary}
						className="gap-2"
					>
						<Star className="size-4" />
						Set as Primary
					</Button>
				)}
				<Button
					variant="destructive"
					size="sm"
					onClick={onDelete}
					className="gap-2"
				>
					<Trash2 className="size-4" />
					Delete
				</Button>
				<Button variant="ghost" size="sm" onClick={onClearSelection}>
					<X className="size-4" />
				</Button>
			</div>
		</div>
	);
};

interface ImageSettingsProps {
	settings: {
		autoOptimize: boolean;
		generateAlt: boolean;
		keepOriginal: boolean;
	};
	onChange: (key: string, value: boolean) => void;
}

const ImageSettings = ({ settings, onChange }: ImageSettingsProps) => (
	<div className="rounded-lg border bg-card p-4">
		<h3 className="mb-4 font-semibold">Image Settings</h3>
		<div className="space-y-3">
			<div className="flex items-center justify-between">
				<Label htmlFor="auto-optimize">Auto-optimize images</Label>
				<Switch
					id="auto-optimize"
					checked={settings.autoOptimize}
					onCheckedChange={(v) => onChange('autoOptimize', v)}
				/>
			</div>
			<div className="flex items-center justify-between">
				<Label htmlFor="generate-alt">Generate ALT text with AI</Label>
				<Switch
					id="generate-alt"
					checked={settings.generateAlt}
					onCheckedChange={(v) => onChange('generateAlt', v)}
				/>
			</div>
			<div className="flex items-center justify-between">
				<Label htmlFor="keep-original">Keep original files</Label>
				<Switch
					id="keep-original"
					checked={settings.keepOriginal}
					onCheckedChange={(v) => onChange('keepOriginal', v)}
				/>
			</div>
		</div>
	</div>
);

export default function Main() {
	const [images, setImages] = React.useState<ImageItem[]>([
		{ id: '1', url: '', alt: 'Product front view', isPrimary: true, order: 1 },
		{ id: '2', url: '', alt: 'Product side view', isPrimary: false, order: 2 },
		{ id: '3', url: '', alt: 'Product back view', isPrimary: false, order: 3 },
		{ id: '4', url: '', alt: 'Product detail', isPrimary: false, order: 4 },
	]);
	const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
	const [isUploading, setIsUploading] = React.useState(false);
	const [uploadProgress, setUploadProgress] = React.useState(0);
	const [settings, setSettings] = React.useState({
		autoOptimize: true,
		generateAlt: true,
		keepOriginal: false,
	});

	const handleUpload = (files: FileList) => {
		setIsUploading(true);
		setUploadProgress(0);

		// Simulate upload
		const interval = setInterval(() => {
			setUploadProgress((prev) => {
				if (prev >= 100) {
					clearInterval(interval);
					setIsUploading(false);

					// Add new images
					const newImages: ImageItem[] = Array.from(files).map((_, idx) => ({
						id: `new-${Date.now()}-${idx}`,
						url: '',
						alt: `New image ${idx + 1}`,
						isPrimary: false,
						order: images.length + idx + 1,
					}));
					setImages((prev) => [...prev, ...newImages]);

					return 100;
				}
				return prev + 10;
			});
		}, 200);
	};

	const toggleSelect = (id: string) => {
		setSelectedIds((prev) =>
			prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
		);
	};

	const setPrimary = (id: string) => {
		setImages((prev) =>
			prev.map((img) => ({ ...img, isPrimary: img.id === id })),
		);
	};

	const deleteImage = (id: string) => {
		setImages((prev) => prev.filter((img) => img.id !== id));
		setSelectedIds((prev) => prev.filter((i) => i !== id));
	};

	const deleteSelected = () => {
		setImages((prev) => prev.filter((img) => !selectedIds.includes(img.id)));
		setSelectedIds([]);
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-4xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="flex items-center gap-3">
					<ImageIcon className="size-5" />
					<h2 className="text-xl font-semibold">Product Images</h2>
				</div>

				<UploadZone
					onUpload={handleUpload}
					isUploading={isUploading}
					uploadProgress={uploadProgress}
				/>

				<BulkActionsBar
					selectedCount={selectedIds.length}
					onDelete={deleteSelected}
					onSetPrimary={() => selectedIds[0] && setPrimary(selectedIds[0])}
					onClearSelection={() => setSelectedIds([])}
				/>

				<div className="grid gap-4 @sm:grid-cols-4 @lg:grid-cols-6">
					{images.map((image) => (
						<ImageThumbnail
							key={image.id}
							image={image}
							isSelected={selectedIds.includes(image.id)}
							onSelect={() => toggleSelect(image.id)}
							onSetPrimary={() => setPrimary(image.id)}
							onDelete={() => deleteImage(image.id)}
						/>
					))}
				</div>

				<ImageSettings
					settings={settings}
					onChange={(key, value) =>
						setSettings((prev) => ({ ...prev, [key]: value }))
					}
				/>

				<div className="flex justify-end gap-2">
					<Button variant="outline">Cancel</Button>
					<Button className="gap-2">Save Changes</Button>
				</div>
			</div>
		</section>
	);
}
