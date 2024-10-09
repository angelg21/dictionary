// components/UploadLoader.tsx
import { motion } from 'framer-motion';

interface UploadLoaderProps {
    progress: number;
}

const UploadLoader: React.FC<UploadLoaderProps> = ({ progress }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <motion.div
                className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"
                animate={{ rotate: 360 }}
                transition={{
                    repeat: Infinity,
                    duration: 1,
                    ease: 'linear',
                }}
            />
            <p className="mt-4 text-blue-500 font-medium">
                {progress < 100 ? `Subiendo archivo... ${progress}%` : '¡Carga completada!'}
            </p>
        </div>
    );
};

export default UploadLoader;
