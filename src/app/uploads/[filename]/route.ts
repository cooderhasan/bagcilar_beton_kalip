import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ filename: string }> }
) {
    const { filename } = await params;

    if (!filename) {
        return NextResponse.json({ error: 'Dosya adı gerekli' }, { status: 400 });
    }

    try {
        // Root dizindeki uploads klasöründen dosyayı oku
        const isProd = process.env.NODE_ENV === 'production';
        const uploadDir = isProd ? '/app/uploads' : join(process.cwd(), 'uploads');
        const filepath = join(uploadDir, filename);

        const fileBuffer = await readFile(filepath);

        // Dosya uzantısına göre Content-Type belirle
        const ext = filename.split('.').pop()?.toLowerCase();
        let contentType = 'application/octet-stream';

        if (ext === 'jpg' || ext === 'jpeg') contentType = 'image/jpeg';
        else if (ext === 'png') contentType = 'image/png';
        else if (ext === 'gif') contentType = 'image/gif';
        else if (ext === 'webp') contentType = 'image/webp';
        else if (ext === 'svg') contentType = 'image/svg+xml';
        else if (ext === 'pdf') contentType = 'application/pdf';

        return new NextResponse(fileBuffer, {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });
    } catch (error) {
        // Dosya bulunamazsa public/uploads klasörüne bak (eski dosyalar için fallback)
        try {
            const publicDir = join(process.cwd(), 'public', 'uploads');
            const publicFilepath = join(publicDir, filename);
            const fileBuffer = await readFile(publicFilepath);

            // Dosya uzantısına göre Content-Type belirle (tekrar)
            const ext = filename.split('.').pop()?.toLowerCase();
            let contentType = 'application/octet-stream';

            if (ext === 'jpg' || ext === 'jpeg') contentType = 'image/jpeg';
            else if (ext === 'png') contentType = 'image/png';
            else if (ext === 'gif') contentType = 'image/gif';
            else if (ext === 'webp') contentType = 'image/webp';
            else if (ext === 'svg') contentType = 'image/svg+xml';
            else if (ext === 'pdf') contentType = 'application/pdf';

            return new NextResponse(fileBuffer, {
                headers: {
                    'Content-Type': contentType,
                    'Cache-Control': 'public, max-age=31536000, immutable',
                },
            });
        } catch (filesError) {
            console.error('File read error:', error);
            return NextResponse.json({ error: 'Dosya bulunamadı' }, { status: 404 });
        }
    }
}
