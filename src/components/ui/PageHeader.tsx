import Link from 'next/link';
import Image from 'next/image';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface PageHeaderProps {
    title: string;
    description?: string;
    image?: string;
    breadcrumbs?: BreadcrumbItem[];
}

export default function PageHeader({ title, description, image, breadcrumbs }: PageHeaderProps) {
    return (
        <section className="relative py-20 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white overflow-hidden">
            {/* Background Image (Optional) */}
            {image && (
                <div className="absolute inset-0 z-0">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover opacity-40 mix-blend-overlay"
                        priority
                    />
                    <div className="absolute inset-0 bg-slate-900/60" />
                </div>
            )}

            <div className="container mx-auto px-4 relative z-10">
                {/* Breadcrumbs */}
                {breadcrumbs && (
                    <nav className="mb-6">
                        <ol className="flex items-center gap-2 text-sm text-gray-300">
                            <li>
                                <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    Ana Sayfa
                                </Link>
                            </li>
                            {breadcrumbs.map((item, index) => (
                                <li key={index} className="flex items-center gap-2">
                                    <span className="opacity-60">/</span>
                                    {item.href ? (
                                        <Link href={item.href} className="hover:text-white transition-colors">
                                            {item.label}
                                        </Link>
                                    ) : (
                                        <span className="text-orange-400 font-medium">{item.label}</span>
                                    )}
                                </li>
                            ))}
                        </ol>
                    </nav>
                )}

                <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                    {title}
                </h1>
                {description && (
                    <div className="max-w-3xl text-lg text-gray-300 font-light leading-relaxed">
                        {/* Check if description contains HTML tags (basic check) */}
                        {/<[a-z][\s\S]*>/i.test(description) ? (
                            <div dangerouslySetInnerHTML={{ __html: description }} />
                        ) : (
                            <p>{description}</p>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
