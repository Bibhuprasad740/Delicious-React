import { Zap } from 'lucide-react';

interface OfferHeaderProps {
    title: string;
    subtitle: string;
    gradientFrom: string;
    gradientTo: string;
}

const OfferHeader = ({ title, subtitle, gradientFrom, gradientTo }: OfferHeaderProps) => {
    return (
        <div className={`relative bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white p-8 rounded-2xl shadow-lg`}>
            <div className="absolute top-4 left-4">
                <Zap className="text-yellow-300 w-10 h-10" />
            </div>
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-2">{title}</h1>
                <p className="text-lg">{subtitle}</p>
            </div>
        </div>
    );
};

export default OfferHeader;