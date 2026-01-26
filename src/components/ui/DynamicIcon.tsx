import { Eye, Globe, Users, Target, Award, Star, Shield, TrendingUp, Zap, Server, MapPin, Phone, Mail } from 'lucide-react';

const icons: Record<string, any> = {
    // Common icons
    Eye,
    Globe,
    Users,
    Target,
    Award,
    Star,
    Shield,
    TrendingUp,
    Zap,
    Server,
    MapPin,
    Phone,
    Mail,
    // Dictionary for Turkish translations/synonyms if needed
    'Vizyon': Eye,
    'Misyon': Globe,
    'Kadro': Users,
    'Ekip': Users,
};

type Props = {
    name: string;
    className?: string;
};

export default function DynamicIcon({ name, className }: Props) {
    const IconComponent = icons[name] || icons[Object.keys(icons).find(key => key.toLowerCase() === name.toLowerCase()) || ''] || null;

    if (!IconComponent) {
        // Return text as fallback (like before) or a default icon
        return <span className={className}>{name}</span>;
    }

    return <IconComponent className={className} />;
}
