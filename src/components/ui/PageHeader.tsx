import Link from 'next/link';
import Image from 'next/image';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface PageHeaderProps {
    title: string;
    description?: string;
    image?: string; // Optional in simple mode
    breadcrumbs?: BreadcrumbItem[];
    simple?: boolean;
}

export default function PageHeader({ title, description, image, breadcrumbs, simple = false }: PageHeaderProps) {
    if (simple) {
        return (
            <section className="relative min-h-[120px] flex items-center py-6 md:py-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Gradient Orbs */}
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
                    <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />

                    {/* Grid Pattern */}
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
                            backgroundSize: '40px 40px'
                        }}
                    />

                    {/* Diagonal Lines */}
                    <div className="absolute top-0 right-0 w-1/3 h-full">
                        <svg className="w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <line x1="0" y1="100" x2="100" y2="0" stroke="currentColor" strokeWidth="0.5" />
                            <line x1="20" y1="100" x2="100" y2="20" stroke="currentColor" strokeWidth="0.3" />
                            <line x1="40" y1="100" x2="100" y2="40" stroke="currentColor" strokeWidth="0.2" />
                        </svg>
                    </div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    {/* Breadcrumbs */}
                    {breadcrumbs && (
                        <nav className="mb-3">
                            <ol className="flex items-center gap-2 text-sm">
                                <li>
                                    <Link href="/" className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-1.5 group">
                                        <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                        <span>Ana Sayfa</span>
                                    </Link>
                                </li>
                                {breadcrumbs.map((item, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                        {item.href ? (
                                            <Link href={item.href} className="text-gray-400 hover:text-orange-400 transition-colors">
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

                    {/* Title with Accent */}
                    <div className="flex items-center gap-3">
                        <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full" />
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                            {title}
                        </h1>
                    </div>

                    {/* Description in Simple Mode */}
                    {description && (
                        <div className="mt-4 max-w-4xl text-gray-300 font-light leading-relaxed text-sm md:text-base">
                            {/<[a-z][\s\S]*>/i.test(description) ? (
                                <div dangerouslySetInnerHTML={{ __html: description }} />
                            ) : (
                                <p>{description}</p>
                            )}
                        </div>
                    )}


                </div>

                {/* Bottom Gradient Line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
            </section>
        );
    }


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
