import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'File path ID is required' },
                { status: 400 }
            );
        }

        // Security: Ensure the path is within the blocks directory
        if (!id.startsWith('src/blocks/')) {
            return NextResponse.json(
                { error: 'Invalid file path' },
                { status: 403 }
            );
        }

        const filePath = join(process.cwd(), id);
        const fileContent = await readFile(filePath, 'utf-8');

        return NextResponse.json({
            message: fileContent,
            path: id
        });
    } catch (error) {
        console.error('Error reading source code:', error);
        return NextResponse.json(
            { error: 'Failed to read source code', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
