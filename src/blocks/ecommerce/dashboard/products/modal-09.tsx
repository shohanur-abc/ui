'use client';

import * as React from 'react';
import {
	Link2,
	Share2,
	Copy,
	Check,
	Mail,
	MessageSquare,
	Facebook,
	Twitter,
	Linkedin,
	Link,
	QrCode,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

interface SocialShareButtonProps {
	icon: React.ElementType;
	label: string;
	color: string;
	onClick: () => void;
}

const SocialShareButton = ({
	icon: Icon,
	label,
	color,
	onClick,
}: SocialShareButtonProps) => (
	<Button
		variant="outline"
		className="flex-1 flex-col gap-2 py-6 hover:bg-accent"
		onClick={onClick}
	>
		<div
			className="flex size-10 items-center justify-center rounded-full"
			style={{ backgroundColor: color }}
		>
			<Icon className="size-5 text-white" />
		</div>
		<span className="text-xs">{label}</span>
	</Button>
);

interface CopyLinkInputProps {
	url: string;
}

const CopyLinkInput = ({ url }: CopyLinkInputProps) => {
	const [copied, setCopied] = React.useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(url);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="flex gap-2">
			<Input value={url} readOnly className="flex-1 font-mono text-sm" />
			<Button onClick={handleCopy} variant="outline" className="gap-2">
				{copied ? (
					<>
						<Check className="size-4 text-green-500" />
						Copied
					</>
				) : (
					<>
						<Copy className="size-4" />
						Copy
					</>
				)}
			</Button>
		</div>
	);
};

interface EmbedCodeProps {
	productId: string;
	productName: string;
}

const EmbedCode = ({ productId, productName }: EmbedCodeProps) => {
	const [size, setSize] = React.useState<'small' | 'medium' | 'large'>(
		'medium',
	);
	const [copied, setCopied] = React.useState(false);

	const sizes = {
		small: '200x150',
		medium: '300x250',
		large: '400x350',
	};

	const embedCode = `<iframe src="https://store.example.com/embed/${productId}" width="${sizes[size].split('x')[0]}" height="${sizes[size].split('x')[1]}" frameborder="0"></iframe>`;

	const handleCopy = () => {
		navigator.clipboard.writeText(embedCode);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="space-y-4">
			<div className="space-y-2">
				<Label>Widget Size</Label>
				<div className="flex gap-2">
					{(['small', 'medium', 'large'] as const).map((s) => (
						<Button
							key={s}
							variant={size === s ? 'default' : 'outline'}
							size="sm"
							onClick={() => setSize(s)}
							className="capitalize"
						>
							{s}
						</Button>
					))}
				</div>
			</div>

			<div className="space-y-2">
				<Label>Embed Code</Label>
				<div className="rounded-lg border bg-muted/30 p-3">
					<pre className="overflow-x-auto text-sm">{embedCode}</pre>
				</div>
				<Button onClick={handleCopy} className="w-full gap-2">
					{copied ? (
						<>
							<Check className="size-4" />
							Copied!
						</>
					) : (
						<>
							<Copy className="size-4" />
							Copy Embed Code
						</>
					)}
				</Button>
			</div>

			<div className="rounded-lg border p-4">
				<p className="mb-2 text-sm font-medium">Preview:</p>
				<div
					className="flex items-center justify-center rounded-lg bg-muted"
					style={{
						width: sizes[size].split('x')[0] + 'px',
						height: sizes[size].split('x')[1] + 'px',
					}}
				>
					<div className="text-center">
						<div className="text-4xl">📦</div>
						<p className="mt-2 text-sm font-medium">{productName}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

interface QrCodeSectionProps {
	url: string;
}

const QrCodeSection = ({ url }: QrCodeSectionProps) => (
	<div className="space-y-4">
		<div className="flex items-center justify-center rounded-lg border bg-white p-8">
			<div className="flex size-48 items-center justify-center rounded-lg bg-muted">
				<QrCode className="size-24 text-muted-foreground" />
			</div>
		</div>
		<p className="text-center text-sm text-muted-foreground">
			Scan to view product on mobile
		</p>
		<Button variant="outline" className="w-full gap-2">
			<Copy className="size-4" />
			Download QR Code
		</Button>
	</div>
);

interface ShareModalProps {
	productName: string;
	productId: string;
	productUrl: string;
	trigger: React.ReactNode;
}

const ShareModal = ({
	productName,
	productId,
	productUrl,
	trigger,
}: ShareModalProps) => (
	<Dialog>
		<DialogTrigger asChild>{trigger}</DialogTrigger>
		<DialogContent className="max-w-md">
			<DialogHeader>
				<DialogTitle className="flex items-center gap-2">
					<Share2 className="size-5" />
					Share Product
				</DialogTitle>
			</DialogHeader>

			<Tabs defaultValue="share" className="mt-4">
				<TabsList className="grid w-full grid-cols-3">
					<TabsTrigger value="share">Share</TabsTrigger>
					<TabsTrigger value="embed">Embed</TabsTrigger>
					<TabsTrigger value="qr">QR Code</TabsTrigger>
				</TabsList>

				<TabsContent value="share" className="mt-4 space-y-4">
					<div className="flex flex-wrap gap-2">
						<SocialShareButton
							icon={Facebook}
							label="Facebook"
							color="#1877F2"
							onClick={() => console.log('Share to Facebook')}
						/>
						<SocialShareButton
							icon={Twitter}
							label="Twitter"
							color="#1DA1F2"
							onClick={() => console.log('Share to Twitter')}
						/>
						<SocialShareButton
							icon={Linkedin}
							label="LinkedIn"
							color="#0A66C2"
							onClick={() => console.log('Share to LinkedIn')}
						/>
						<SocialShareButton
							icon={Mail}
							label="Email"
							color="#6B7280"
							onClick={() => console.log('Share via Email')}
						/>
					</div>

					<Separator />

					<div className="space-y-2">
						<Label>Direct Link</Label>
						<CopyLinkInput url={productUrl} />
					</div>
				</TabsContent>

				<TabsContent value="embed" className="mt-4">
					<EmbedCode productId={productId} productName={productName} />
				</TabsContent>

				<TabsContent value="qr" className="mt-4">
					<QrCodeSection url={productUrl} />
				</TabsContent>
			</Tabs>
		</DialogContent>
	</Dialog>
);

export default function Main() {
	const products = [
		{
			id: '1',
			name: 'Wireless Bluetooth Headphones',
			url: 'https://store.example.com/products/wireless-headphones',
		},
		{
			id: '2',
			name: 'Mechanical Gaming Keyboard',
			url: 'https://store.example.com/products/gaming-keyboard',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-2xl space-y-6 px-4 py-8 @sm:px-6">
				<div className="flex items-center gap-3">
					<Share2 className="size-5" />
					<h2 className="text-xl font-semibold">Share & Embed</h2>
				</div>

				<div className="space-y-4">
					{products.map((product) => (
						<div
							key={product.id}
							className="flex items-center gap-4 rounded-lg border bg-card p-4"
						>
							<div className="flex size-16 items-center justify-center rounded-lg bg-muted text-3xl">
								📦
							</div>
							<div className="flex-1">
								<h3 className="font-medium">{product.name}</h3>
								<p className="text-sm text-muted-foreground">
									ID: {product.id}
								</p>
							</div>
							<ShareModal
								productName={product.name}
								productId={product.id}
								productUrl={product.url}
								trigger={
									<Button variant="outline" className="gap-2">
										<Share2 className="size-4" />
										Share
									</Button>
								}
							/>
						</div>
					))}
				</div>

				<div className="rounded-lg border bg-muted/30 p-4">
					<h3 className="mb-3 font-medium">Quick Copy Links</h3>
					<div className="space-y-2">
						{products.map((product) => (
							<CopyLinkInput key={product.id} url={product.url} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
