import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'Dosya bulunamadı' }, { status: 400 });
        }

        // Dosya tipi kontrolü
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'application/pdf', 'image/x-icon', 'image/vnd.microsoft.icon'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { error: 'Sadece resim ve PDF dosyaları yüklenebilir' },
                { status: 400 }
            );
        }

        // Dosya boyutu kontrolü (20MB)
        const maxSize = 20 * 1024 * 1024; // 20MB
        if (file.size > maxSize) {
            return NextResponse.json(
                { error: 'Dosya boyutu 20MB\'dan küçük olmalıdır' },
                { status: 400 }
            );
        }
        // Dosyayı buffer'a çevir
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Benzersiz dosya adı oluştur
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 8);
        const extension = file.name.split('.').pop();
        const filename = `${timestamp}-${randomString}.${extension}`;

        // Dosyayı kaydet
        // public klasörü yerine root dizindeki uploads klasörüne kaydediyoruz
        const isProd = process.env.NODE_ENV === 'production';
        const uploadDir = isProd ? '/app/uploads' : join(process.cwd(), 'uploads');

        // Klasör yoksa oluştur
        try {
            await require('fs/promises').mkdir(uploadDir, { recursive: true });
        } catch (error) {
            // Klasör zaten varsa hata verme
        }

        const filepath = join(uploadDir, filename);
        await writeFile(filepath, buffer);

        // URL'i döndür - Yeni API route üzerinden sunulacak
        const url = `/uploads/${filename}`;

        return NextResponse.json({ url, filename }, { status: 200 });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Dosya yüklenirken bir hata oluştu' }, { status: 500 });
    }
}
